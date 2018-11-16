<template>
  <Row type="flex" align="top" justify="start" style="background: #fff">
    <Col span="24" style="display: flex;flex-direction: row; justify-content: space-between;align-items: center;">
      <div style="display: flex;flex-direction: row;justify-content: center;align-items: center;">
        <Button type="primary" size="default" :ghost="status === 2" @click="toggleHandle(1)">待处理</Button>
        <Button type="primary" size="default" :ghost="status === 1" style="margin-left: 10px;" @click="toggleHandle(2)">已处理</Button>
      </div>
      <div style="display:flex;flex-direction: row;justify-content: flex-start;align-items: center;">
        <Input v-model="start_sn" placeholder="请输入开始订单号"></Input>
        <Input v-model="end_sn" placeholder="请输入结束订单号" style="margin-left: 10px;"></Input>
        <Button type="primary" siz="default" style="margin-left: 10px;">导出数据</Button>
      </div>
    </Col>
    <Col span="24" style="margin-top: 15px;">
      <Input style="width: 250px;" size="default" v-model="searchKey" @on-search="searchByKey" placeholder="请输入商品名称/品种代码" search enter-button="搜索"></Input>
    </Col>
    <Col span="24" style="margin-top: 15px;">
      <Table size="large" border :columns="tableTitle" :data="tableData" :loading="loading"></Table>
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
    name: 'afterOrder',
    mixins: [Mixin],
    data () {
      return {
        loading: false,
        status: 1,
        start_sn: null,
        end_sn: null,
        searchKey: null,
        tableTitle: [
          {
            title: '序号',
            align: 'center',
            tooltip: true,
            // key: 'id'
            type: 'index'
          }, {
            title: '订单编号',
            align: 'center',
            tooltip: true,
            key: 'order_sn'
          }, {
            title: '用户昵称',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '提交申请时间',
            align: 'center',
            tooltip: true,
            key: 'created_at_str'
          }, {
            title: '实际收货日期',
            align: 'center',
            tooltip: true,
            key: 'receipt_date'
          }, {
            title: '协议处理金额',
            align: 'center',
            tooltip: true,
            key: 'pro_price'
          }, {
            title: '操作',
            align: 'center',
            fixed: 'right',
            render: (h, params) => {
              return <div>
                <i-button type="primary" size="small" nativeOnClick={this.toDetail.bind(this, params.row)}>查看订单</i-button>
              </div>
            }
          }
        ],
        tableData: []
      }
    },
    created () {
      this.initPage()
    },
    watch: {
      status (cur, old) {
        this.initPageData()
        this.updList()
      }
    },
    methods: {
      initPage () {
        this.getList()
      },
      async getList () {
        let query = {
          page: this.pages.pageNum,
          status: this.status === 1 ? '1' : '3',
          start_sn: this.start_sn,
          end_sn: this.end_sn,
          order_sn: this.searchKey
        }
        this.loading = true
        /* eslint-disable */
        let {data: {data, total, per_page}} = await this.$http.getAfterOrderList(query)
        data.forEach(item => {
          item.created_at_str = this.$util.getDateByTimestamp(item.created_at)
        }, this)
        this.loading = false
        this.tableData = data
        this.pages.pageSize = per_page
        this.pages.total = total
      },
      searchByKey () {
        this.getList()
      },
      toggleHandle (status) {
        this.status = status
      },
      updList () {
        this.$nextTick(() => {
          this.getList()
        })
      },
      changePageData () {
        this.getList()
      },
      toDetail (row) {
        this.$router.push({
          name: 'afterOrderDetail',
          params: {
            id: row.id,
            type: this.status === 1 ? '1' : '3'
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
