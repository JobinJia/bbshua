<template>
  <div>
    <div style="width:500px;height:700px;margin:0 auto; background:#eee;padding:0 15px 10px 20px; position:relative;"
         id="subOutputRank-print1">
      <div style="text-align:right;">
        <img src="~@/assets/app/h.png" style="width:120px;height:120px;" v-if="list.send_type=='航空物流'"/>
        <img src="~@/assets/app/kd.png" style="width:120px;height:120px;" v-if="list.send_type=='快递运输'"/>
        <img src="~@/assets/app/qy.png" style="width:120px;height:120px;" v-if="list.send_type=='汽运冷链'"/>
        <img src="~@/assets/app/t.png" style="width:120px;height:120px;" v-if="list.send_type=='铁路运输'"/>
      </div>
      <div class="tops">
        <img src="~@/assets/app/printlogo.png"/>
        <div class="right" style="font-size:20px;margin-left:20px;">电子面单</div>
      </div>
      <div class="centers">
        <div class="list">
          <div class="leftNme">【订单编号】</div>
          <div class="rightMsg">{{list.order_sn}}</div>
        </div>
        <div class="list">
          <div class="leftNme">【打印时间】</div>
          <div class="rightMsg">{{curTime}}</div>
        </div>
        <div class="list">
          <div class="leftNme">【物流方式】</div>
          <div class="rightMsg">{{list.send_type}}</div>
        </div>
        <div class="listCon">
          <div style="font-weight:600;font-size:16px;height:40px;line-height:40px;">【订单收货信息】</div>
          <div class="list">
            <div class="leftNme">收货人:</div>
            <div class="rightMsg">{{list.order_address.name}}</div>
          </div>
          <div class="list">
            <div class="leftNme">收货地址:</div>
            <div class="rightMsg">{{list.order_address.address}}</div>
          </div>
        </div>
      </div>
      <div class="bots">
        <img src="~@/assets/app/code1.png"/>
      </div>
    </div>
    <div style="text-align:center;margin-top:30px;">
      <i-button @click="printlogo" type="primary" style="color:#fff">确认打印</i-button>
    </div>
  </div>
</template>

<script>
  // import {orderDetail} from '../../api/orders/Order.js'
  /* eslint-disable */
  import Base from '@/common/Base'

  export default {
    mixins: [Base],
    data () {
      return {
        curTime: '',
        id: null,
        list: {
          order_address: {
            name: '',
            address: ''
          }
        }
      }
    },
    created () {
      let id = this.$route.params.id
      this.id = id
      this.$nextTick(() => {
        this.getList()
        let timestamp = Date.parse(new Date())
        this.curTime = this.parseTime(timestamp)
      })
    },
    methods: {
      printlogo () {
        let subOutputRankPrint = document.getElementById('subOutputRank-print1')
        console.log(subOutputRankPrint.innerHTML)
        let newContent = subOutputRankPrint.innerHTML
        let oldContent = document.body.innerHTML
        document.body.innerHTML = newContent
        window.print()
        window.location.reload()
        document.body.innerHTML = oldContent
        return false
      },
      getList () {
        // 获取详情数据
        this.$http.getOrderList({
          id: this.id
        }).then(res => {
          this.list = res.data
          if (this.list.send_type == 1 || this.list.send_type == 2 || this.list.send_type == 3) {
            this.list.send_type = '航空物流'
          } else if (this.list.send_type == 4) {
            this.list.send_type = '快递运输'
          } else if (this.list.send_type == 5) {
            this.list.send_type = '汽运冷链'
          } else if (this.list.send_type == 6) {
            this.list.send_type = '铁路运输'
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/common/css/common.scss";
  @import "./bootstrap.min.css";
  @import "./bootstrap-table.css";
  /*@import "./bootstrap-table.min.css";*/

  th, td {
    text-align: center;
  }

  .tops {
    height: 90px;
    @include flex;
    @include flexMiddle;
    // @include flexCenter;
    > img {
      width: 144px;
      height: 42.3px;
    }
  }

  .centers {
    > .list {
      height: 40px;
      @include flex;
      @include flexMiddle;
      .leftNme {
        font-size: 16px;
        font-weight: 600;
      }
      .rightMsg {
        font-size: 14px;
        margin-left: 10px;
      }
    }
    > .listCon {
      .list {
        height: 40px;
        @include flex;
        @include flexMiddle;
        font-size: 16px;
        padding-left: 10px;
        > .rightMsg {
          margin-left: 10px;
        }
      }
    }
  }

  .bots {
    border-top: 1px solid #000;
    padding-top: 20px;
    position: absolute;
    bottom: 20px;
    > img {
      width: 458.5px;
      height: 70px;
    }
  }
</style>
