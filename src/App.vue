<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="less">
  .size {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  html, body {
    .size;
    /*overflow: hidden;*/
    margin: 0;
    padding: 0;
    min-width: 1244px;
    overflow: hidden;
  }
  @media screen and (max-width: 1240px) {
    html,body {
      overflow-x: auto !important;
    }
  }

  #app {
    .size;
  }
</style>
