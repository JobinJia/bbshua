<template>
  <div>
    <Row type="flex" align="top" justify="start" style="background: #fff">
      <Col span="24" style="border: 1px solid #dddde2;padding: 8px 10px;">
        <Input size="default" v-model="searchKey" @on-search="searchByKey" style="width: 300px;" placeholder="请输入用户昵称"
               search enter-button="搜索"></Input>
      </Col>
      <Col span="24">
        <Table style="margin-top: 10px;" size="large" border :columns="tableTitle" :data="tableData"
               :laoding="loading"></Table>
        <div class="page-page">
          <Page @on-change="changePageData" :total="pages.total" show-total show-elevator
                :page-size="pages.pageSize"
                :current.sync="pages.pageNum"/>
        </div>
      </Col>
    </Row>
    <Modal title="头像预览" v-model="visible">
      <img :src="viewSrc" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script type="text/jsx">
  import Mixin from '@/common/js/app-mixin'

  export default {
    name: 'auth',
    mixins: [Mixin],
    data () {
      return {
        loading: false,
        visible: false,
        searchKey: null,
        viewSrc: null,
        tableTitle: [
          {
            title: '用户头像',
            align: 'center',
            tooltip: true,
            render: (h, params) => {
              return <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
                <img onClick={this.viewHandler.bind(this, params)} src={params.row.icon} width="40" height="40"/>
              </div>
            }
          }, {
            title: '用户昵称',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '消费总金额(￥)',
            align: 'center',
            tooltip: true,
            key: 'buy_price'
          }, {
            title: '下单次数',
            align: 'center',
            tooltip: true,
            key: 'order_number'
          }, {
            title: '手机号',
            align: 'center',
            tooltip: true,
            key: 'phone'
          }, {
            title: '欠款订单数',
            align: 'center',
            tooltip: true,
            key: 'diff_order'
          }, {
            title: '欠款金额',
            align: 'center',
            tooltip: true,
            key: 'diff_price'
          }
        ],
        tableData: []
      }
    },
    created () {
      this.initPage()
    },
    methods: {
      initPage () {
        this.getUserList()
      },
      async getUserList () {
        let query = {
          nick_name: this.searchKey,
          page: this.pages.pageNum
        }
        this.loading = true
        /* eslint-disable */
        let {data: {total, per_page, data}} = await this.$http.getUserList(query)
        console.log(per_page)
        this.loading = false
        this.tableData = data
        this.pages.total = total
        this.pages.pageSize = per_page
      },
      updList () {
        this.$nextTick(() => {
          this.getUserList()
        })
      },
      viewHandler (o) {
        if (o.row && o.row.icon) {
          this.visible = true
          this.viewSrc = o.row.icon
        }
      },
      changePageData () {
        this.updList()
      },
      searchByKey () {
        this.initPageData()
        this.updList()
      }
    }
  }
</script>

<style scoped type="text/css" lang="less">

</style>
