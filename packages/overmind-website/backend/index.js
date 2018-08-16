const path = require('path')
const express = require('express')
const app = express()
const fs = require('fs')
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

function getGuides() {
  return fs.readdirSync(path.resolve('guides')).reduce((acc, type) => {
    return acc.concat(
      fs.readdirSync(path.resolve('guides', type)).reduce((acc, fileName) => {
        const content = fs
          .readFileSync(path.resolve('guides', type, fileName))
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
  return fs.readFileSync(path.resolve('videos.json')).toString()
}

function getApis() {
  return fs.readdirSync(path.resolve('api')).reduce((acc, fileName) => {
    const content = fs.readFileSync(path.resolve('api', fileName)).toString()

    return acc.concat({
      title: content.split('\n')[0].replace('# ', ''),
      fileName,
    })
  }, [])
}

function getSearchData() {
  return fs
    .readdirSync(path.resolve('guides'))
    .reduce((acc, type) => {
      return acc.concat(
        fs.readdirSync(path.resolve('guides', type)).reduce((acc, fileName) => {
          const content = fs
            .readFileSync(path.resolve('guides', type, fileName))
            .toString()

          return acc.concat({
            type: 'guide',
            title: content.split('\n')[0].replace('# ', ''),
            content: content.toLowerCase(),
            fileName,
          })
        }, [])
      )
    }, [])
    .concat(
      fs.readdirSync(path.resolve('api')).reduce((acc, fileName) => {
        const content = fs
          .readFileSync(path.resolve('api', fileName))
          .toString()

        return acc.concat({
          type: 'api',
          title: content.split('\n')[0].replace('# ', ''),
          content: content.toLowerCase(),
          fileName,
        })
      }, [])
    )
}

const guides = getGuides()
const videos = getVideos()
const apis = getApis()

const searchData = getSearchData()

app.use(express.static('dist'))
app.get('/backend/guides', (_, res) =>
  res.send(IS_PRODUCTION ? guides : getGuides())
)
app.get('/backend/videos', (_, res) =>
  res.send(IS_PRODUCTION ? videos : getVideos())
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
          type: data.type,
          fileName: data.fileName,
        })
      }

      return acc
    }, [])
    .sort((a, b) => a.count - b.count)

  res.send(hits.slice(0, 5))
})
app.get('/*', (_, res) => res.sendFile(path.resolve('dist', 'index.html')))

app.listen(5000, () => console.log('Example app listening on port 5000!'))
