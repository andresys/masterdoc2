<template>
  <main class="error_page">
    <picture>
      <svg width="215" height="215" viewBox="0 0 215 215" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="107.5" cy="107.5" r="107.5" fill="#444444"/>
        <circle cx="107.5" cy="107.5" r="89.5" fill="white"/>
        <circle cx="71" cy="71" r="18" fill="#444444"/>
        <circle cx="143" cy="71" r="18" fill="#444444"/>
        <mask id="path-5-inside-1" fill="white">
        <path d="M159 162.5C159 150.167 153.521 138.34 143.77 129.62C134.018 120.899 120.791 116 107 116C93.2087 116 79.9823 120.899 70.2305 129.62C60.4786 138.34 55 150.167 55 162.5L74.3165 162.5C74.3165 154.749 77.7599 147.315 83.8893 141.834C90.0186 136.353 98.3318 133.273 107 133.273C115.668 133.273 123.981 136.353 130.111 141.834C136.24 147.315 139.684 154.749 139.684 162.5H159Z"/>
        </mask>
        <path d="M159 162.5C159 150.167 153.521 138.34 143.77 129.62C134.018 120.899 120.791 116 107 116C93.2087 116 79.9823 120.899 70.2305 129.62C60.4786 138.34 55 150.167 55 162.5L74.3165 162.5C74.3165 154.749 77.7599 147.315 83.8893 141.834C90.0186 136.353 98.3318 133.273 107 133.273C115.668 133.273 123.981 136.353 130.111 141.834C136.24 147.315 139.684 154.749 139.684 162.5H159Z" stroke="#444444" stroke-width="36" stroke-linejoin="round" mask="url(#path-5-inside-1)"/>
      </svg>
    </picture>
    <h1>404</h1>
    <h2>Page not found</h2>
    <div>
      <span>
        Страница, на которую вы попали, не существует или произошла другая ошибка.<br/>
        Вернитесь <a href="" @click.prevent.stop="$router.back()">Назад</a>
        или перейдите на <a href="/">Главную страницу</a>.
      </span>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'ErrorView'
  }
</script>

<style scope lang="scss">
  main.error_page {
    height: 100%;
    font-family: 'Share', cursive;
    font-style: normal;
    color: #444444;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
      margin-top: 14px;
      font-size: 96px;
      line-height: 124px;
      font-weight: normal;
    }
    h2 {
      margin-top: 10px;
      font-family: 'Share', cursive;
      font-weight: normal;
      font-size: 26px;
      line-height: 34px;
      color: #9D9999;
    }
    div {
      margin-top: 10px;
      font-weight: normal;
      font-size: 14px;
      line-height: 22px;
      text-align: center;
    }
    a {
      color: #2BA3D4;
      text-decoration: none;
      cursor: pointer;
    }
  }
</style>