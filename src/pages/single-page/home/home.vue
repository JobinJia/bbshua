<!--<template>-->
  <!--<div>-->
    <!--<Row>-->
      <!--<Col span="24" style="height: 250px">-->
        <!--<Card :padding="0">-->
          <!--<p slot="title">运营数据</p>-->
          <!--<div class="top-main">-->
            <!--<div class="t-l">-->
              <!--<Table size="small" :columns="tableTitle" :loading="topLoading" :data="tableData" style="border: none;"></Table>-->
            <!--</div>-->
            <!--<div class="t-r">-->
              <!--<div class="t-r-i">-->
                <!--<h3>总客户：</h3>-->
                <!--<p>{{merchantSum}}</p>-->
              <!--</div>-->
              <!--<div class="t-r-i">-->
                <!--<h3>总充值：</h3>-->
                <!--<p>{{rechargeSum}} 万</p>-->
              <!--</div>-->
              <!--<div class="t-r-i">-->
                <!--<h3>总换汇：</h3>-->
                <!--<p>{{exchangeSum}} 万</p>-->
              <!--</div>-->
              <!--<div class="t-r-i">-->
                <!--<h3>总付款：</h3>-->
                <!--<p>{{paymentSum}} 万</p>-->
              <!--</div>-->
              <!--<div class="t-r-i">-->
                <!--<h3>总提现：</h3>-->
                <!--<p>{{withDrawSum}} 万</p>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</Card>-->
      <!--</Col>-->
    <!--</Row>-->
    <!--<Row type="flex" align="middle" justify="space-between">-->
      <!--<Col span="16" class="card-list">-->
        <!--<Card v-for="(item, index) in cardList" :key="index" class="card-item" :padding="0">-->
          <!--<p slot="title">{{item.title}}</p>-->
          <!--<Table style="border: none;" :columns="item.tableTitle" :loading="item.loading" size="small"-->
                 <!--:data="item.tableData"></Table>-->
        <!--</Card>-->
      <!--</Col>-->
      <!--<Col span="8" class="card-list-right">-->
        <!--<Card class="right-card1" :padding="0">-->
          <!--<p slot="title">最近交易记录</p>-->
          <!--<Table :columns="tradeTitle" :loading="tradeLoading" size="small" :data="tradeData" style="border: none;"></Table>-->
        <!--</Card>-->
        <!--<Card class="right-card2" :padding="0">-->
          <!--<p slot="title">客户交易排行</p>-->
          <!--<Table :columns="rankTitle" :loading="rankLoading" size="small" :data="rankData" style="border: none;"></Table>-->
        <!--</Card>-->
      <!--</Col>-->
    <!--</Row>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--import Mixin from '@js/app-mixin'-->

  <!--export default {-->
    <!--name: 'home',-->
    <!--mixins: [Mixin],-->
    <!--components: {-->
      <!--// InforCard,-->
      <!--// CountTo,-->
      <!--// ChartPie,-->
      <!--// ChartBar,-->
      <!--// Example-->
    <!--},-->
    <!--data () {-->
      <!--return {-->
        <!--tableData: [],-->
        <!--topLoading: false,-->
        <!--tableTitle: [-->
          <!--{-->
            <!--width: 80,-->
            <!--title: '',-->
            <!--key: 'titleName',-->
            <!--align: 'center'-->
          <!--}, {-->
            <!--title: '今天',-->
            <!--align: 'center',-->
            <!--key: 'todayStr'-->
          <!--}, {-->
            <!--title: '昨天',-->
            <!--align: 'center',-->
            <!--key: 'yesStr'-->
          <!--}, {-->
            <!--title: '本周',-->
            <!--align: 'center',-->
            <!--key: 'weekStr'-->
          <!--}, {-->
            <!--title: '上周',-->
            <!--align: 'center',-->
            <!--key: 'laswStr'-->
          <!--}, {-->
            <!--title: '本月',-->
            <!--align: 'center',-->
            <!--key: 'monStr'-->
          <!--}, {-->
            <!--title: '上月',-->
            <!--align: 'center',-->
            <!--key: 'lasmStr'-->
          <!--}-->
        <!--],-->
        <!--cardList: [-->
          <!--{-->
            <!--id: 1,-->
            <!--title: '充值待审核',-->
            <!--tableTitle: [-->
              <!--{-->
                <!--title: '提交时间',-->
                <!--align: 'center',-->
                <!--key: 'date'-->
              <!--}, {-->
                <!--title: '充值币种金额',-->
                <!--align: 'center',-->
                <!--key: 'content'-->
              <!--}, {-->
                <!--title: '商户',-->
                <!--align: 'center',-->
                <!--key: 'merchantNo'-->
              <!--}-->
            <!--],-->
            <!--tableData: [],-->
            <!--loading: true-->
          <!--}, {-->
            <!--id: 2,-->
            <!--title: '换汇待审核',-->
            <!--tableTitle: [-->
              <!--{-->
                <!--title: '提交时间',-->
                <!--align: 'center',-->
                <!--key: 'date'-->
              <!--}, {-->
                <!--title: '换汇金额',-->
                <!--align: 'center',-->
                <!--key: 'content'-->
              <!--}, {-->
                <!--title: '商户',-->
                <!--align: 'center',-->
                <!--key: 'merchantNo'-->
              <!--}-->
            <!--],-->
            <!--tableData: [],-->
            <!--loading: true-->
          <!--}, {-->
            <!--id: 6,-->
            <!--title: '反洗钱待审核',-->
            <!--tableTitle: [-->
              <!--{-->
                <!--title: '提交时间',-->
                <!--align: 'center',-->
                <!--key: 'date'-->
              <!--}, {-->
                <!--title: '业务类型',-->
                <!--align: 'center',-->
                <!--key: 'content'-->
              <!--}, {-->
                <!--title: '商户',-->
                <!--align: 'center',-->
                <!--key: 'merchantNo'-->
              <!--}-->
            <!--],-->
            <!--tableData: [],-->
            <!--loading: true-->
          <!--}, {-->
            <!--id: 3,-->
            <!--title: '付款待审核',-->
            <!--tableTitle: [-->
              <!--{-->
                <!--title: '提交时间',-->
                <!--align: 'center',-->
                <!--key: 'date'-->
              <!--}, {-->
                <!--title: '付款币种金额',-->
                <!--align: 'center',-->
                <!--key: 'content'-->
              <!--}, {-->
                <!--title: '商户',-->
                <!--align: 'center',-->
                <!--key: 'merchantNo'-->
              <!--}-->
            <!--],-->
            <!--tableData: [],-->
            <!--loading: true-->
          <!--}, {-->
            <!--id: 4,-->
            <!--title: '提现待审核',-->
            <!--tableTitle: [-->
              <!--{-->
                <!--title: '提交时间',-->
                <!--align: 'center',-->
                <!--key: 'date'-->
              <!--}, {-->
                <!--title: '提现币种金额',-->
                <!--align: 'center',-->
                <!--key: 'content'-->
              <!--}, {-->
                <!--title: '商户',-->
                <!--align: 'center',-->
                <!--key: 'merchantNo'-->
              <!--}-->
            <!--],-->
            <!--tableData: [],-->
            <!--loading: true-->
          <!--}, {-->
            <!--id: 5,-->
            <!--title: '商户待审核',-->
            <!--tableTitle: [-->
              <!--{-->
                <!--title: '提交时间',-->
                <!--align: 'center',-->
                <!--key: 'date'-->
              <!--}, {-->
                <!--title: '提交申请人',-->
                <!--align: 'center',-->
                <!--key: 'content'-->
              <!--}, {-->
                <!--title: '商户',-->
                <!--align: 'center',-->
                <!--key: 'merchantNo'-->
              <!--}-->
            <!--],-->
            <!--tableData: [],-->
            <!--loading: true-->
          <!--}-->
        <!--],-->
        <!--tradeTitle: [-->
          <!--{-->
            <!--title: '提交时间',-->
            <!--align: 'center',-->
            <!--key: 'date'-->
          <!--}, {-->
            <!--title: '交易类型',-->
            <!--align: 'center',-->
            <!--key: 'type'-->
          <!--}, {-->
            <!--title: '交易币种金额',-->
            <!--align: 'center',-->
            <!--key: 'content'-->
          <!--}, {-->
            <!--title: '商户',-->
            <!--align: 'center',-->
            <!--key: 'merchantNo'-->
          <!--}-->
        <!--],-->
        <!--tradeData: [],-->
        <!--tradeLoading: false,-->
        <!--rankTitle: [-->
          <!--{-->
            <!--title: '商户',-->
            <!--align: 'center',-->
            <!--key: 'merchantNo'-->
          <!--}, {-->
            <!--title: '充值笔数',-->
            <!--align: 'center',-->
            <!--key: 'count'-->
          <!--}, {-->
            <!--title: '充值金额',-->
            <!--align: 'center',-->
            <!--key: 'amount'-->
          <!--}-->
        <!--],-->
        <!--rankData: [],-->
        <!--rankLoading: false,-->
        <!--exchangeSum: null,-->
        <!--merchantSum: null,-->
        <!--paymentSum: null,-->
        <!--rechargeSum: null,-->
        <!--withDrawSum: null-->
      <!--}-->
    <!--},-->
    <!--created () {-->
      <!--this.initPage()-->
    <!--},-->
    <!--methods: {-->
      <!--initPage () {-->
        <!--this.queryBusinessStatistic()-->
        <!--this.getTopLeftData()-->
        <!--this.getCardListItemList()-->
        <!--this.getTradeRecord()-->
      <!--},-->
      <!--async getTopLeftData () {-->
        <!--let {data: {exchangeSum, merchantSum, paymentSum, rechargeSum, withDrawSum}} = await this.$http.queryBusinessSum()-->
        <!--this.exchangeSum = exchangeSum-->
        <!--this.merchantSum = merchantSum-->
        <!--this.paymentSum = paymentSum-->
        <!--this.rechargeSum = rechargeSum-->
        <!--this.withDrawSum = withDrawSum-->
      <!--},-->
      <!--async queryBusinessStatistic () {-->
        <!--this.topLoading = true-->
        <!--let {data} = await this.$http.queryBusinessStatistic()-->
        <!--data.forEach(item => {-->
          <!--let type = item.businessType-->
          <!--//  R-充值 E-换汇 P-付款 W-提现-->
          <!--item.titleName = type === 'R' ? '充值' : type === 'E' ? '换汇' : type === 'P' ? '付款' : type === 'W' ? '提现' : ''-->
          <!--item.todayStr = item.todayAmount + '/' + item.todayCount-->
          <!--item.yesStr = item.yesterdayAmount + '/' + item.yesterdayCount-->
          <!--item.weekStr = item.weekAmount + '/' + item.weekCount-->
          <!--item.laswStr = item.lastWeekAmount + '/' + item.lastWeekCount-->
          <!--item.monStr = item.monthAmount + '/' + item.montCount-->
          <!--item.lasmStr = item.lastMounthAmount + '/' + item.lastMonthCount-->
        <!--})-->
        <!--this.topLoading = false-->
        <!--this.tableData = data-->
      <!--},-->
      <!--getMerName (arr) {-->
        <!--let that = this-->
        <!--if (arr && arr.length !== 0) {-->
          <!--arr.forEach(item => {-->
            <!--item.merchantNo = that.merMap[item.merchantNo]-->
          <!--})-->
        <!--}-->
        <!--return arr-->
      <!--},-->
      <!--async getCardListItemList () {-->
        <!--let {data: {amlList, exchangeList, merchantList, paymentList, rechargeList, withDrawList}} =-->
          <!--await this.$http.queryBusinessList()-->
        <!--let cardList = [...this.cardList]-->
        <!--cardList.forEach(item => {-->
          <!--switch (item.id) {-->
            <!--case 1:-->
              <!--item.tableData = this.getMerName(rechargeList)-->
              <!--break-->
            <!--case 2:-->
              <!--item.tableData = this.getMerName(exchangeList)-->
              <!--break-->
            <!--case 3:-->
              <!--item.tableData = this.getMerName(paymentList)-->
              <!--break-->
            <!--case 4:-->
              <!--item.tableData = this.getMerName(withDrawList)-->
              <!--break-->
            <!--case 5:-->
              <!--item.tableData = merchantList-->
              <!--break-->
            <!--case 6:-->
              <!--item.tableData = this.getMerName(amlList)-->
              <!--break-->
            <!--default:-->
              <!--break-->
          <!--}-->
          <!--item.loading = false-->
        <!--})-->
        <!--this.cardList = cardList-->
      <!--},-->
      <!--async getTradeRecord () {-->
        <!--this.tradeLoading = true-->
        <!--this.rankLoading = true-->
        <!--let {data: {businessTradeList, businessMerchantTradeList}} = await this.$http.queryBusinessRecord()-->
        <!--let that = this-->
        <!--businessTradeList.forEach(item => {-->
          <!--item.type = that._$.getNameByStatus(item.type, 'businessType', that.systemMap)-->
        <!--})-->
        <!--this.tradeData = this.getMerName(businessTradeList)-->
        <!--this.rankData = this.getMerName(businessMerchantTradeList)-->
        <!--this.tradeLoading = false-->
        <!--this.rankLoading = false-->
      <!--}-->
    <!--},-->
    <!--mounted () {-->
      <!--//-->
    <!--}-->
  <!--}-->
<!--</script>-->

<!--<style lang="less">-->
  <!--.top-main {-->
    <!--display: flex;-->
    <!--flex-direction: row;-->
    <!--justify-content: flex-start;-->
    <!--align-items: center;-->
    <!--.t-l {-->
      <!--width: 79%;-->
    <!--}-->
    <!--.t-r {-->
      <!--width: 20%;-->
      <!--margin-left: 10px;-->
      <!--.t-r-i {-->
        <!--display: flex;-->
        <!--flex-direction: row;-->
        <!--justify-content: flex-start;-->
        <!--align-items: center;-->
        <!--line-height: 39px;-->
        <!--h3 {-->
          <!--font-size: 14px;-->
        <!--}-->
      <!--}-->
    <!--}-->
  <!--}-->

  <!--.card-list {-->
    <!--display: flex;-->
    <!--flex-direction: row;-->
    <!--justify-content: flex-start;-->
    <!--align-items: center;-->
    <!--flex-wrap: wrap;-->
    <!--.card-item {-->
      <!--width: 48.5%;-->
      <!--height: 285px;-->
      <!--margin-top: 10px;-->
      <!--&:nth-child(2n) {-->
        <!--margin-left: 1.5%;-->
      <!--}-->
    <!--}-->
  <!--}-->

  <!--.card-list-right {-->
    <!--display: flex;-->
    <!--flex-direction: column;-->
    <!--justify-content: flex-start;-->
    <!--align-items: center;-->
    <!--.right-card1 {-->
      <!--width: 100%;-->
      <!--height: 433px;-->
      <!--margin-top: 10px;-->
      <!--overflow-y: scroll;-->
    <!--}-->
    <!--.right-card2 {-->
      <!--width: 100%;-->
      <!--height: 433px;-->
      <!--margin-top: 10px;-->
      <!--overflow-y: scroll;-->
    <!--}-->
  <!--}-->
<!--</style>-->
