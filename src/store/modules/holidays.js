// Pathify
import { make } from 'vuex-pathify'
import axios from 'axios'
import parse from 'csv-parse'

// Data
const state = { holidays: {} }

const mutations = make.mutations(state)

const actions = {
  fetch: ({ commit }) => {
    axios.get('/holidays.csv')
      .then((res) => {
        parse(res.data, { from: 2, skip_empty_lines: true }, (_, output) => {
          commit('holidays', Object.fromEntries(output.map((l) => {
            let year = l.shift()
            let months = Object.fromEntries(l.slice(0, 12).map((month, index) => {
              const res = Array.from(month.matchAll(/(((\d+)\+)|((\d+)\*)|(\d+))/g))
              const weekends = res.filter((day) => (day[6] != undefined)).map((day) => day[6])
              const shortened = res.filter((day) => (day[3] != undefined)).map((day) => day[3])
              const holidays = res.filter((day) => (day[5] != undefined)).map((day) => day[5])
              return [index + 1, { weekends, shortened, holidays }]
            }))
            return [year, months]
          })))
        })
      })
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
