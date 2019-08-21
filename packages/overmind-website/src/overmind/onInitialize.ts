import { OnInitialize } from 'overmind'

const onInitialize: OnInitialize = async ({ effects, state, actions }) => {
  state.showViewHelp = !effects.storage.get('theme')

  effects.router.route('/', actions.openHome)
  effects.router.route('/getstarted', actions.openGetStarted)
  effects.router.route('/guides', actions.openGuides)
  effects.router.route('/guides/:type/:title', actions.openGuide)
  effects.router.route('/videos', actions.openVideos)
  effects.router.route('/videos/:title', actions.openVideo)
  effects.router.route('/api/:title', actions.openApi)
  effects.router.redirect('/api', '/api/action')

  effects.router.start()

  state.versions = await effects.request('/backend/versions')
}

export default onInitialize
