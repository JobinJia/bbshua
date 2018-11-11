<template>
  <Row type="flex" align="top" justify="start" style="background: #fff">
    <Col span="24">
      <Row type="flex" align="top" justify="space-between">
        <Col span="12">
          <h3 style="padding: 5px 10px;">日报表</h3>
          <Form :label-width="65" inline>
            <FormItem label="日期">
              <DatePicker type="date" placeholder="日期" style="width: 150px"></DatePicker>
            </FormItem>
            <FormItem>
              <Button type="primary" size="default">导出Excel</Button>
            </FormItem>
          </Form>
        </Col>
        <Col span="12">
          <h3 style="padding: 5px 10px;">周报表</h3>
          <Form :label-width="65" inline>
            <FormItem label="日期">
              <DatePicker type="date" placeholder="日期" style="width: 150px"></DatePicker>
              至
              <DatePicker type="date" placeholder="日期" style="width: 150px"></DatePicker>
            </FormItem>
            <FormItem>
              <Button type="primary" size="default">导出Excel</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </Col>
    <Divider></Divider>
    <Col span="12">
      <h3 style="padding: 5px 10px;">订单量统计</h3>
      <Form :label-width="65" inline>
        <FormItem label="日期">
          <DatePicker type="date" placeholder="日期" style="width: 150px"></DatePicker>
          至
          <DatePicker type="date" placeholder="日期" style="width: 150px"></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="primary" size="default">导出Excel</Button>
        </FormItem>
      </Form>
    </Col>
    <Divider></Divider>
    <Col span="24">
      <Form :model="searchForm" :label-width="80" inline>
        <FormItem label="订单编号">
          <Input clearable v-model="searchForm.orderNo" placeholder="请输入订单编号"></Input>
        </FormItem>
        <FormItem label="日期">
          <DatePicker type="date" placeholder="开始日期" format="yyyy-MM-dd" v-model="searchForm.startDate"
                      @on-change="changeStartDate"
                      style="width: 185px;"></DatePicker>
          &nbsp;-&nbsp;
          <DatePicker type="date" placeholder="结束日期" format="yyyy-MM-dd" v-model="searchForm.endDate"
                      @on-change="changeEndDate"
                      style="width: 185px;"></DatePicker>
        </FormItem>
        <FormItem label="用户昵称">
          <Input clearable v-model="searchForm.userName" placeholder="请输入用户昵称"></Input>
        </FormItem>
        <FormItem label="收货人">
          <Input clearable v-model="searchForm.consignee" placeholder="请输入收货人"></Input>
        </FormItem>
        <FormItem label="手机号码">
          <Input clearable v-model="searchForm.mobile" placeholder="请输入手机号码"></Input>
        </FormItem>
        <FormItem label="订单金额">
          <Input clearable v-model="searchForm.startAmt" placeholder="请输入0以外的起始金额" style="width: 185px;"></Input>
          &nbsp;-&nbsp;
          <Input clearable v-model="searchForm.endAmt" placeholder="请输入结束金额" style="width: 185px;"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="ios-search" @click="searchHandler">确认搜索</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="ios-download-outline" @click="exportExcel">导出未补差价订单</Button>
        </FormItem>
        <Divider></Divider>
        <FormItem :label-width="0">
          <Button type="primary" v-if="payStatus == 1">待付款</Button>
          <Button type="primary" @click="changeStatus(1)" v-else ghost>待付款</Button>
        </FormItem>
        <FormItem :label-width="0">
          <Button type="primary" v-if="payStatus == 2">待发货</Button>
          <Button type="primary" @click="changeStatus(2)" v-else ghost>待发货</Button>
        </FormItem>
        <FormItem :label-width="0">
          <Button type="primary" v-if="payStatus == 3">已发货</Button>
          <Button type="primary" @click="changeStatus(3)" v-else ghost>已发货</Button>
        </FormItem>
        <FormItem :label-width="0">
          <Button type="primary" v-if="payStatus == 4">已完成</Button>
          <Button type="primary" @click="changeStatus(4)" v-else ghost>已完成</Button>
        </FormItem>
        <FormItem :label-width="0">
          <Button type="primary" v-if="payStatus == 5">已取消</Button>
          <Button type="primary" @click="changeStatus(5)" v-else ghost>已取消</Button>
        </FormItem>
        <FormItem :label-width="0">
          <Button type="primary" ghost @click="toAfter">售后</Button>
        </FormItem>
      </Form>
    </Col>
    <Col span="24" v-if="payStatus == 2">
      <Divider></Divider>
      <Row type="flex" justify="space-around">
        <Col span="8">
          <Form :label-width="80" inline>
            <FormItem :label-width="0">
              <Button type="primary" v-if="subType == 1">缓冲区</Button>
              <Button type="primary" @click="changeSubType(1)" v-else ghost>缓冲区</Button>
            </FormItem>
            <FormItem :label-width="0">
              <Button type="primary" v-if="subType == 2">发货区</Button>
              <Button type="primary" @click="changeSubType(2)" v-else ghost>结算区</Button>
            </FormItem>
            <FormItem :label-width="0">
              <Button type="primary" v-if="subType == 3">结算区</Button>
              <Button type="primary" @click="changeSubType(3)" v-else ghost>结算区</Button>
            </FormItem>
          </Form>
          <Button type="primary" size="default">移到发货区</Button>
        </Col>
        <Col span="8">
          <Form :label-width="80" inline>
            <FormItem :label-width="0">
              <Button type="primary" v-if="subType == 1">缓冲区</Button>
              <Button type="primary" @click="changeSubType(1)" v-else ghost>缓冲区</Button>
            </FormItem>
            <FormItem :label-width="0">
              <Button type="primary" v-if="subType == 2">发货区</Button>
              <Button type="primary" @click="changeSubType(2)" v-else ghost>结算区</Button>
            </FormItem>
            <FormItem :label-width="0">
              <Button type="primary" v-if="subType == 3">结算区</Button>
              <Button type="primary" @click="changeSubType(3)" v-else ghost>结算区</Button>
            </FormItem>
          </Form>
          <Button type="primary" size="default">移入缓冲区</Button>
          <Button type="primary" size="default">移入结算区</Button>
        </Col>
        <Col span="8">
          <Form :label-width="80" inline>
            <FormItem :label-width="0">
              <Button type="primary" v-if="subType == 1">缓冲区</Button>
              <Button type="primary" @click="changeSubType(1)" v-else ghost>缓冲区</Button>
            </FormItem>
            <FormItem :label-width="0">
              <Button type="primary" v-if="subType == 2">发货区</Button>
              <Button type="primary" @click="changeSubType(2)" v-else ghost>结算区</Button>
            </FormItem>
            <FormItem :label-width="0">
              <Button type="primary" v-if="subType == 3">结算区</Button>
              <Button type="primary" @click="changeSubType(3)" v-else ghost>结算区</Button>
            </FormItem>
          </Form>
          <Button type="primary" size="default">移入发货区</Button>
        </Col>
      </Row>
    </Col>
    <Divider></Divider>
    <Col span="24">
      <Table :loading="loading" size="small" border :columns="tableHead" :data="tableData"></Table>
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
    name: 'order',
    mixins: [Mixin],
    data () {
      return {
        loading: false,
        payStatus: '1',
        subType: '',
        searchForm: {
          orderNo: null,
          startDate: null,
          endDate: null,
          userName: null,
          consignee: null,
          mobile: null,
          startAmt: null,
          endAmt: null
        },
        tableHead: [
          {
            width: 65,
            align: 'center',
            fixed: 'left',
            type: 'index',
            title: '序号'
          }, {
            title: '订单编号',
            align: 'center',
            tooltip: true,
            minWidth: 120,
            key: 'order_sn'
          }, {
            title: '用户昵称',
            align: 'center',
            minWidth: 120,
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '用户类型',
            align: 'center',
            minWidth: 90,
            tooltip: true,
            key: 'user_type'
          }, {
            title: '物流方式',
            align: 'center',
            minWidth: 90,
            tooltip: true,
            key: 'send_type_str'
          }, {
            title: '创建时间',
            align: 'center',
            minWidth: 150,
            tooltip: true,
            key: 'created_at_str'
          }, {
            title: '支付时间',
            align: 'center',
            minWidth: 150,
            tooltip: true,
            key: 'pay_at_str'
          }, {
            title: '预付款',
            align: 'center',
            minWidth: 90,
            tooltip: true,
            key: 'total_price'
          }, {
            title: '差价',
            align: 'center',
            minWidth: 90,
            tooltip: true,
            key: 'diffPrice'
          }, {
            title: '结算款',
            align: 'center',
            minWidth: 90,
            tooltip: true,
            key: 'allPrice'
          }, {
            title: '订单状态',
            align: 'center',
            minWidth: 100,
            tooltip: true,
            key: 'pay_status_str'
          }, {
            title: '订单说明',
            align: 'center',
            minWidth: 120,
            tooltip: true,
            key: 'order_tip_number'
          }, {
            fixed: 'right',
            title: '操作',
            align: 'center',
            tooltip: true,
            width: 220,
            render: (h, params) => {
              let route = `/order/orderList/orderDetail/${params.row.id}`
              let vm = <div style="display:flex;flexDirection:row;justifyContent:space-around;">
                <i-button type="primary" size="small" to={route} replace>查看订单</i-button>
                <i-button type="error" size="small" style="marginLeft:3px;">取消订单</i-button>
                <i-button type="primary" size="small" style="marginLeft:3px;">暂未录入</i-button>
              </div>
              return vm
            }
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
        this.getData()
      },
      async getData () {
        let query = {
          pay_status: this.payStatus,
          page: this.pages.pageNum,
          phone: this.searchForm.mobile,
          order_sn: this.searchForm.orderNo,
          start_price: this.searchForm.startAmt,
          end_price: this.searchForm.endAmt,
          nick_name: this.searchForm.userName,
          real_name: this.searchForm.consignee,
          type: this.subType,
          start_at: this.searchForm.startDate,
          end_at: this.searchForm.endDate,
          id: ''
        }
        this.loading = true
        let {data: {total, data}} = await this.$http.getOrderList(query)
        this.loading = false
        let that = this
        data.forEach(item => {
          item.send_type_str = that.$util.getNameByStatus(item.send_type, 'send_type', that.systemMap)
          item.pay_status_str = that.$util.getNameByStatus(item.pay_status, 'pay_status', that.systemMap)
          item.created_at_str = that.$util.getDateByTimestamp(item.created_at)
          item.pay_at_str = that.$util.getDateByTimestamp(item.pay_at)
          item.diffPrice = (0 + item.diff_good_price + item.diff_fre_price) === 0 ? '' : 0 + item.diff_good_price + item.diff_fre_price
          item.allPrice = (0 + item.total_price + item.diff_good_price + item.diff_fre_price) === 0 ? '' : 0 + item.total_price + item.diff_good_price + item.diff_fre_price
        })
        this.tableData = data
        this.pages.total = total
      },
      changePageData () {
        this.getData()
      },
      changeStartDate (format) {
        this.searchForm.startDate = format
      },
      changeEndDate (format) {
        this.searchForm.endDate = format
      },
      changeStatus (status) {
        this.payStatus = status + ''
        this.subType = '' // 切换付款状态时，子状态置空
        this.initPageData()
        this.updateList()
      },
      changeSubType (status) {
        this.subType = status + ''
        this.initPageData()
        this.updateList()
      },
      updateList () {
        this.$nextTick(() => {
          this.getData()
        })
      },
      searchHandler () {
        this.initPageData()
        this.updateList()
      },
      exportExcel () {
        window.location.href = 'https://bbshua.com/diff-order-export'
      },
      toAfter () {
        this.$router.push({
          name: 'afterOrder'
        })
      }
    }
  }
</script>

<style scoped>
</style>
