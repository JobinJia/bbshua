<template>
  <Row type="flex" align="top" justify="start" style="background: #fff">
    <Col span="24" style="border: 1px solid #dddde2;padding: 8px 10px;">
      <Input size="default" v-model="start_sn" style="width: 300px;" placeholder="请输入开始订单号"></Input>
      -
      <Input size="default" v-model="end_sn" style="width: 300px;" placeholder="请输入结束订单号"></Input>
      <Button type="primary" size="default" @click="clickHandler">确认</Button>
      <Button type="primary" size="default" style="margin-left: auto;" ghost>昆明结算表</Button>
      <Button type="primary" size="default" style="margin-left: auto;" ghost>平台结算表</Button>
    </Col>
    <Col span="24">
      <Table style="margin-top: 10px;" size="large" border :columns="tableTitle" :data="tableData"></Table>
      <div class="page-page">
        <Page @on-change="changePageData" :total="pages.total" show-total show-elevator
              :page-size="pages.pageSize"
              :current.sync="pages.pageNum"/>
      </div>
    </Col>
    <Col span="24" style="text-align: right;margin-top: 10px;">
      <Button type="primary" size="default" @click="financeExport">审核发布</Button>
      <Button type="primary" size="default" @click="exportExcel">导出Excel</Button>
    </Col>
  </Row>
</template>

<script type="text/jsx">
  import Mixin from '@/common/js/app-mixin'

  export default {
    name: 'financeList',
    mixins: [Mixin],
    data () {
      return {
        start_sn: null,
        // start_sn: '201811090037',
        end_sn: null,
        // end_sn: '201811090051',
        tableTitle: [
          {
            title: '序号',
            align: 'center',
            tooltip: true,
            key: 'id'
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
            title: '收货人',
            align: 'center',
            tooltip: true,
            key: 'receiver'
          }, {
            title: '创建时间',
            align: 'center',
            tooltip: true,
            key: 'createStr'
          }, {
            title: '支付时间',
            align: 'center',
            tooltip: true,
            key: 'payStr'
          }, {
            title: '花材结算款',
            align: 'center',
            tooltip: true,
            key: 'good_price'
          }, {
            title: '物流结算款',
            align: 'center',
            tooltip: true,
            key: 'freight'
          }, {
            title: '总结算款',
            align: 'center',
            tooltip: true,
            key: 'total_price'
          }, {
            title: '物流差价',
            align: 'center',
            tooltip: true,
            key: 'diff_price'
          }, {
            title: '订单说明',
            align: 'center',
            tooltip: true,
            render: (h, params) => {
              return <div>
                <i-input value={params.row.desMsg}></i-input>
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
    methods: {
      initPage () {
      },
      formatDate (val) {
        return new Date(parseInt(val) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')
      },
      async clickHandler () {
        let query = {
          start_sn: this.start_sn,
          end_sn: this.end_sn
        }
        let {data} = await this.$http.getFinanceList(query)
        let that = this
        data.forEach(item => {
          item.createStr = that.formatDate(item.created_at)
          item.payStr = that.formatDate(item.pay_at)
        })
        // console.log(data)
        this.tableData = data
      },
      changePageData () {
      },
      financeExport () {
        let that = this
        console.log(that.tableData)
        if (that.tableData.length > 0) {
          this.$http.financepost({'finance_list': JSON.stringify(that.tableData)}).then(res => {
            if (res.code === 0) {
              that.$Message.success({
                content: '保存成功'
              })
              that.clickHandler()
            }
          })
        } else {
          that.$Message.error({
            content: '请先查询订单'
          })
        }
      },
      exportExcel () {
        window.location.href = 'https://bbshua.com/finance-export?start_sn=' + this.start_sn + '&end_sn=' + this.end_sn
      }
    }
  }
</script>

<style scoped type="text/css" lang="less">

</style>
