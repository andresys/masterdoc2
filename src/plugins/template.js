/**
 * plugins/template.js
 *
 * Automatically loads and bootstraps files
 * in the `./src/templates/` folder.
 */

// Imports
import Vue from 'vue'

const requireTemplate = require.context('@/templates', true, /\.vue$/)

for (const file of requireTemplate.keys()) {
  const templateConfig = requireTemplate(file)

  Vue.component(
    templateConfig.default.name,
    templateConfig.default || templateConfig,
  )
}