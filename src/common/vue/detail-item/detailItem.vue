<template>
  <div class="detail-item">
    <h3>{{name}} :</h3>
    <p>{{content}}</p>
  </div>
</template>

<script>
  export default {
    name: 'detailItem',
    props: {
      name: {
        type: String,
        default: ''
      },
      content: {
        type: [String, Number]
      }
    }
  }
</script>

<style scoped type="text/css" lang="less">
  .detail-item {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    line-height: 35px;
    padding: 0 20px;
    h3 {
      font-size: 14px;
      /*width: 25%;*/
      width: 35%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
    p {
      width: 50%;
      text-indent: 10px;
      font-size: 14px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }
  }
</style>
