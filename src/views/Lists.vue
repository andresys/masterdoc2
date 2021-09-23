<template>
  <div class="lists">
    <header>
      <div class="container">
        <img src="@/assets/masterdoc.png" alt="Мастер Док."/>
      </div>
    </header>

    <main>
      <div class="container">
        <!--router-link to="/new">
          <div>
            <span style="font-family: 'Ruslan Display', cursive">Создать новый документ</span>
          </div>
        </router-link-->
        <router-link
          v-for="(item, index) in templates"
          :key="index"
          :to="{ name: 'Document', params: { template: item.name }}"
        >
          <div>
            <img
              :src="getImgUrl('template.png')"
              :alt="item.title"
            />
            <span>{{ item.title }}</span>
          </div>
        </router-link>
      </div>
    </main>

    <footer>
      <div class="container">
        <div class="row">
          <div class="col">
            © Администрация города Твери, 2021<br>
            <small>Разработка: отдел информационных ресурсов и технологий Администрации города Твери</small><br>
            <small><a href="mailto:it@adm.tver.ru?subject=АИС%20Очередники" mb-checked="1" data-tip="">it@adm.tver.ru</a>, (4822) 36-32-80 доб. 1100</small>
          </div>  
          <div class="col-md-auto">
            &nbsp;
          </div>
          <div class="col col-lg-2 text-right">
            <small>Версия: 0.8 beta от 23.09.2021 </small>
          </div>
        </div>
      </div>          
    </footer>
  </div>
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
        var images = require.context('../assets/', false, /\.png$/)
        return images('./' + pet)
      },
    },
  }
</script>

<style scope lang="scss">
  .lists {
    background-color: white;
    min-height: 100%;
  }
  header {
    text-align: center;
    img {
      margin-top: 150px;
      max-width: 100%;
    }
  }
  main {
    width: 100%;
    background-color: #87ADBD;
    padding: 60px 0;
    >div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 5px;
      flex-wrap: wrap;
    }
    a {
      color: #4A4A4A;
      cursor: pointer;
      text-decoration: none;
      position: relative;
      width: 239px;
      height: 326px;
      padding: 20px;
      box-sizing: border-box;
      >div {
        width: 100%;
        height: 100%;
        background: white;
        border: 1px solid #BABABA;
        box-shadow: 7px 4px 4px #00000025;
      }
      span {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        font-family: 'Share', cursive;
      }
      img {
        filter: blur(2px);
        opacity: 0.6;
      }
    }
    a:hover {
      background-color: #ffffff25;
    }
  }
  footer {
    padding: 30px 0;
  }
  .row {
    display: flex;
    flex-direction: row;
    align-items: justify;
    justify-content: space-between;
  }
</style>