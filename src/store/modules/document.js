// Pathify
import { make } from 'vuex-pathify'

// Globals
import { IN_BROWSER } from '@/util/globals'

// Data
const state = {
  vacation: {
    to_title: '',
    to_name: '',
    from_title: '',
    from_name: '',
    start: '',
    end: '',
    days: 0,
    matpom1: true,
    matpom2: false,
    densod: false,
    visa_required: true,
    visa_title: '',
    visa_name: '',
    perfomance_required: false,
    perfomance_title: '',
    perfomance_name: '',
    date: '',
    name: '',
  },
  
  redistribution: {
    to_title: '',
    to_name: '',
    from_title: '',
    from_name: '',
    yarn: 2021,
    start: '',
    days: 21,
    periods: [
    ],
    visa_required: true,
    visa_title: '',
    visa_name: '',
    date: '',
    name: '',
  },

  separation: {
    to_title: '',
    to_name: '',
    from_title: '',
    from_name: '',
    periods: [
    ],
    visa_required: true,
    visa_title: '',
    visa_name: '',
    date: '',
    name: '',
  },

  'performance-of-duties': {
    to_title: '',
    to_name: '',
    from_title: '',
    from_name: '',
    from: '',
    to: '',
    start: '',
    date: '',
    name: '',
  }
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  fetch: ({ commit }) => {
    console.log('LOAD')
    const local = localStorage.getItem('masterdoc@document') || '{}'
    const document = JSON.parse(local)

    for (const key in document) {
      commit(key, Object.assign(state[key], document[key]))
    }
  },
  update: ({ state }) => {
    if (!IN_BROWSER) return

    console.log('SAVE')

    localStorage.setItem('masterdoc@document', JSON.stringify(state))
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
