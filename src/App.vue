<template>
  <router-view />
</template>

<script>
  // Styles
  // import '@/styles/overrides.sass'

  export default {
    name: 'MasterDoc',
    metaInfo: {
      title: 'Мастер документов',
      titleTemplate: '%s',
      htmlAttrs: { lang: 'ru' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  }
</script>

<style>
  @font-face {
    font-family: "Times NR Cyr MT";
    src: url("./assets/fonts/times-nr-cyr-mt/times-nr-cyr-mt.eot"); /* IE9 Compat Modes */
    src: url("./assets/fonts/times-nr-cyr-mt/times-nr-cyr-mt.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
      url("./assets/fonts/times-nr-cyr-mt/times-nr-cyr-mt.otf") format("opentype"), /* Open Type Font */
      url("./assets/fonts/times-nr-cyr-mt/times-nr-cyr-mt.svg") format("svg"), /* Legacy iOS */
      url("./assets/fonts/times-nr-cyr-mt/times-nr-cyr-mt.ttf") format("truetype"), /* Safari, Android, iOS */
      url("./assets/fonts/times-nr-cyr-mt/times-nr-cyr-mt.woff") format("woff"), /* Modern Browsers */
      url("./assets/fonts/times-nr-cyr-mt/times-nr-cyr-mt.woff2") format("woff2"); /* Modern Browsers */
    font-weight: normal;
    font-style: normal;
  }
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: black;
    background: rgb(248, 249, 250);
  }
</style>