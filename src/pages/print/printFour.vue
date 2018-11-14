<template>
  <div>
    <div style="width:900px;margin:0 auto;" id="subOutputRank-printTwo">
      <div
        style="height:50px;line-height:50px; font-size:20px;text-align:center;font-weight:600;border:1px solid #ddd;margin-top:10px;border-bottom:0px;">
        订单详情
      </div>
      <div style="border:1px solid #ddd;border-bottom:0px;padding:5px;">
        <div style="height:24px;line-height:24px;font-size:14px;"><span
          style="font-weight:600;">【订单编号】</span><span>{{list.order_sn}}</span></div>
        <div style="height:24px;line-height:24px;font-size:14px;"><span
          style="font-weight:600;">【打印时间】</span><span>{{curTime}}</span></div>
      </div>
      <!-- <div style="border:1px solid #ddd;border-bottom:0px;padding:5px;">
        <div style="height:24px;line-height:24px;font-size:14px;"><span style="font-weight:600;margin-right:10px;">【附加信息】</span><span>是否选择次日发货:是&nbsp;&nbsp;&nbsp;&nbsp;信任之选:用其他花材代替&nbsp;&nbsp;&nbsp;&nbsp;神秘之选:未加购</span></div>
        </div> -->
      <div style="border:1px solid #ddd;border-bottom:0px;padding:5px;">
        <div style="height:24px;line-height:24px;font-size:14px;"><span
          style="font-weight:600;margin-right:10px;">【附加信息】</span><span>暂无数据</span></div>
      </div>
      <div style="border:1px solid #ddd;padding:5px;border-bottom:0;">
        <div style="height:24px;line-height:24px;font-size:14px;font-weight:600;">【订单收货信息】</div>
        <div class="height:24px;line-height:24px;">
          <div style="display:inline-block;font-size:14px;height:24px;line-height:24px;width:170px;padding-left:6px;">
            收货人:<span>{{list.order_address.name}}</span></div>
          <div style="display:inline-block;font-size:14px;height:24px;line-height:24px;">
            用户昵称:<span>{{list.nick_name}}</span>
          </div>
        </div>
        <div class="height:24px;line-height:24px;">
          <div style="display:inline-block;font-size:14px;height:24px;line-height:24px;width:170px;padding-left:6px;">
            手机号码:<span>{{list.order_address.phone}}</span></div>
          <div style="display:inline-block;font-size:14px;height:24px;line-height:24px;">
            下单时间:<span>{{list.created_at}}</span>
          </div>
        </div>
        <div class="height:24px;line-height:24px;">
          <div style="display:inline-block;font-size:14px;height:24px;line-height:24px;padding-left:6px;">
            收货地址:<span>{{list.order_address.address}}</span></div>
        </div>
      </div>
      <div
        style="height:36px;line-height:36px;padding:0 5px;font-weight:600;border:1px solid #ddd;border-bottom:0; font-size:14px;">
        【物流信息】
      </div>
      <div style="width:100%;" class="wuliu">
        <div class="left" style="width:70%;">
          <table class="table table-bordered" style="margin-bottom:0px;">
            <tbody style="height:24px;line-height:24px;">
            <tr style="height:24px; line-height:24px;">
              <th style="height:24px; line-height:24px;width:25%;font-size:14px;font-weight:400;">打包预付费
              </th>
              <th style="height:24px; line-height:24px;width:25%;font-size:14px;font-weight:400;">
                {{list.pack_price}}
              </th>
              <th style="height:24px; line-height:24px;width:25%;font-size:14px;font-weight:400;">打包费实付
              </th>
              <th style="height:24px; line-height:24px;width:25%;font-size:14px;font-weight:400;">
                {{list.true_pack_price}}
              </th>
            </tr>
            <tr style="height:24px; line-height:24px;">
              <th style="height:24px; line-height:24px;width:25%;font-size:14px;font-weight:400;">保温费预付
              </th>
              <th style="height:24px; line-height:24px;width:25%;font-size:14px;font-weight:400;">
                {{list.warm_price}}
              </th>
              <th style="height:24px; line-height:24px;width:25%;font-size:14px;font-weight:400;">保温费实付
              </th>
              <th style="height:24px; line-height:24px;width:25%;font-size:14px;font-weight:400;">
                {{list.true_warm_price}}
              </th>
            </tr>
            <tr style="height:24px; line-height:24px;">
              <th style="height:24px; line-height:24px;width:25%;font-size:14px;font-weight:400;">运费预付
              </th>
              <th style="height:24px; line-height:24px;width:25%;font-size:14px;font-weight:400;">
                {{list.fre_price}}
              </th>
              <th style="height:24px; line-height:24px;width:25%;font-size:14px;font-weight:400;">运费实付
              </th>
              <th style="height:24px; line-height:24px;width:25%;font-size:14px;font-weight:400;">
                {{list.true_fre_price}}
              </th>
            </tr>
            <tr style="height:24px; line-height:24px;">
              <th style="height:24px; line-height:24px;width:25%;font-size:14px;font-weight:400;">物流预付
              </th>
              <th style="height:24px; line-height:24px;width:25%;font-size:14px;font-weight:400;">
                {{list.log_y_price}}
              </th>
              <th style="height:24px; line-height:24px;width:25%;font-size:14px;font-weight:400;">物流实付
              </th>
              <th style="height:24px; line-height:24px;width:25%;font-size:14px;font-weight:400;">
                {{list.true_log_y_price}}
              </th>
            </tr>
            </tbody>
          </table>
          <div
            style="height:40px;line-height:40px;border-right:1px solid #ddd;border-left:1px solid #ddd;text-align:right;padding-right:30px;font-size:14px;">
            物流差价:{{list.diffAll_price}}
          </div>
        </div>
        <div class="right" style="width:30%;border:1px solid #ddd;border-left:0;border-bottom:0;">
          <div style="height:41px;line-height:41px;padding-left:10px;font-size:14px;">
            物流方式:{{list.send_type}}
          </div>
          <div style="height:41px;line-height:41px;padding-left:10px;font-size:14px;">
            物流代理公司:{{list.order_freight.log_agent}}
          </div>
          <div style="height:41px;line-height:41px;padding-left:10px;font-size:14px;">
            物流代理联系电话:{{list.order_freight.log_agent_phone}}
          </div>
          <div style="height:41px;line-height:41px;padding-left:10px;font-size:14px;">
            物流编号:{{list.order_freight.log_code}}
          </div>
          <div style="height:41px;line-height:41px;padding-left:10px;font-size:14px;">
            物流公司:{{list.order_freight.log_company}}
          </div>
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
          <th style="height:24px; line-height:24px;width:20%;font-size:14px;font-weight:600;">商品名称</th>
          <th style="height:24px; line-height:24px;width:10%;font-size:14px;font-weight:600;">等级</th>
          <th style="height:24px; line-height:24px;width:13%;font-size:14px;font-weight:600;">规格</th>
          <th style="height:24px; line-height:24px;width:13%;font-size:14px;font-weight:600;">预付数量(扎)</th>
          <th style="height:24px; line-height:24px;width:13%;font-size:14px;font-weight:600;">结算数量(扎)</th>
          <th style="height:24px; line-height:24px;width:10%;font-size:14px;font-weight:600;">预付单价</th>
          <th style="height:24px; line-height:24px;width:13%;font-size:14px;font-weight:600;">结算单价</th>
        </tr>
        </tbody>
      </table>
      <div
        style="height:36px;line-height:36px;padding:0 15px;font-weight:700;border-left:1px solid #ddd;border-right:1px solid #ddd; font-size:14px;"
        v-if="list.spec_good.length > 0">特价商品
      </div>
      <table class="table table-bordered" style="border-top:0px;margin-bottom:0px;">
        <tbody style="width:100%;">
        <tr style="height:30px;" v-for="item in list.spec_good" :key="item.id">
          <td style="width:10%;font-size:14px;font-weight:400;">{{item.brand}}</td>
          <td style="width:20%;font-size:14px;font-weight:400;">{{item.good_name}}</td>
          <td style="width:10%;font-size:14px;font-weight:400;">{{item.spec}}</td>
          <th style="width:13%;font-size:14px;font-weight:400;">{{item.unit}}</th>
          <th style="width:13%;font-size:14px;font-weight:400;">{{item.count}}</th>
          <th style="width:13%;font-size:14px;font-weight:400;">{{item.true_count}}</th>
          <th style="width:10%;font-size:14px;font-weight:400;">{{item.good_price}}</th>
          <th style="width:13%;font-size:14px;font-weight:400;">{{item.true_good_price}}</th>
        </tr>
        </tbody>
      </table>
      <div
        style="height:36px;line-height:36px;padding:0 15px;font-weight:700;border-left:1px solid #ddd;border-right:1px solid #ddd; font-size:14px;"
        v-if="list.hot_good.length > 0">热销商品
      </div>
      <table class="table table-bordered" style="border-top:0px; margin-bottom:0px;">
        <tbody style="width:100%;">
        <tr style="height:30px;" v-for="item in list.hot_good" :key="item.id">
          <td style="width:10%;font-size:14px;font-weight:400;">{{item.brand}}</td>
          <td style="width:20%;font-size:14px;font-weight:400;">{{item.good_name}}</td>
          <td style="width:10%;font-size:14px;font-weight:400;">{{item.spec}}</td>
          <th style="width:13%;font-size:14px;font-weight:400;">{{item.unit}}</th>
          <th style="width:13%;font-size:14px;font-weight:400;">{{item.count}}</th>
          <th style="width:13%;font-size:14px;font-weight:400;">{{item.true_count}}</th>
          <th style="width:10%;font-size:14px;font-weight:400;">{{item.good_price}}</th>
          <th style="width:13%;font-size:14px;font-weight:400;">{{item.true_good_price}}</th>
        </tr>
        </tbody>
      </table>
      <div
        style="height:40px;line-height:40px;border:1px solid #ddd;border-top:0;text-align:right;padding-right:30px;font-size:14px;">
        商品差价:{{sum}}
      </div>
      <div
        style="height:36px;line-height:36px;padding:0 5px;font-weight:700;border-left:1px solid #ddd;border-right:1px solid #ddd; font-size:14px;">
        【汇总信息】
      </div>
      <table class="table table-bordered" style="border-top:0px; margin-bottom:0px;">
        <tbody style="width:100%;">
        <tr style="height:30px;">
          <td style="width:18%;font-size:14px;font-weight:400;">商品预付</td>
          <td style="width:16%;font-size:14px;font-weight:400;">{{list.good_price}}</td>
          <td style="width:17%;font-size:14px;font-weight:400;">商品结算价</td>
          <th style="width:16%;font-size:14px;font-weight:400;">{{list.good_price+sum}}</th>
          <th style="width:17%;font-size:14px;font-weight:400;">商品差价</th>
          <th style="width:16%;font-size:14px;font-weight:400;">{{sum}}</th>
        </tr>
        <tr style="height:30px;">
          <td style="width:18%;font-size:14px;font-weight:400;">物流预付</td>
          <td style="width:16%;font-size:14px;font-weight:400;">{{list.log_y_price}}</td>
          <td style="width:17%;font-size:14px;font-weight:400;">物流结算价</td>
          <th style="width:16%;font-size:14px;font-weight:400;">{{list.true_log_y_price}}</th>
          <th style="width:17%;font-size:14px;font-weight:400;">物流差价</th>
          <th style="width:16%;font-size:14px;font-weight:400;">{{list.diffAll_price}}</th>
        </tr>
        </tbody>
      </table>
      <div style="border:1px solid #ddd; font-size:14px;min-height:100px;border-top:0px;"
           v-if="list.order_tip!=0">
        <div style="font-size:14px;font-weight:600;padding:10px 5px;">【备注】</div>
        <div v-for="(item,index) in list.order_tip" :key="item.id"
             style="padding:0 20px; font-size:12px;margin:5px 0;">
          {{index+1}}.&nbsp;&nbsp;{{item.tip}}
        </div>
      </div>
      <!-- <div style="border:1px solid #ddd; font-size:14px;height:40px;line-height:40px;border-top:0px; text-align:right;">
        <div style="font-size:14px;font-weight:600;height:40px;line-height:40px;display:inline-block;margin-right:150px;">分拣人:</div>
        <div style="font-size:14px;font-weight:600;height:40px;line-height:40px;display:inline-block;margin-right:150px;">审核人:</div>
        </div> -->
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
        id: null,
        sum: '',
        curTime: '',
        list: {
          order_address: {address: '', name: '', phone: '',},
          order_freight: {log_agent: '', log_agent_phone: '', log_code: '', log_company: ''}
        },
        // list1:[{nick_name:'',order_sn:'',created_at:'',pay_at:'',send_at:''}],
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
        if (res.data.send_type == 1) {
          res.data.send_type = '航空物流'
        }
        if (res.data.send_type == 2) {
          res.data.send_type = '航空物流'
        }
        if (res.data.send_type == 3) {
          res.data.send_type = '航空物流'
        }
        if (res.data.send_type == 4) {
          res.data.send_type = '快递运输'
        }
        if (res.data.send_type == 5) {
          res.data.send_type = '汽运冷链'
        }
        if (res.data.send_type == 6) {
          res.data.send_type = '铁路运输'
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
          for (let k = 0; k < this.list.hot_good.length; k++) {
            if (this.list.hot_good[k].unit_type == 1) {
              this.list.hot_good[k].unit = `${this.list.hot_good[k].unit}kg/扎`//列表页修改规格后缀
            } else {
              this.list.hot_good[k].unit = `${this.list.hot_good[k].unit}枝/扎`//列表页修改规格后缀
            }
          }
          for (let k = 0; k < this.list.spec_good.length; k++) {
            if (this.list.spec_good[k].unit_type == 1) {
              this.list.spec_good[k].unit = `${this.list.spec_good[k].unit}kg/扎`//列表页修改规格后缀
            } else {
              this.list.spec_good[k].unit = `${this.list.spec_good[k].unit}枝/扎`//列表页修改规格后缀
            }
          }
          if (this.list.created_at != 0) {
            this.list.created_at = this.parseTime(this.list.created_at)
          }
          this.list.pack_price = this.list.order_freight.pack_price / 100//打包预付
          this.list.true_pack_price = this.list.order_freight.true_pack_price / 100//打包实付
          this.list.warm_price = this.list.order_freight.warm_price / 100//保温预付
          this.list.true_warm_price = this.list.order_freight.true_warm_price / 100//保温实付
          this.list.fre_price = this.list.order_freight.fre_price / 100//运费预付
          this.list.true_fre_price = this.list.order_freight.true_fre_price / 100//运费实付
          this.list.log_y_price = (parseInt(this.list.order_freight.pack_price) + parseInt(this.list.order_freight.warm_price) + parseInt(this.list.order_freight.fre_price)) / 100//物流预付
          this.list.true_log_y_price = (parseInt(this.list.order_freight.true_fre_price) + parseInt(this.list.order_freight.true_pack_price) + parseInt(this.list.order_freight.true_warm_price)) / 100//物流预付
          this.list.diffAll_price = parseInt(this.list.true_log_y_price) - parseInt(this.list.log_y_price)
          let a = 0
          let b = 0
          // for(let i=0;i<this.list.spec_good.length;i++){
          //   a += (parseFloat(this.list.spec_good[i].true_good_price)-parseFloat(this.list.spec_good[i].good_price))*this.list.spec_good[i].count;
          // }
          for (let i = 0; i < this.list.spec_good.length; i++) {
            a += parseFloat(this.list.spec_good[i].true_good_price) * this.list.spec_good[i].true_count - parseFloat(this.list.spec_good[i].good_price) * this.list.spec_good[i].count
          }
          // for(let i=0;i<this.list.hot_good.length;i++){
          //   b += (parseFloat(this.list.hot_good[i].true_good_price)-parseFloat(this.list.hot_good[i].good_price))*this.list.hot_good[i].count;
          // }
          for (let i = 0; i < this.list.hot_good.length; i++) {
            a += parseFloat(this.list.hot_good[i].true_good_price) * this.list.hot_good[i].true_count - parseFloat(this.list.hot_good[i].good_price) * this.list.hot_good[i].count
          }
          this.sum = a + b
        })
      },
    },
    created () {
      let id = this.$route.params.id
      this.id = id
      this.$nextTick(() => {
        this.getList()
        var timestamp = Date.parse(new Date())
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

  .wuliu {
    @include flex;
  }
</style>
