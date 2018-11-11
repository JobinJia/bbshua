<template>
  <Row type="flex" align="top" justify="start">
    <Col span="24" style="text-align: right;margin-top: 10px;">
      <Button type="primary" size="large">添加</Button>
    </Col>
    <Col span="24">
      <Table size="large" border :columns="userTitle" :data="userData"></Table>
    </Col>
  </Row>
</template>

<script>
  import Mixin from '@/common/js/app-mixin'

  export default {
    name: 'userList',
    mixins: [Mixin],
    data () {
      return {
        userTitle: [
          {
            title: '工号',
            align: 'center',
            tooltip: true,
            key: 'id'
          }, {
            title: '姓名',
            align: 'center',
            tooltip: true,
            key: 'id'
          }, {
            title: '分组',
            align: 'center',
            tooltip: true,
            key: 'id'
          }, {
            title: '操作',
            align: 'center',
            tooltip: true,
            key: 'id'
          }
        ],
        userData: []
      }
    },
    created () {
      this.initPage()
    },
    methods: {
      initPage () {
      }
    }
  }
</script>

<style scoped type="text/css" lang="less">

</style>
