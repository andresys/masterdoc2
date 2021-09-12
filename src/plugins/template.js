/**
 * plugins/template.js
 *
 * Automatically loads and bootstraps files
 * in the `./src/templates/` folder.
 */

// Imports
import Vue from 'vue'

const requireTemplate = require.context('@/templates', true, /\.vue$/)

let templates = []
for (const file of requireTemplate.keys()) {
  const templateConfig = requireTemplate(file)
  templates.push({
    title: templateConfig.default.title || templateConfig.default.name,
    name: templateConfig.default.name
  })

  Vue.component(
    templateConfig.default.name,
    templateConfig.default || templateConfig,
  )
}

export default templates