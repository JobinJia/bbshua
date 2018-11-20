<template>
  <Row type="flex" align="top" justify="start">
    <Col span="24"
         style="display: flex;flex-direction: row;justify-content: space-around;align-items: center;
         border: 1px solid #dddde2;padding: 8px 0;">
      <Input search enter-button="搜索" v-model="name" placeholder="请输入商品名称" @on-search="searchHandler" style="width: 300px;"/>
      <Select v-if="type === 1" clearable filterable v-model="cateId" placeholder="请选择分类" style="width: 200px;">
        <Option v-for="item in cateList" :key="item.id" :value="item.id" :label="item.name"></Option>
      </Select>
      <Button type="primary" size="large" :ghost="type !== 1" @click="changeTable(1)">热销花材</Button>
      <Button type="primary" size="large" :ghost="type !== 2" @click="changeTable(2)">特价商品</Button>
      <Button type="primary" size="large" :ghost="type !== 3" @click="changeTable(3)">新品速递</Button>
      <Button type="primary" size="large" :ghost="type !== 4" @click="changeTable(4)">团购包邮</Button>
      <Button type="primary" size="large" :ghost="type !== 5" @click="changeTable(5)">花店直选</Button>
      <Button type="primary" size="large">上传价格</Button>
      <Button type="primary" size="large">导出价格</Button>
    </Col>
    <Col span="24" style="text-align: right;line-height: 35px;">
      日期:{{newDate}}
    </Col>
    <Col span="24">
      <Table style="margin-top: 10px;" size="small" border :columns="tableTitle" :data="tableData"
             :loading="tableLoading"></Table>
      <div class="page-page">
        <Page @on-change="changePageData" :total="pages.total" show-total show-elevator
              :page-size="pages.pageSize"
              :current.sync="pages.pageNum"/>
      </div>
    </Col>
    <Col span="24"
         style="display: flex;flex-direction: row;justify-content: space-around;align-items: center;
         border: 1px solid #dddde2;padding: 8px 0;margin-top: 15px;">
      <Button type="primary" size="default" @click="toPage">添加</Button>
      <Button type="primary" size="default">复制全部价格</Button>
      <Button type="primary" size="default">清空全部价格</Button>
      <Button type="primary" size="default" @click="onLineHandle">一键全部上线</Button>
      <Button type="primary" size="default" @click="hideAllHandle">全部隐藏</Button>
      <!--<Button type="primary" size="default">输入确认</Button>-->
      <!--<Button type="primary" size="default">审核发布</Button>-->
      <!--<p style="color: red;"> * 必须在每天7:50前完成审核发布！</p>-->
    </Col>
  </Row>
</template>

<script type="text/jsx">
  import Mixin from '@/common/js/app-mixin'

  export default {
    name: 'update-price',
    mixins: [Mixin],
    data () {
      return {
        type: 1, // default value
        cateId: null,
        cateList: [],
        name: null,
        tableLoading: false,
        tableChild: [
          {
            id: 1,
            title: 'A级'
          }, {
            id: 2,
            title: 'B级'
          }, {
            id: 3,
            title: 'C级'
          }, {
            id: 6,
            title: '优质'
          }, {
            id: 5,
            title: '活动'
          }, {
            id: 4,
            title: 'D级'
          }
        ],
        tableTitle: [
          {
            title: '序号',
            align: 'center',
            tooltip: true,
            minWidth: 80,
            fixed: 'left',
            type: 'index'
          }, {
            title: '品种代码',
            align: 'center',
            tooltip: true,
            minWidth: 100,
            fixed: 'left',
            key: 'brand'
          }, {
            title: '商品名称',
            align: 'center',
            minWidth: 100,
            fixed: 'left',
            tooltip: true,
            key: 'name'
          }, {
            title: '规格',
            align: 'center',
            fixed: 'left',
            minWidth: 80,
            tooltip: true,
            render: (h, params) => {
              let type = params.row.unit_type
              let str = ''
              if (type === '3') {
                str = '若干枝'
              } else {
                let s = this.$util.getNameByStatus(type, 'unit_type', this.systemMap)
                str = params.row.unit + s
              }
              return <div>
                <span>{str}</span>
              </div>
            }
          }, {
            fixed: 'right',
            title: '操作',
            align: 'center',
            tooltip: true,
            width: 120,
            render: (h, params) => {
              let id = params.row.id
              let str = ''
              if (params.row.is_show === '1') {
                str = <i-button type="error" size="small" style="marginLef:3px;" nativeOnClick={this.closeHandle.bind(this, params.row)} >隐藏</i-button>
              } else {
                str = <i-button type="success" size="small" style="marginLef:3px;" nativeOnClick={this.closeHandle.bind(this, params.row)} >显示</i-button>
              }
              // <i-button type="error" size="small" style="marginLeft:3px;"
              //          nativeOnClick={this.closeHandle.bind(this, id)} icon="ios-trash"></i-button>
              let vm = <div style="display:flex;flexDirection:row;justifyContent:space-around;">
                <i-button type="primary" size="small" replace icon="ios-refresh"
                          nativeOnClick={this.refreshPrice.bind(this, id)}></i-button>
                {str}
              </div>
              return vm
            }
          }
        ],
        tableData: []
      }
    },
    created () {
      this.initPage()
    },
    watch: {
      cateId (cur) {
        this.getList()
      }
    },
    methods: {
      initPage () {
        this.initTableTitle()
        this.getCate()
        this.getList()
      },
      async getCate () {
        let {data} = await this.$http.getCate()
        this.cateList = data
      },
      searchHandler () {
        this.getList()
      },
      initTableTitle () {
        let insert = this.getTableChild()
        let titles = this.tableTitle
        let stash = Array.from(titles)
        titles.forEach((item, i) => {
          if (i === 3) {
            let j = i
            for (let x = 0; x < insert.length; x++) {
              stash.splice(j + x + 1, 0, insert[x])
            }
          }
        })
        // console.log(stash)
        this.tableTitle = stash
      },
      getTableChild () {
        let arr = [
          {
            title: '当前',
            align: 'center',
            tooltip: true,
            minWidth: 80,
            render: (h, params) => {
              let objName = this.getObjName(params.column.spec)
              let o = params.row[objName]
              if (o) {
                return <div>{o.y_price}</div>
              } else {
                return <div>暂无</div>
              }
            }
          }, {
            title: '上海',
            align: 'center',
            minWidth: 80,
            tooltip: true,
            render: (h, params) => {
              // console.log(params.column.spec)
              let objName = this.getObjName(params.column.spec)
              let o = params.row[objName]
              if (o) {
                return <i-input size="default" value={o.t_price}
                                onOn-change={this.bindVal.bind(this, params, objName, 't_price')}
                                onOn-blur={this.modifyItem.bind(this, params, o, 't_price')}></i-input>
              } else {
                return <div>暂无</div>
              }
            }
          }, {
            title: '昆明参考价',
            align: 'center',
            tooltip: true,
            minWidth: 100,
            render: (h, params) => {
              let objName = this.getObjName(params.column.spec)
              let o = params.row[objName]
              if (o) {
                return <i-input size="default" value={o.km_price}
                                onOn-change={this.bindVal.bind(this, params, objName, 'km_price')}
                                onOn-blur={this.modifyItem.bind(this, params, o, 'km_price')}></i-input>
              } else {
                return <div>暂无</div>
              }
            }
          }, {
            title: '库存',
            align: 'center',
            tooltip: true,
            minWidth: 80,
            render: (h, params) => {
              let objName = this.getObjName(params.column.spec)
              let o = params.row[objName]
              if (o) {
                return <i-input size="default" value={o.stock}
                                onOn-change={this.bindVal.bind(this, params, objName, 'stock')}
                                onOn-blur={this.modifyItem.bind(this, params, o, 'stock')}></i-input>
              } else {
                return <div>暂无</div>
              }
            }
          }
        ]
        let list = this.tableChild
        let stash = []
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          let title = item.title
          let arr1 = this.copyData(arr)
          for (let j = 0; j < arr1.length; j++) {
            arr1[j].spec = title
          }
          let obj = {
            align: 'center',
            tooltip: true,
            id: item.id,
            title: item.title,
            children: arr1
          }
          stash.push(obj)
        }
        return stash
      },
      clone (obj) {
        if (obj === null) return null
        if (typeof obj !== 'object') return obj
        if (obj.constructor === Date) return new Date(obj)
        let newObj = new obj.constructor() // 保持继承链
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) { // 不遍历其原型链上的属性
            let val = obj[key]
            /* eslint-disable */
            newObj[key] = typeof val === 'object' ? arguments.callee(val) : val // 使用arguments.callee解除与函数名的耦合
          }
        }
        return newObj
      },
      copyData (arr) {
        let res = []
        for (let i in arr) {
          let item = arr[i]
          let o = this.clone(item)
          res.push(o)
        }
        return res
      },
      bindVal (obj, objName, key, event) {
        let v = event.target.value
        obj.row[objName][key] = v
      },
      getSpec (data, str) {
        return data.find(item => item.spec === str)
      },
      changeTable (type) {
        this.type = type
        this.initPageData()
        this.updateList()
      },
      async getList () {
        let query = {
          status: '3',
          type: this.type,
          name: this.name,
          cate_id: this.cateId,
          page: this.pages.pageNum
        }
        this.tableLoading = true
        let {data: {data, total, per_page}} = await this.$http.getShopList(query)
        data.forEach(item => {
          let levela = this.getSpec(item.spec, 'A级')
          let levelb = this.getSpec(item.spec, 'B级')
          let levelc = this.getSpec(item.spec, 'C级')
          let leveld = this.getSpec(item.spec, 'D级')
          let levele = this.getSpec(item.spec, '活动')
          let levelf = this.getSpec(item.spec, '优质')
          item.levela = levela
          item.levelb = levelb
          item.levelc = levelc
          item.leveld = leveld
          item.levele = levele
          item.levelf = levelf
        })
        this.tableLoading = false
        this.tableData = data
        this.pages.total = total
        this.pages.pageSize = per_page
      },
      getObjName (str) {
        switch (str) {
          default:
            break
          case 'A级':
            return 'levela'
          case 'B级':
            return 'levelb'
          case 'C级':
            return 'levelc'
          case 'D级':
            return 'leveld'
          case '活动':
            return 'levele'
          case '优质':
            return 'levelf'
        }
      },
      updateList () {
        this.$nextTick(() => {
          this.getList()
        })
      },
      async refreshPrice (id) {
        let query = {
          id
        }
        let {code} = await this.$http.refreshPrice(query)
        if (code === 0) {
          this.$Message.success({
            content: '刷新成功！'
          })
          this.updateList()
        }
      },
      async closeHandle (row) {
        let query = {
          id: row.id
        }
        let {code} = await this.$http.hideShop(query)
        if (code === 0) {
          this.$Message.success({
            content: row.is_show === '1' ? '下线成功！' : '上线成功'
          })
          this.updateList()
        }
      },
      changePageData () {
        this.updateList()
      },
      async modifyItem (params, current, t) {
        // console.log(current.t_price)
        let query = {
          id: current.id
        }
        query[t] = current[t]
        let {code} = await this.$http.updateSpec(query)
        if (code === 0) {
          this.$Message.success({
            content: '修改成功！'
          })
          this.updateList()
        }
      },
      async onLineHandle () {
        let query = {
          type: this.type
        }
        let {code} = await this.$http.shoAll(query)
        if (code === 0) {
          this.$Message.success({
            content: '全部上线成功！'
          })
          this.updateList()
        }
      },
      async hideAllHandle () {
        let query = {
          type: this.type
        }
        let {code} = await this.$http.hideAll(query)
        if (code === 0) {
          this.$Message.success({
            content: '全部隐藏成功！'
          })
          this.updateList()
        }
      },
      toPage () {
        switch (this.type) {
          default:
            break
          case 1:
            this.$router.push({
              name: 'hotFlower'
            })
            break
          case 2:
            this.$router.push({
              name: 'spe'
            })
            break
          case 3:
            this.$router.push({
              name: 'new'
            })
            break
          case 4:
            this.$router.push({
              name: 'team'
            })
            break
          case 5:
            this.$router.push({
              name: 'flower'
            })
            break
        }
      }
    },
    computed: {
      newDate () {
        return this.$util.getDateByTimestamp(new Date().getTime() / 1000)
      }
    }
  }
</script>

<style scoped>

</style>
