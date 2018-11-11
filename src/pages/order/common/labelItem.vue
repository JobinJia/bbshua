<template>
  <div v-if="pageList.length !== 0">
    <div v-for="(item, index) in pageList" :key="index">
      <div style="padding: 10px 0 0 0; margin-top: 10px;font-size: 18px;">
        <Icon :type="item.icon" :size="20"/>
        {{item.title}}
      </div>
      <Table style="margin-top: 15px;" size="large" border :columns="item.tableTitle" :data="item.data"></Table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'labelItem',
    props: {
      pageList: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style scoped>

</style>
