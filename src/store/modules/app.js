// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  templates: [
    {
      title: 'Заявление на предоставление ежегодного оплачиваемого отпуска',
      name: 'vacation',
    },
    {
      title: 'Заявление на перенос отпуска',
      name: 'redistribution',
    },
  ],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
