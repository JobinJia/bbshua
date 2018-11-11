<template>
  <Row type="flex" align="top" justify="start" style="background: #fff">
    <Col span="24" style="border: 1px solid #dddde2;padding: 8px 10px;">
      <Input size="default" style="width: 300px;" placeholder="请输入开始订单号"></Input>
      -
      <Input size="default" style="width: 300px;" placeholder="请输入结束订单号"></Input>
      <Button type="primary" size="default">确定</Button>
    </Col>
    <Col span="24">
      结算统计表
    </Col>
    <Col span="24" style="text-align: right;margin-top: 10px;">
      <Button type="primary" size="default">导出Excel</Button>
      <Button type="primary" size="default">审核发布</Button>
    </Col>
  </Row>
</template>

<script>
  import Mixin from '@/common/js/app-mixin'
  export default {
    name: 'settleList',
    mixins: [Mixin],
    data () {
      return {}
    },
    created () {
      this.initPage()
    },
    methods: {
      initPage () {}
    }
  }
</script>

<style scoped type="text/css" lang="less">

</style>
