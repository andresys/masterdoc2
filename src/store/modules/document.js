// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  vacation: {
    to: {
      title: 'Главе города Твери',
      name: 'А.В. Огонькову',
    },
    from: {
      title: 'заместителя начальника отдела информационных ресурсов и технологий',
      name: 'Кудрявцева Михаила Витальевича',
    },
    range: {
      start: '06.09.2021',
      end: '25.10.2021',
      days: 1,
    },
    payments: {
      matpom: [true, false],
      densod: false,
    },
    visa: {
      required: true,
      title: 'Начальник отдела информационных ресурсов и технологий',
      name: 'А.В. Исаев',
    },
    date: '06.09.2021',
    name: 'Кудрявцев М.В.',
  },
  
  redistribution: {
    to: {
      title: 'Главе города Твери',
      name: 'А.В. Огонькову',
    },
    from: {
      title: 'заместителя начальника отдела информационных ресурсов и технологий',
      name: 'Кудрявцева Михаила Витальевича',
    },
    yarn: 2021,
    start: '09.09.2021',
    days: 21,
    periods: [
      { start: '09.09.2021', days: 7 },
      { start: '09.10.2021', days: 14 },
    ],
    visa: {
      required: true,
      title: 'Начальник отдела информационных ресурсов и технологий',
      name: 'А.В. Исаев',
    },
    date: '06.09.2021',
    name: 'Кудрявцев М.В.',
  },
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
