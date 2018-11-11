<template>
  <Row type="flex" align="top" justify="start">
    <Col span="24" style="text-align: right;margin-top: 10px;">
      <Button type="primary" size="large">添加</Button>
    </Col>
    <Col span="24">
      <div style="padding: 10px 0; margin-top: 10px;font-size: 18px;">
        <Icon type="ios-bookmark" :size="20"/>
        售后列表
      </div>
      <Table size="large" border :columns="sendBackTitle" :data="sendBackData"></Table>
      <div style="text-align: right;margin-top: 10px;">
        <Button type="primary" size="large">合计</Button>
        <Input placeholder="" style="width: 200px;"></Input>
        <Button type="primary" size="large">统计</Button>
      </div>
    </Col>
    <Col span="24">
      <div style="padding: 10px 0; margin-top: 10px;font-size: 18px;">
        <Icon type="ios-bookmark" :size="20"/>
        汇总信息
      </div>
      <Table size="large" border :columns="allTitle" :data="allData"></Table>
      <div style="text-align: right;margin-top: 10px;">
        <Button type="primary" size="large">导出Excel</Button>
      </div>
    </Col>
  </Row>
</template>

<script>
  import Mixin from '@/common/js/app-mixin'

  export default {
    name: 'yesterday',
    mixins: [Mixin],
    data () {
      return {
        sendBackTitle: [
          {
            title: '序号',
            align: 'center',
            tooltip: true,
            key: 'id'
          }, {
            title: '订单编号',
            align: 'center',
            tooltip: true,
            key: 'id'
          }, {
            title: '用户昵称',
            align: 'center',
            tooltip: true,
            key: 'id'
          }, {
            title: '问题反馈',
            align: 'center',
            tooltip: true,
            key: 'id'
          }, {
            title: '售后处理',
            align: 'center',
            tooltip: true,
            key: 'id'
          }, {
            title: '赔付金额',
            align: 'center',
            tooltip: true,
            key: 'id'
          }
        ],
        sendBackData: [],
        allTitle: [
          {
            title: '已结算订单总金额',
            align: 'center',
            tooltip: true,
            key: 'id'
          }, {
            title: '总售后金额',
            align: 'center',
            tooltip: true,
            key: 'id'
          }, {
            title: '当日结算货款',
            align: 'center',
            tooltip: true,
            key: 'id'
          }
        ],
        allData: []
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
