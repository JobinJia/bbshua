<template>
  <Row type="flex" align="top" justify="center" style="background: #fff">
    <Col span="24" style="display: flex;flex-direction: row;justify-content: flex-start; align-content: center;">
      <Form inline
            style="width:100%;display: flex;flex-direction: row;justify-content: space-between;align-content: center;">
        <FormItem style="width: 250px;">
          <Input size="default" placeholder="请输入商品名称/品种代码" search enter-button="搜索"></Input>
        </FormItem>
        <FormItem>
          <Button size="default" icon="ios-add" type="primary">添加商品</Button>
        </FormItem>
      </Form>
    </Col>
    <Col span="24">
      <Table style="margin-top: 10px;" size="large" border :columns="tableTitle" :data="tableData"></Table>
      <div class="page-page">
        <Page @on-change="changePageData" :total="pages.total" show-total show-elevator
              :page-size="pages.pageSize"
              :current.sync="pages.pageNum"/>
      </div>
    </Col>
  </Row>
</template>

<script>
  import Mixin from '@/common/js/app-mixin'

  export default {
    name: 'hot-flower',
    mixins: [Mixin],
    data () {
      return {
        tableTitle: [
          {
            title: '商品ID',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '商品图片',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '商品名称',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '颜色',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '规格',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '特性描述',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '品种描述',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '品种代码',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '上下架',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '操作',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }
        ],
        tableData: []
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
