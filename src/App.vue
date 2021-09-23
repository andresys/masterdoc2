<template>
  <router-view />
</template>

<script>
  // Styles
  import '@/styles/fonts.scss'

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
    background: rgba(200, 250, 230, 0.2);
  }
  .container {
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 10px;
  }
</style>