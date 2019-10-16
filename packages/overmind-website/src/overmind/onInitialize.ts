import { OnInitialize } from 'overmind'

const onInitialize: OnInitialize = async ({ effects, state, actions }) => {
  state.showViewHelp = !effects.storage.get('theme')

  effects.router.route('/', actions.openHome)
  effects.router.route('/introduction', actions.openIntroduction)
  effects.router.route('/guides', actions.openGuides)
  effects.router.route('/guides/:type/:title', actions.openGuide)
  effects.router.route('/videos', actions.openVideos)
  effects.router.route('/videos/:title', actions.openVideo)
  effects.router.route('/api/:title', actions.openApi)
  effects.router.redirect('/api', '/api/action')

  effects.router.start()

  state.isLoadingApis = true
  state.apis = await effects.request('/backend/apis')
  state.isLoadingApis = false

  state.versions = await effects.request('/backend/versions')
}

export default onInitialize
