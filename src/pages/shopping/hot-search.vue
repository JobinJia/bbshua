<template>
  <Row type="flex" align="top" justify="start">
    <Col span="24" style="text-align: right;">
      <Button type="primary" size="default">添加</Button>
    </Col>
    <Col span="24">
      <Table style="margin-top: 10px;" size="small" border :columns="tableTitle" :data="tableData"></Table>
      <div class="page-page">
        <Page @on-change="changePageData" :total="pages.total" show-total show-elevator
              :page-size="pages.pageSize"
              :current.sync="pages.pageNum"/>
      </div>
    </Col>
  </Row>
</template>

<script type="text/jsx">
  import Mixin from '@/common/js/app-mixin'
  export default {
    name: 'hot-search',
    mixins: [Mixin],
    data () {
      return {
        tableTitle: [
          {
            align: 'center',
            fixed: 'left',
            title: '序号',
            key: ''
          }, {
            align: 'center',
            fixed: 'left',
            title: '内容',
            key: ''
          }, {
            align: 'center',
            fixed: 'left',
            title: '操作',
            key: '',
            render: (h, params) => {
              return <div style="display:flex;flexDirection:row;justify-content:space-around;align-items:center;">
                <i-button type="primary" size="small">编辑</i-button>
                <i-button type="error" size="small">删除</i-button>
              </div>
            }
          }
        ],
        tableData: [{}, {}]
      }
    },
    created () {},
    methods: {
      changePageData () {}
    }
  }
</script>

<style scoped>

</style>
