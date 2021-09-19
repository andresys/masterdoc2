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