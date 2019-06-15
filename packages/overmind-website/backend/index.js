const path = require('path')
const express = require('express')
// const https = require('https')
const axios = require('axios')
const app = express()
const fs = require('fs')
const api = require('./api')
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

function getGuides() {
  return fs
    .readdirSync(path.join(__dirname, '..', 'guides'))
    .reduce((acc, type) => {
      return acc.concat(
        fs
          .readdirSync(path.join(__dirname, '..', 'guides', type))
          .reduce((acc, fileName) => {
            const content = fs
              .readFileSync(
                path.join(__dirname, '..', 'guides', type, fileName)
              )
              .toString()

            return acc.concat({
              title: content.split('\n')[0].replace('# ', ''),
              type,
              fileName,
            })
          }, [])
      )
    }, [])
}

function getVideos() {
  return fs.readFileSync(path.join(__dirname, '..', 'videos.json')).toString()
}

function getDemos() {
  return fs.readFileSync(path.join(__dirname, '..', 'demos.json')).toString()
}

function getApis() {
  return fs
    .readdirSync(path.join(__dirname, '..', 'api'))
    .reduce((acc, fileName) => {
      const content = fs
        .readFileSync(path.join(__dirname, '..', 'api', fileName))
        .toString()

      return acc.concat({
        title: content.split('\n')[0].replace('# ', ''),
        fileName,
      })
    }, [])
}

function getSearchData() {
  return fs
    .readdirSync(path.join(__dirname, '..', 'guides'))
    .reduce((acc, type) => {
      return acc.concat(
        fs
          .readdirSync(path.join(__dirname, '..', 'guides', type))
          .reduce((acc, fileName) => {
            const content = fs
              .readFileSync(
                path.join(__dirname, '..', 'guides', type, fileName)
              )
              .toString()

            return acc.concat({
              type: 'guide',
              title: content.split('\n')[0].replace('# ', ''),
              content: content.toLowerCase(),
              path: path.join('guides', type, fileName.replace('.md', '')),
              fileName,
            })
          }, [])
      )
    }, [])
    .concat(
      fs
        .readdirSync(path.join(__dirname, '..', 'api'))
        .reduce((acc, fileName) => {
          const content = fs
            .readFileSync(path.join(__dirname, '..', 'api', fileName))
            .toString()

          return acc.concat({
            type: 'api',
            title: content.split('\n')[0].replace('# ', ''),
            content: content.toLowerCase(),
            path: path.join('api', fileName.replace('.md', '')),
            fileName,
          })
        }, [])
    )
}

function getVersion(name) {
  return axios.get('http://registry.npmjs.org/' + name).then((response) => ({
    name,
    version: response.data['dist-tags'].latest,
  }))
}

function getVersions() {
  return Promise.all([
    getVersion('overmind'),
    getVersion('overmind-angular'),
    getVersion('overmind-vue'),
    getVersion('overmind-react'),
  ])
}

const guides = getGuides()
const videos = getVideos()
const demos = getDemos()
const apis = getApis()
const versions = getVersions()

const searchData = getSearchData()

/*
const googleCrawlMiddleware = async function ssr(req, res, next) {
  const userAgent = req.get('User-Agent')

  if (
    userAgent &&
    userAgent.toLowerCase().indexOf('googlebot') >= 0 &&
    !path.extname(req.path)
  ) {
    res.send(
      await new Promise((resolve) => {
        https.get(
          'https://pptraas.com/ssr?url=https://overmindjs.org' + req.path,
          (res) => {
            let html = ''
            res.on('data', (chunk) => {
              html += chunk
            })
            res.on('end', () => resolve(html))
          }
        )
      })
    )
  } else {
    next()
  }
}
*/

if (IS_PRODUCTION) {
  app.use((req, res, next) => {
    if (req.get('x-forwarded-proto') === 'https') {
      next()
    } else {
      res.redirect('https://' + req.headers.host + req.url)
    }
  })
}
// app.use(googleCrawlMiddleware)
app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use('/images', express.static(path.join(__dirname, '..', 'images')))
app.get('/workshop/posts', api.posts)
app.get('/backend/versions', (_, res) => {
  versions.then((fetchedVersions) => {
    res.send(
      fetchedVersions.reduce(
        (aggr, version) =>
          Object.assign(aggr, { [version.name]: version.version }),
        {}
      )
    )
  })
})
app.get('/backend/guides', (_, res) =>
  res.send(IS_PRODUCTION ? guides : getGuides())
)
app.get('/backend/videos', (_, res) =>
  res.send(IS_PRODUCTION ? videos : getVideos())
)
app.get('/backend/demos', (_, res) =>
  res.send(IS_PRODUCTION ? demos : getDemos())
)
app.get('/backend/apis', (_, res) => res.send(IS_PRODUCTION ? apis : getApis()))
app.get('/backend/search', (req, res) => {
  const query = req.query.query.toLowerCase()
  const regexp = new RegExp(query, 'g')
  const hits = searchData
    .reduce((acc, data) => {
      const matches = data.content.match(regexp)
      if (matches) {
        return acc.concat({
          count: matches.length,
          title: data.title,
          path: data.path,
          type: data.type,
          fileName: data.fileName,
        })
      }

      return acc
    }, [])
    .sort((a, b) => a.count - b.count)

  res.send(hits.slice(0, 5))
})

let indexHtml

if (IS_PRODUCTION) {
  indexHtml = fs
    .readFileSync(path.join(__dirname, '..', 'dist', 'index.html'))
    .toString()
  indexHtml = indexHtml.replace(
    '</body>',
    `
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-129590749-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-129590749-1');
  </script>
</body>
  `
  )
} else {
  indexHtml = fs.readFileSync(path.join(__dirname, 'index.html')).toString()
}

app.get('/*', (_, res) => res.send(indexHtml))

app.listen(process.env.PORT || 5000, () => console.log('Server started!'))

process.on('uncaughtException', (err) => {
  console.log('WEIRD ERROR', err.message)
  console.log(err.stack)
  process.exit(1)
})
