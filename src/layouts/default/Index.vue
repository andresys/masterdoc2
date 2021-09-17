<template>
  <default-view />
</template>

<script>
  export default {
    name: 'DefaultLayout',

    components: {
      DefaultView: () => import(
        /* webpackChunkName: "default-view" */
        './View'
      ),
    },
  }
</script>
