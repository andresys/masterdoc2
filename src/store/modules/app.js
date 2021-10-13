// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  name: 'MasterDoc (Мастер док.)',
  year: new Date().getFullYear(),
  description: 'Интерактивная система помощи<br/> в подготовки типовых документов',
  support: {
    name: 'Разработка и сопровождение системы:<br/> отдел информационных ресурсов и технологий<br/> Администрации города Твери<br/>',
    contact: 'E-mail: <a href="mailto:it@adm.tver.ru?subject=Мастердок">it@adm.tver.ru</a>, тел.: (4822) 36-32-80 доб. 1100',
  },
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
