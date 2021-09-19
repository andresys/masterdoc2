/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

 // Imports
 import WebFontLoader from 'webfontloader'

WebFontLoader.load({
  google: {
    families: ['Ruslan+Display', 'Share', 'Pavanam'],
  },
  timeout: 2000,
})
