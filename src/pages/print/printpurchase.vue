<template>
  <div>
    <div style="width:900px;margin:30px auto 10px;text-align:right;">
      <Button @click="printlogo" type="primary" style="color:#fff">确认打印</Button>
    </div>
    <div style="width:900px;margin:0 auto;" id="subOutputRank-printpurchase">
      <div class="purchasetitle"
           style="height:100px;font-weight:600;border:1px solid #ddd;margin-top:10px;border-bottom:0px;text-align:center;padding-top:10px;">
        <div>采购统计表</div>
        <div style="font-size:12px;font-weight:400;margin-top:10px;">{{start_sn}} - {{end_sn}}</div>
        <div style="font-size:10px;margin-top:10px;font-weight:400;">注：用户订单可能发生变更或有其他要求，请随时查看群消息通知防止遗漏！！！</div>
      </div>
      <table class="table table-bordered" style="margin-bottom:0px;border-bottom:0px;">
        <tbody style="height:24px;line-height:24px;">
        <tr style="height:24px; line-height:24px;">
          <th style="height:24px; line-height:24px;width:12%;font-size:14px;font-weight:600;">品种代码</th>
          <th style="height:24px; line-height:24px;width:27%;font-size:14px;font-weight:600;">商品名称</th>
          <th style="height:24px; line-height:24px;width:10%;font-size:14px;font-weight:600;">数量</th>
          <th style="height:24px; line-height:24px;width:12%;font-size:14px;font-weight:600;">颜色</th>
          <th style="height:24px; line-height:24px;width:13%;font-size:14px;font-weight:600;">规格</th>
          <th style="height:24px; line-height:24px;width:10%;font-size:14px;font-weight:600;">等级</th>
          <th style="height:24px; line-height:24px;width:16%;font-size:14px;font-weight:600;">备注</th>
        </tr>
        </tbody>
      </table>
      <div v-for="item in list" :key="item.cate_id">
        <div
          style="border:1px solid rgba(228, 228, 228, 1);border-top:0;border-bottom:0;height:40px;line-height:40px;padding-left:20px;">
          {{item.cate_name}}
        </div>
        <table class="table table-bordered" style="margin-bottom:0px;border-bottom:0px;">
          <tbody style="height:24px;line-height:24px;">
          <tr style="height:30px;" v-for="items in item.good_list" :key="items.id">
            <td style="width:12%;font-size:14px;font-weight:400;">{{items.brand}}</td>
            <td style="width:27%;font-size:14px;font-weight:400;">{{items.good_name}}</td>
            <td style="width:10%;font-size:14px;font-weight:400;">{{items.count}}</td>
            <td style="width:12%;font-size:14px;font-weight:400;">{{items.color}}</td>
            <td style="width:13%;font-size:14px;font-weight:400;">{{items.unit}}</td>
            <td style="width:10%;font-size:14px;font-weight:400;">{{items.spec}}</td>
            <td style="width:16%;font-size:14px;font-weight:400;"></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  // import {purchase} from '../../api/purchase/purchase.js'
  import Base from '@/common/Base'
  /* eslint-disable */
  export default {
    mixins: [Base],
    data () {
      return {
        list: [],
        title: '',
        // type:'',
        start_sn: '',
        end_sn: '',
      }
    },
    methods: {
      printlogo () {
        let subOutputRankPrint = document.getElementById('subOutputRank-printpurchase')
        console.log(subOutputRankPrint.innerHTML)
        let newContent = subOutputRankPrint.innerHTML
        let oldContent = document.body.innerHTML
        document.body.innerHTML = newContent
        window.print()
        window.location.reload()
        document.body.innerHTML = oldContent
        return false
      },
      getList () {// 获取详情数据
        //this.type = this.$route.params.type;
        // if(this.type==1){
        // 	this.title = '第一阶段采购统计';
        // }
        // if(this.type==2){
        // 	this.title = '第二阶段采购统计';
        // }
        // if(this.type==3){
        // 	this.title = '第三阶段采购统计';
        // }
        // if(this.type==4){
        // 	this.title = '汇总采购统计';
        // }
        this.start_sn = this.$route.params.start_sn
        this.end_sn = this.$route.params.end_sn
        this.$http.getProList({
          // token: localStorage.getItem('data'),
          start_sn: this.start_sn,
          end_sn: this.end_sn
        }).then(res => {
          this.list = res.data
          for (let i = 0; i < this.list.length; i++) {
            for (let j = 0; j < this.list[i].good_list.length; j++) {
              if (this.list[i].unit_type == 1) {
                this.list[i].good_list[j].unit = `${this.list[i].good_list[j].unit}kg/扎` //列表页修改规格后缀
              } else {
                this.list[i].good_list[j].unit = `${this.list[i].good_list[j].unit}枝/扎` //列表页修改规格后缀
              }
              // this.list[i].good_list[j].good_price = this.list[i].good_list[j].good_price/100;
            }
          }
          // for(let i=0;i<this.list.length;i++){
          //   if(this.list[i].unit_type==1){
          //     this.list[i].unit = `${this.list[i].unit}kg/扎`//列表页修改规格后缀
          //   }else{
          //     this.list[i].unit = `${this.list[i].unit}枝/扎`//列表页修改规格后缀
          //   }
          // }
        })
      },
    },
    created () {
      // this.getTitle(this.$route.params.type);
      this.getList()
      document.getElementById('app').parentNode.className = 'important'
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/common/css/common.scss";
  @import "./bootstrap.min.css";
  @import "./bootstrap-table.css";

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
