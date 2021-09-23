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
    {
      title: 'Заявление на разделение ежегодного оплачиваемого отпуска на части',
      name: 'separation',
    },
    {
      title: 'Согласие на временное исполнение обязанностей',
      name: 'performance-of-duties',
    },
  ],
  document: {
    // Default value
    to_title: 'Главе города Твери',
    to_name: 'А.В. Огонькову',
    from_title: '',
    from_name: '',
    date: '',
    name: '',
    visa_required: true,
    visa_title: '',
    visa_name: '',
    perfomance_required: false,
    perfomance_title: '',
    perfomance_name: '',
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
