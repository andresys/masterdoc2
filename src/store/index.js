// Vue
import Vue from 'vue'
import Vuex from 'vuex'
import pathify from '@/plugins/vuex-pathify'

// Modules
import * as modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  plugins: [
    pathify.plugin,
  ],
})

store.dispatch('document/fetch')
store.dispatch('holidays/fetch')

store.subscribe(mutation => {
  if (!mutation.type.startsWith('document/')) return

  store.dispatch('document/update', mutation)
})

export default store

export const ROOT_DISPATCH = Object.freeze({ root: true })