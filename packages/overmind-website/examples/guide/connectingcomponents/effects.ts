const javascript = {
  react: [
    {
      fileName: 'Article.js',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../overmind'

class Article extends React.Component {
  componentDidMount() {
    const overmind = this.props.overmind

    this.disposeEffect = overmind.addMutationListener((mutation) => {
      if (mutation.path === 'currentArticle') {
        document.querySelector('#app').scrollTop = 0
      }
    })
  }
  componentWillUnmount() {
    this.disposeEffect()
  }
  render() {
    return <article />
  }
}

export default connect(Article)
    `,
    },
  ],
  vue: [
    {
      fileName: 'components/Article.vue (template)',
      target: 'markup',
      code: `
<article></article>
    `,
    },
    {
      fileName: 'components/Article.vue (script)',
      code: `
import { connect } from '../overmind'

export default connect({
  mounted() {
    this.disposeEffect = this.overmind.addMutationListener(() => {
      if (mutation.path === 'currentArticle') {
        document.querySelector('#app').scrollTop = 0
      }    
    })
  }
  destroyed() {
    this.disposeEffect()
  }
})
  `,
    },
  ],
}

const typescript = {
  react: [
    {
      fileName: 'components/Article.tsx',
      code: `
import * as React from 'react'
import { connect, Connect } from '../../overmind'

class Article extends React.Component<Connect> {
  componentDidMount() {
    const overmind = this.props.overmind

    this.disposeEffect = overmind.addMutationListener((mutation) => {
      if (mutation.path === 'currentArticle') {
        document.querySelector('#app').scrollTop = 0
      }
    })
  }
  componentWillUnmount() {
    this.disposeEffect()
  }
  render() {
    return <article />
  }
}

export default connect(Article)
    `,
    },
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'app.component.ts',
      code: `
import { Component } from '@angular/core';
import { connect, Connect } from '../overmind'

@Component({
  selector: 'app-root',
  template: \`
  <article></article>
  \`
})
@connect()
export class App {
  overmind: Connect
  disposeEffect: () => void
  ngOnInit() {
    this.disposeEffect = this.overmind.addMutationListener(() => {
      if (mutation.path === 'currentArticle') {
        document.querySelector('#app').scrollTop = 0
      } 
    })
  }
  ngOnDestroy() {
    this.disposeEffect()
  }
}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
