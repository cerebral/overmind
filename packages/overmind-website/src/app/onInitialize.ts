import { OnInitialize } from 'overmind'

const onInitialize: OnInitialize = ({ value: app, router, state, storage }) => {
  state.typescript = storage.get('typescript') || false
  state.theme = storage.get('theme') || 'react'

  router.route('/', app.actions.openHome)
  router.route('/guides', app.actions.openGuides)
  router.route('/guides/:type/:title', app.actions.openGuide)
  router.route('/videos', app.actions.openVideos)
  router.route('/videos/:title', app.actions.openVideo)
  router.route('/api/:title', app.actions.openApi)
  router.redirect('/api', '/api/action')

  router.start()
}

export default onInitialize
