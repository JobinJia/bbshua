<template>
  <div style="overflow: auto;">
    <div style="width:900px;margin:0 auto;" id="subOutputRank-printTwo" v-if="list !== {}">
      <div
        style="height:50px;line-height:50px; font-size:20px;text-align:center;font-weight:600;border:1px solid #ddd;margin-top:10px;border-bottom:0px;">
        理货单
      </div>
      <div style="border:1px solid #ddd;border-bottom:0px;padding:5px;">
        <div style="height:24px;line-height:24px;font-size:14px;">
          <span style="font-weight:600;margin-right:10px;">【订单编号】</span><span>{{list.order_sn}}</span>
          <span style="font-weight:600;margin-right:80px;">【打包费】:</span>
          <span style="font-weight:600;margin-right:80px;">【运费】:</span>
          <span style="font-weight:600;margin-right:80px;">【班次】:</span>
          <span style="font-weight:600;margin-right:80px;">【重量】:</span>
        </div>
        <!-- <div style="height:24px;line-height:24px;font-size:14px;"><span style="font-weight:600;margin-right:10px;">【运单号】:</span></div> -->
        <div style="line-height:24px;font-size:14px;">
          <span style="font-weight:600;margin-right:10px;">【订单收货信息】</span>
          <span>收货人:{{list.order_address.name}}&nbsp;&nbsp;&nbsp;&nbsp;收货人电话:{{list.order_address.phone}}&nbsp;&nbsp;&nbsp;&nbsp;收货地址:{{list.order_address.address}}</span>
          <div style="font-weight:600;">【物流方式】:{{list.send_type}}</div>
        </div>
      </div>
      <div style="border:1px solid #ddd;border-bottom:0px;padding:5px;">
        <!-- <div style="height:24px;line-height:24px;font-size:14px;"><span style="font-weight:600;margin-right:10px;">【附加信息】</span><span>是否选择次日发货:是&nbsp;&nbsp;&nbsp;&nbsp;信任之选:用其他花材代替&nbsp;&nbsp;&nbsp;&nbsp;神秘之选:未加购</span></div> -->
        <div style="height:24px;line-height:24px;font-size:14px;">
          <span style="font-weight:600;margin-right:10px;">【附加信息】</span><span>暂无数据</span>
        </div>
      </div>
      <div
        style="height:36px;line-height:36px;font-size:14px;font-weight:600;border:1px solid #ddd;border-bottom:0px;padding:0 5px;">
        【商品清单】
      </div>
      <table class="table table-bordered" style="margin-bottom:0px;">
        <tbody style="height:24px;line-height:24px;">
        <tr style="height:24px; line-height:24px;">
          <th style="height:24px; line-height:24px;width:10%;font-size:14px;font-weight:600;">品种代码</th>
          <th style="height:24px; line-height:24px;width:28%;font-size:14px;font-weight:600;">商品名称</th>
          <th style="height:24px; line-height:24px;width:8%;font-size:14px;font-weight:600;">等级</th>
          <th style="height:24px; line-height:24px;width:11%;font-size:14px;font-weight:600;">规格</th>
          <th style="height:24px; line-height:24px;width:10%;font-size:14px;font-weight:600;">数量(扎)</th>
          <th style="height:24px; line-height:24px;width:13%;font-size:14px;font-weight:600;">昆明参考价</th>
          <th style="height:24px; line-height:24px;width:13%;font-size:14px;font-weight:600;">昆明结算价</th>
          <th style="height:24px; line-height:24px;width:10%;font-size:14px;font-weight:600;">发货数量</th>
          <th style="height:24px; line-height:24px;width:10%;font-size:14px;font-weight:600;">结算单价</th>
        </tr>
        </tbody>
      </table>
      <div v-if="list.spec_good.length > 0"
           style="height:36px;line-height:36px;padding:0 15px;font-weight:700;border-left:1px solid #ddd;border-right:1px solid #ddd; font-size:14px;">
        特价商品
      </div>
      <table class="table table-bordered" style="border-top:0px;margin-bottom:0px;">
        <tbody style="width:100%;">
        <tr style="height:30px;" v-for="item in list.spec_good" :key="item.id">
          <td style="width:10%;font-size:14px;font-weight:400;">{{item.brand}}</td>
          <td style="width:28%;font-size:14px;font-weight:400;">{{item.good_name}}</td>
          <td style="width:8%;font-size:14px;font-weight:400;">{{item.spec}}</td>
          <th style="width:11%;font-size:14px;font-weight:400;">{{item.unit}}</th>
          <th style="width:10%;font-size:14px;font-weight:400;">{{item.count}}</th>
          <th style="width:13%;font-size:14px;font-weight:400;">{{item.km_good_price}}</th>
          <th style="width:13%;font-size:14px;font-weight:400;">{{item.true_km_price}}</th>
          <th style="width:10%;"></th>
          <th style="width:10%;"></th>
        </tr>
        </tbody>
      </table>
      <div v-if="list.hot_good.length > 0"
           style="height:36px;line-height:36px;padding:0 15px;font-weight:700;border-left:1px solid #ddd;border-right:1px solid #ddd; font-size:14px;">
        热销商品
      </div>
      <table class="table table-bordered" style="border-top:0px; margin-bottom:0px;">
        <tbody style="width:100%;">
        <tr style="height:30px;" v-for="item in list.hot_good" :key="item.id">
          <td style="width:10%;font-size:14px;font-weight:400;">{{item.brand}}</td>
          <td style="width:28%;font-size:14px;font-weight:400;">{{item.good_name}}</td>
          <td style="width:8%;font-size:14px;font-weight:400;">{{item.spec}}</td>
          <th style="width:11%;font-size:14px;font-weight:400;">{{item.unit}}</th>
          <th style="width:10%;font-size:14px;font-weight:400;">{{item.count}}</th>
          <th style="width:13%;font-size:14px;font-weight:400;">{{item.km_good_price}}</th>
          <th style="width:13%;font-size:14px;font-weight:400;">{{item.true_km_price}}</th>
          <th style="width:10%;"></th>
          <th style="width:10%;"></th>
        </tr>
        </tbody>
      </table>
      <div v-if="list.free_good.length > 0"
           style="height:36px;line-height:36px;padding:0 15px;font-weight:700;border-left:1px solid #ddd;border-right:1px solid #ddd; font-size:14px;">
        团购包邮
      </div>
      <table class="table table-bordered" style="border-top:0px; margin-bottom:0px;">
        <tbody style="width:100%;">
        <tr style="height:30px;" v-for="item in list.free_good" :key="item.id">
          <td style="width:10%;font-size:14px;font-weight:400;">{{item.brand}}</td>
          <td style="width:28%;font-size:14px;font-weight:400;">{{item.good_name}}</td>
          <td style="width:8%;font-size:14px;font-weight:400;">{{item.spec}}</td>
          <th style="width:11%;font-size:14px;font-weight:400;">{{item.unit}}</th>
          <th style="width:10%;font-size:14px;font-weight:400;">{{item.count}}</th>
          <th style="width:13%;font-size:14px;font-weight:400;">{{item.km_good_price}}</th>
          <th style="width:13%;font-size:14px;font-weight:400;">{{item.true_km_price}}</th>
          <th style="width:10%;"></th>
          <th style="width:10%;"></th>
        </tr>
        </tbody>
      </table>
      <div v-if="list.rec_good.length > 0"
           style="height:36px;line-height:36px;padding:0 15px;font-weight:700;border-left:1px solid #ddd;border-right:1px solid #ddd; font-size:14px;">
        花店直选
      </div>
      <table class="table table-bordered" style="border-top:0px; margin-bottom:0px;">
        <tbody style="width:100%;">
        <tr style="height:30px;" v-for="item in list.rec_good" :key="item.id">
          <td style="width:10%;font-size:14px;font-weight:400;">{{item.brand}}</td>
          <td style="width:28%;font-size:14px;font-weight:400;">{{item.good_name}}</td>
          <td style="width:8%;font-size:14px;font-weight:400;">{{item.spec}}</td>
          <th style="width:11%;font-size:14px;font-weight:400;">{{item.unit}}</th>
          <th style="width:10%;font-size:14px;font-weight:400;">{{item.count}}</th>
          <th style="width:13%;font-size:14px;font-weight:400;">{{item.km_good_price}}</th>
          <th style="width:13%;font-size:14px;font-weight:400;">{{item.true_km_price}}</th>
          <th style="width:10%;"></th>
          <th style="width:10%;"></th>
        </tr>
        </tbody>
      </table>
      <div v-if="list.new_good.length > 0"
           style="height:36px;line-height:36px;padding:0 15px;font-weight:700;border-left:1px solid #ddd;border-right:1px solid #ddd; font-size:14px;">
        新品推荐
      </div>
      <table class="table table-bordered" style="border-top:0px; margin-bottom:0px;">
        <tbody style="width:100%;">
        <tr style="height:30px;" v-for="item in list.new_good" :key="item.id">
          <td style="width:10%;font-size:14px;font-weight:400;">{{item.brand}}</td>
          <td style="width:28%;font-size:14px;font-weight:400;">{{item.good_name}}</td>
          <td style="width:8%;font-size:14px;font-weight:400;">{{item.spec}}</td>
          <th style="width:11%;font-size:14px;font-weight:400;">{{item.unit}}</th>
          <th style="width:10%;font-size:14px;font-weight:400;">{{item.count}}</th>
          <th style="width:13%;font-size:14px;font-weight:400;">{{item.km_good_price}}</th>
          <th style="width:13%;font-size:14px;font-weight:400;">{{item.true_km_price}}</th>
          <th style="width:10%;"></th>
          <th style="width:10%;"></th>
        </tr>
        </tbody>
      </table>
      <div style="border:1px solid #ddd; font-size:14px;min-height:100px;border-top:0px;" v-if="list.order_tip!=0">
        <div style="font-size:14px;font-weight:600;padding:10px 5px;">【备注】</div>
        <div v-for="(item,index) in list.order_tip" :key="item.id" style="padding:0 20px; font-size:12px;margin:5px 0;">
          {{index+1}}.&nbsp;&nbsp;{{item.tip}}
        </div>
      </div>
      <div style="border:1px solid #ddd; font-size:14px;height:40px;line-height:40px;border-top:0px; text-align:right;">
        <div
          style="font-size:14px;font-weight:600;height:40px;line-height:40px;display:inline-block;margin-right:150px;">
          分拣人:
        </div>
        <div
          style="font-size:14px;font-weight:600;height:40px;line-height:40px;display:inline-block;margin-right:150px;">
          审核人:
        </div>
      </div>
    </div>
    <div style="text-align:center;margin-top:30px;">
      <i-button @click="printlogo" type="primary" style="color:#fff">确认打印</i-button>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import Base from '@/common/Base'

  export default {
    mixins: [Base],
    data () {
      return {
        curTime: '',
        id: null,
        list: {},
        list1: [{nick_name: '', order_sn: '', created_at: '', pay_at: '', send_at: ''}],
      }
    },
    methods: {
      printlogo () {
        let subOutputRankPrint = document.getElementById('subOutputRank-printTwo')
        console.log(subOutputRankPrint.innerHTML)
        let newContent = subOutputRankPrint.innerHTML
        let oldContent = document.body.innerHTML
        document.body.innerHTML = newContent
        window.print()
        window.location.reload()
        document.body.innerHTML = oldContent
        return false
      },
      async getList () {// 获取详情数据
        let res = await this.$http.getOrderList({id: this.id})
        switch (parseInt(res.data.send_type)) {
          case 1:
            res.data.send_type = '航空物流'
            break
          case 4:
            res.data.send_type = '快递运输'
            break
          case 5:
            res.data.send_type = '汽运冷链'
            break
          case 6:
            res.data.send_type = '铁路运输'
            break
          case 8:
            res.data.send_type = '顺丰冷链'
            break
        }
        let data = res.data
        // 按页面顺序取值 type  21435 = 特热团新直
        let speObj = data.order_detail.find(item => item.type === '2') || null
        let hotObj = data.order_detail.find(item => item.type === '1') || null
        let tamObj = data.order_detail.find(item => item.type === '4') || null
        let newObj = data.order_detail.find(item => item.type === '3') || null
        let recObj = data.order_detail.find(item => item.type === '5') || null
        let sepList = (speObj && speObj.good_list) ? speObj.good_list : []
        let hotList = (hotObj && hotObj.good_list) ? hotObj.good_list : []
        let tamList = (tamObj && tamObj.good_list) ? tamObj.good_list : []
        let newList = (newObj && newObj.good_list) ? newObj.good_list : []
        let recList = (recObj && recObj.good_list) ? recObj.good_list : []
        data.hot_good = hotList
        data.spec_good = sepList
        data.rec_good = recList
        data.new_good = newList
        data.free_good = tamList
        this.list = data
        this.$nextTick(() => {
          this.list.hot_good = this.list.hot_good.filter(function (item, index) {
            return !(item.cate_id == 16 && item.true_good_price == 0)
          })
          for (let k = 0; k < this.list.hot_good.length; k++) {
            this.list.hot_good[k].km_good_price = this.list.hot_good[k].km_good_price
            this.list.hot_good[k].true_km_price = this.list.hot_good[k].true_km_price
            if (this.list.hot_good[k].unit_type == 1) {
              this.list.hot_good[k].unit = `${this.list.hot_good[k].unit}kg/扎`//列表页修改规格后缀
            } else {
              this.list.hot_good[k].unit = `${this.list.hot_good[k].unit}枝/扎`//列表页修改规格后缀
            }
          }
          for (let k = 0; k < this.list.spec_good.length; k++) {
            this.list.spec_good[k].km_good_price = this.list.spec_good[k].km_good_price
            this.list.spec_good[k].true_km_price = this.list.spec_good[k].true_km_price
            if (this.list.spec_good[k].unit_type == 1) {
              this.list.spec_good[k].unit = `${this.list.spec_good[k].unit}kg/扎`//列表页修改规格后缀
            } else {
              this.list.spec_good[k].unit = `${this.list.spec_good[k].unit}枝/扎`//列表页修改规格后缀
            }
          }
          for (let k = 0; k < this.list.rec_good.length; k++) {
            this.list.rec_good[k].km_good_price = this.list.rec_good[k].km_good_price
            this.list.rec_good[k].true_km_price = this.list.rec_good[k].true_km_price
            if (this.list.rec_good[k].unit_type == 1) {
              this.list.rec_good[k].unit = `${this.list.rec_good[k].unit}kg/扎`//列表页修改规格后缀
            } else {
              this.list.rec_good[k].unit = `${this.list.rec_good[k].unit}枝/扎`//列表页修改规格后缀
            }
          }
          for (let k = 0; k < this.list.new_good.length; k++) {
            this.list.new_good[k].km_good_price = this.list.new_good[k].km_good_price
            this.list.new_good[k].true_km_price = this.list.new_good[k].true_km_price
            if (this.list.new_good[k].unit_type == 1) {
              this.list.new_good[k].unit = `${this.list.new_good[k].unit}kg/扎`//列表页修改规格后缀
            } else {
              this.list.new_good[k].unit = `${this.list.new_good[k].unit}枝/扎`//列表页修改规格后缀
            }
          }
          for (let k = 0; k < this.list.free_good.length; k++) {
            this.list.free_good[k].km_good_price = this.list.free_good[k].km_good_price
            this.list.free_good[k].true_km_price = this.list.free_good[k].km_km_price
            if (this.list.free_good[k].unit_type == 1) {
              this.list.free_good[k].unit = `${this.list.free_good[k].unit}kg/扎`//列表页修改规格后缀
            } else {
              this.list.free_good[k].unit = `${this.list.free_good[k].unit}枝/扎`//列表页修改规格后缀
            }
          }
        })
      },
    },
    created () {
      let id = this.$route.params.id
      this.id = id
      this.$nextTick(() => {
        this.getList()
        let timestamp = Date.parse(new Date())
        this.curTime = this.parseTime(timestamp)
        document.getElementById('app').parentNode.className = 'important'
      })
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/common/css/common.scss";
  @import "./bootstrap.min.css";
  @import "./bootstrap-table.css";
  /*@import "./bootstrap-table.min.css";*/

  #subOutputRank-print {
    font-family: "微软雅黑-light"
  }

  th, td {
    text-align: center;
  }
</style>
