<template>
  <Row type="flex" align="top" justify="start">
    <Col span="24" style="text-align: right;margin-top: 10px;">
      <Button type="primary" size="large">添加</Button>
    </Col>
    <Col span="24">
      <Table size="large" border :columns="groupTitle" :data="groupData"></Table>
    </Col>
  </Row>
</template>

<script>
  import Mixin from '@/common/js/app-mixin'
  export default {
    name: 'groupList',
    mixins: [Mixin],
    data () {
      return {
        groupTitle: [
          {
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
        groupData: []
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
