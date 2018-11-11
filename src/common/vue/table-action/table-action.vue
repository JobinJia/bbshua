<template>
  <div>
    <template slot="action" slot-scope="props">
      <Button type="primary" size="small">修改</Button>
      <Divider type="vertical"/>
      <Poptip confirm title="Delete this item?" transfer>
        <Button type="warning" size="small">删除</Button>
      </Poptip>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'table-action'
  }
</script>

<style scoped type="text/css" lang="less">

</style>
