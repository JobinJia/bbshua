<template>
  <Row type="flex" align="top" justify="start" style="background: #fff">
    <Col span="24" style="display: flex;flex-direction: row;justify-content: flex-end;align-items: center">
      <Button type="primary" size="default" @click="goBack">返回</Button>
    </Col>
    <Col span="24">
      <div style="padding: 10px 0 0 0; margin-top: 10px;font-size: 18px;">
        <Icon type="ios-bookmark" :size="20"/>
        售后基本信息
      </div>
      <Table style="margin-top: 15px;" size="large" border :columns="afterBaseTitle" :data="afterBaseData"></Table>
    </Col>
    <Col span="24">
      <div style="padding: 10px 0 0 0; margin-top: 10px;font-size: 18px;">
        <Icon type="ios-bookmark" :size="20"/>
        投诉的品种和数量(枝或扎)
      </div>
      <Input style="margin-top: 15px;" type="textarea" v-model="baseData.complain" :rows="4"
             placeholder="请输入内容"></Input>
    </Col>
    <Col span="24">
      <div style="padding: 10px 0 0 0; margin-top: 10px;font-size: 18px;">
        <Icon type="ios-bookmark" :size="20"/>
        投诉的鲜花损伤图片
      </div>
      <div style="margin-top: 15px;">
        <img v-for="(item,index) in baseData.img" :key="index" :src="item" alt=""
             style="width:200px;height:200px;margin-left: 10px;" @click="loadImg(item)">
      </div>
    </Col>
    <Col span="24">
      <div style="padding: 10px 0 0 0; margin-top: 10px;font-size: 18px;">
        <Icon type="ios-bookmark" :size="20"/>
        处理结果
      </div>
      <Input style="margin-top: 15px;" type="textarea" v-model="baseData.replay" :rows="4"
             placeholder="请输入内容"></Input>
    </Col>
    <Col span="24">
      <div style="padding: 10px 0 0 0; margin-top: 10px;font-size: 18px;">
        <Icon type="ios-bookmark" :size="20"/>
        协议处理金额
      </div>
      <Input style="margin-top: 15px;" type="textarea" v-model="baseData.pro_price" :rows="1"
             placeholder="请输入内容"></Input>
    </Col>
    <Col span="24" style="margin-top: 15px;">
      <Button type="primary" size="default" @click="saveItemHandler">保存</Button>
    </Col>
  </Row>
</template>

<script>
  export default {
    name: 'afterOrderDetail',
    data () {
      return {
        id: null,
        type: null,
        baseData: {},
        afterBaseTitle: [
          {
            title: '用户帐昵称',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '订单编号',
            align: 'center',
            tooltip: true,
            key: 'order_sn'
          }, {
            title: '收货人',
            align: 'center',
            tooltip: true,
            key: 'name'
          }, {
            title: '手机号',
            align: 'center',
            tooltip: true,
            key: 'phone'
          }, {
            title: '提交申请时间',
            align: 'center',
            tooltip: true,
            key: 'created_at_str'
          }, {
            title: '收货日期',
            align: 'center',
            tooltip: true,
            key: 'receipt_date'
          }
        ],
        afterBaseData: []
      }
    },
    created () {
      let id = this.$route.params.id
      let type = this.$route.params.type
      this.type = type || null
      this.id = id || null
      this.$nextTick(() => {
        this.initPage()
      })
    },
    methods: {
      initPage () {
        this.getAfterOrderItem()
      },
      async getAfterOrderItem () {
        let query = {
          id: this.id,
          type: this.type
        }
        let {data} = await this.$http.getAfterOrderList(query)
        this.baseData = data
        this.afterBaseData = [{
          'name': data.address.name,
          'order_sn': data.order_sn,
          'phone': data.address.phone,
          'nick_name': data.nick_name,
          'receipt_date': data.receipt_date,
          'created_at_str': this.$util.getDateByTimestamp(data.created_at)
        }]
      },
      loadImg (url) {
        var newwin = window.open()
        newwin.document.write('<div style=\'width:100%;height:100%;background:black;opacity:.8;position:relative;\'></div><div style=\'width:100%;z-index:100;position:absolute;text-align:center;top:calc(50% - 300px)\'><img src=' + url + ' style=\'height:600px;\'/></div>')
      },
      goBack () {
        this.$router.go(-1)
      },
      async saveItemHandler () {
        let query = {
          id: this.id,
          replay: this.baseData.replay,
          pro_price: this.baseData.pro_price
        }
        let {code} = await this.$http.afterOrderPost(query)
        if (code === 0) {
          this.$Message.success({
            content: '操作成功！'
          })
          this.$router.go(-1)
        }
      }
    }
  }
</script>

<style scoped>

</style>
