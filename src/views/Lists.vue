<template>
  <main>
    <section>
      <router-link
        v-for="(item, index) in templates"
        :key="index"
        :to="{ name: 'Document', params: { template: item.name }}"
      >
        <img
          :src="getImgUrl(item.name)"
          :alt="item.title"
        />
        <span>{{ item.title }}</span>
      </router-link>
    </section>
  </main>
</template>

<script>
  import Templates from '@/plugins/template'

  export default {
    computed: {
      templates: () => Templates,
    },
    methods: {
      getImgUrl(pet) {
        if(pet === undefined) { return; }
        var images = require.context('../assets/templates/', false, /\.png$/)
        return images('./' + pet + '.png')
      },
    },
  }
</script>

<style>
  main {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 5px;
    flex-wrap: wrap;
  }
  section a>img {
    border: 1px solid lightgray;
    box-shadow: 10px 5px 5px lightgray;
  }
  section a {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
    padding: 20px;
    cursor: pointer;
    flex-basis: 0%;
    text-decoration: none;
  }
  section a:hover {
    background-color: lightgray;
  }
  section a>span {
    margin-top: 10px;
    text-align: center;
  }
</style>