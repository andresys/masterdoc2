<template>
  <main class="list_page">
    <header>
      <img src="@/assets/masterdoc.png" alt="Мастер Док."/>
    </header>
    <section>
      <router-link to="/new">
        <div>
          <span style="font-family: 'Ruslan Display', cursive">Создать новый документ</span>
        </div>
      </router-link>
      <router-link
        v-for="(item, index) in templates"
        :key="index"
        :to="{ name: 'Document', params: { template: item.name }}"
      >
        <div>
          <img
            :src="getImgUrl(item.name)"
            :alt="item.title"
          />
          <span>{{ item.title }}</span>
        </div>
      </router-link>
    </section>
  </main>
</template>

<script>
  import { get } from 'vuex-pathify'

  export default {
    computed: {
      ...get ('app', ['templates']),
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

<style scope lang="scss">
  main.list_page {
    height: 100%;
    background-color: white;
    min-width: 650px;
    header {
      text-align: center;
    }
    header img {
      margin-top: 150px;
    }
    section {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 5px;
      flex-wrap: wrap;
      width: 100%;
      background-color: #87ADBD;
      padding: 60px 0;
    }
    section a {
      color: #4A4A4A;
      cursor: pointer;
      text-decoration: none;
      position: relative;
      width: 239px;
      height: 326px;
      padding: 20px;
      box-sizing: border-box;
    }
    section a:hover {
      background-color: #ffffff25;
    }
    section a>div {
      width: 100%;
      height: 100%;
      background: white;
      border: 1px solid #BABABA;
      box-shadow: 7px 4px 4px #00000025;
    }
    section a span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      font-family: 'Share', cursive;
    }
    section a img {
      filter: blur(2px);
      opacity: 0.6;
    }
  }
</style>