<template>
  <Row type="flex" align="top" justify="start" style="background: #fff">
    <Col span="24" style="border: 1px solid #dddde2;padding: 8px 10px;">
      <Input size="default" v-model="start_sn" style="width: 300px;" placeholder="请输入开始订单号"></Input>
      -
      <Input size="default" v-model="end_sn" style="width: 300px;" placeholder="请输入结束订单号"></Input>
      <Button type="primary" size="default" @click="searchHandle">确定</Button>
      <Button type="primary" size="default" style="margin-left: auto;" @click="printHandle">打印</Button>
    </Col>
    <Col style="margin-top: 15px;" v-show="(start_sn !== null && start_sn !== '')">
      <h4 style="font-size: 16px;">订单编号: {{start_sn}}, {{end_sn}}</h4>
    </Col>
    <Col span="24">
      <Card :padding="0" dis-hover :bordered="false">
        <div style="text-align: center;font-size: 15px;width: 100%;display: inline-block; margin-top: 10px;">
          <h3 style="text-align: center;">采购统计表</h3>
          <h3 style="text-align: center;">{{start_sn}} - {{end_sn}}</h3>
        </div>
        <div v-for="item in proData" :key="item.cate_id">
          <div
            style="border:1px solid rgba(228, 228, 228, 1);border-top:0;border-bottom:0;height:40px;line-height:40px;padding-left:20px;">
            {{item.cate_name}}
          </div>
          <Table size="large" border :columns="proTitle" :data="item.good_list"></Table>
        </div>
      </Card>
    </Col>
    <!--<Col span="24">-->
      <!--订单号:-->
    <!--</Col>-->
  </Row>
</template>

<script>
  import Mixin from '@/common/js/app-mixin'

  export default {
    name: 'financeList',
    mixins: [Mixin],
    data () {
      return {
        // start_sn: '201811100001',
        start_sn: null,
        // end_sn: '201811100025',
        end_sn: null,
        proTitle: [
          {
            align: 'center',
            fixed: 'left',
            title: '品种代码',
            key: 'brand'
          }, {
            align: 'center',
            fixed: 'left',
            title: '商品名称',
            key: 'good_name'
          }, {
            align: 'center',
            fixed: 'left',
            title: '数量',
            key: 'count'
          }, {
            align: 'center',
            fixed: 'left',
            title: '颜色',
            key: 'color'
          }, {
            align: 'center',
            fixed: 'left',
            title: '规格',
            key: 'unit_str'
          }, {
            align: 'center',
            fixed: 'left',
            title: '等级',
            key: 'spec'
          }
        ],
        proData: []
      }
    },
    created () {
    },
    methods: {
      searchHandle () {
        this.getList()
      },
      async getList () {
        let query = {
          start_sn: this.start_sn,
          end_sn: this.end_sn
        }
        let {data} = await this.$http.getProList(query)
        // console.log(data)
        let that = this
        data.forEach(item => {
         if (item.good_list && item.good_list.length > 0) {
           item.good_list.forEach(it => {
             let type = it.unit_type
             let str = ''
             if (type === '3') {
               str = '若干枝'
             } else {
               let s = that.$util.getNameByStatus(type, 'unit_type', that.systemMap)
               str = it.unit + s
             }
             it.unit_str = str
           })
         }
        })
        this.proData = data
      },
      printHandle () {
        this.$router.push({
          name: 'printpurchase',
          params: {start_sn: this.start_sn, end_sn: this.end_sn}
        })
      }
    }
  }
</script>

<style scoped type="text/css" lang="less">

</style>
