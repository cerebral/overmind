const javascript = {
  react: [
    {
      fileName: 'Article.js',
      target: 'jsx',
      code: `
import React, { useEffect } from 'react'
import { useOvermind } from '../overmind'

const Article = () => {
  const { addMutationListener } = useOvermind()

  useEffect(() => addMutationListener((mutation) => {
    if (mutation.path === 'currentArticle') {
      document.querySelector('#app').scrollTop = 0
    }
  }), [])

  render() {
    return <article />
  }
}

export default Article
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
export default {
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
}
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
import { useOvermind } from '../../overmind'

const Article: React.FunctionComponent = () => {
  const { addMutationListener } = useOvermind()

  React.useEffect(() => addMutationListener((mutation) => {
    if (mutation.path === 'currentArticle') {
      document.querySelector('#app').scrollTop = 0
    }
  }), [])

  return <article />
}

export default Article
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
