<template>
  <Row type="flex" align="middle" justify="start">
    <Col span="24">
      <Card :padding="0">
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          商品信息
        </p>
        <p slot="extra" style="margin-top: -5px;">
          <Button type="primary" size="default" ghost @click="toBack">返回</Button>
        </p>
        <div class="main"
             style="margin-top: 10px;display: flex;flex-direction: column;justify-content: flex-start;align-items: center;">
          <Form :label-width="120" style="width: 60%;" :model="item">
            <FormItem label="品种代码">
              <Input v-model="item.brand"></Input>
            </FormItem>
            <FormItem label="商品名称">
              <Input v-model="item.name"></Input>
            </FormItem>
            <FormItem label="分类">
              <Select v-model="item.cate_id" placeholder="请选择分类" clearable filterable style="width: 49%;"
                      @on-change="selectColorType">
                <Option v-for="item in cateList" :key="item.id" :value="item.id" :label="item.name"></Option>
              </Select>
              <Select v-model="item.s_id" placeholder="请选择色系" clearable filterable style="width: 50%;"
                      ref="secColor">
                <Option v-for="item in currentColor" :key="item.id" :value="item.id" :label="item.name"></Option>
              </Select>
            </FormItem>
            <FormItem label="颜色">
              <Select v-model="item.color_id" placeholder="请选择颜色" clearable filterable>
                <Option v-for="item in colorList" :key="item.id" :value="item.id" :label="item.name"></Option>
              </Select>
            </FormItem>
            <FormItem label="特性描述">
              <Select v-model="item.petal_id" clearable filterable>
                <Option v-for="item in petalList" :key="item.id" :value="item.id" :label="item.name"></Option>
              </Select>
            </FormItem>
            <FormItem label="营销语">
              <Input v-model="item.sale_word"></Input>
            </FormItem>
            <!--<FormItem label="销量(虚假)">-->
            <!--<Input v-model="item.sales"></Input>-->
            <!--</FormItem>-->
            <FormItem label="店长最爱(数字越大越靠前)">
              <Input v-model="item.love"></Input>
            </FormItem>
            <FormItem label="周销量最高(数字越大越靠前)">
              <Input v-model="item.week"></Input>
            </FormItem>
            <!--<FormItem label="原价">-->
              <!--<Input v-model="item.y_price"></Input>-->
            <!--</FormItem>-->
            <FormItem label="规格">
              <Input v-model="item.unit"></Input>
            </FormItem>
            <FormItem>
              <RadioGroup v-model="item.unit_type">
                <Radio label="2">枝/扎</Radio>
                <Radio label="1">kg/扎</Radio>
                <Radio label="3">若干枝</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="等级">
              <div v-for="(item, index) in levels" :key="index" class="level-item"
                   style="display: flex;flex-direction: row;justify-content: flex-start;align-items: flex-start;align-content: center;">
                <Checkbox v-model="item.checked"></Checkbox>
                <div style="width: 100px;white-space: nowrap;padding: 0 5px;">{{item.name}}</div>
                <div v-for="(it, id) in item.tips" :key="id" style="margin-left: 10px;">
                  <Input :placeholder="it.tip" :value="it.model" @input="handleInput($event, index, id)"
                         style="width: 145px;"></Input>
                </div>
              </div>
            </FormItem>
            <FormItem label="商品图片">
              <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
                <template v-if="item.status === 'finished'">
                  <img :src="item.url">
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                  </div>
                </template>
                <template v-else>
                  <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
              </div>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                action="https://bbshua.com/api/admin/v2/upload"
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                  <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
            </FormItem>
            <FormItem label="商品描述">
              <Input v-model="item.des" placeholder="请输入商品描述"></Input>
            </FormItem>
            <FormItem label="商品详情">
              <Editor v-model="item.clean_content"></Editor>
            </FormItem>
            <FormItem>
              <Button type="primary" size="default" ghost @click="back">返回列表</Button>
              <Button type="primary" size="default" @click="saveShopping">保存商品</Button>
              <!--<Button type="primary" size="default" @click="downHandle" v-if="!id">上架</Button>-->
              <Button type="primary" size="default" @click="downHandle" v-if="item.status === '1'">上架</Button>
              <Button type="primary" size="default" @click="downHandle" v-if="item.status === '3'">下架</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
      <Modal title="预览" v-model="visible" style="z-index: 999999;" :transfer="true">
        <p slot="footer"></p>
        <img :src="imgName" v-if="visible" style="width: 100%">
      </Modal>
    </Col>
  </Row>
</template>

<script>
  import Mixin from '@/common/js/app-mixin'
  import Editor from './common/editor'

  export default {
    name: 'newProDetail',
    mixins: [Mixin],
    components: {
      Editor
    },
    data () {
      return {
        item: {
          brand: null,
          name: null,
          s_id: null,
          sales: null,
          week: null,
          love: null,
          sale_word: null,
          color_id: null,
          cate_id: null,
          petal_id: null,
          unit: null,
          unit_type: 1,
          des: null,
          clean_content: null
        },
        imgName: '',
        visible: false,
        uploadList: [],
        colorList: [],
        cateList: [],
        // currentColor: [],
        id: null,
        petalList: [],
        levels: [],
        defaultList: [],
        title: null
      }
    },
    created () {
      let id = this.$route.params.id
      let type = this.$route.query.type
      if (id === '-1') { // add new
        this.id = null
      } else { // modify
        this.id = id
      }
      this.type = type
      this.initPage()
    },
    computed: {
      currentColor () {
        let o = this.cateList.find(item => item.id === this.item.cate_id)
        return (o && o.color_system) ? o.color_system : []
      }
    },
    methods: {
      initPage () {
        this.getCate()
        this.getColor()
        this.getPetal()
        this.getSpec()
        this.$nextTick(() => {
          if (this.id) {
            this.getItem()
          }
        })
      },
      async getItem () {
        let query = {
          id: this.id,
          type: this.type
        }
        let {data} = await this.$http.getShopList(query)
        let phto = data.photo || []
        let arr = phto.map(item => {
          return {
            url: item,
            name: item
          }
        })
        this.defaultList = arr
        let levels = data.spec || []
        let spec = this.levels
        for (let i = 0; i < spec.length; i++) {
          let s = spec[i]
          let name = s.name
          let ss = levels.find(item => item.spec === name) || null
          let tips = JSON.parse(JSON.stringify(s.tips))
          tips.forEach(it => {
            if (ss) {
              let keys = Object.keys(ss)
              for (let k in keys) {
                let key = keys[k]
                if (key === it.name) {
                  spec[i].checked = true
                  it.model = ss[key]
                }
              }
            }
          })
          spec[i].tips = tips
        }
        this.levels = spec
        this.$nextTick(() => { // 赋值后马上更新
          this.uploadList = this.$refs.upload.fileList
        })
        data.color_id = Number(data.color_id)
        data.cate_id = Number(data.cate_id)
        this.selectColorType(Number(data.cate_id))
        data.s_id = Number(data.s_id)
        data.petal_id = Number(data.petal_id)
        this.item = data
      },
      async getColor () {
        let {data} = await this.$http.getColor()
        this.colorList = data
      },
      async getCate () {
        let {data} = await this.$http.getCate()
        this.cateList = data
      },
      async getPetal () {
        let {data} = await this.$http.getPetal()
        this.petalList = data
      },
      async getSpec () {
        let {data} = await this.$http.getSpec()
        let tips = [
          {
            model: null,
            name: 'weight',
            tip: '请输入重量'
          }, {
            model: null,
            name: 'sales',
            tip: '请输入销量'
          }, {
            model: null,
            name: 'mini', // 暂定待确认
            tip: '请输入最底起售量'
          }, {
            model: null,
            name: 'y_price',
            tip: '请输入价格'
          }, {
            model: null,
            name: 'ori_price',
            tip: '请输入原价'
          }, {
            model: null,
            name: 'stock',
            tip: '请输入库存'
          }
        ]
        data.forEach((item) => {
          item.checked = false
          item.tips = tips
        })
        this.levels = data
      },
      selectColorType (id) {
        if (!id) {
          this.$refs.secColor.clearSingleSelect() // 组件方法，清空select
        } else {
          // let cur = this.cateList.find(item => item.id === id) || null
          // if (cur) {
          //   this.currentColor = cur.color_system || []
          // }
          // console.log(this.currentColor)
        }
      },
      async downHandle () {
        let query = {
          id: this.item.id,
          status: this.item.status
        }

        let str = this.item.status === '1' ? '是否确认上架?' : '是否确认下架?'
        this.$Modal.confirm({
          title: '提示',
          content: `<p>${str}</p>`,
          onOk: async () => {
            let {code} = await this.$http.downShop(query)
            if (code === 0) {
              this.$Message.success({
                content: this.item.status === '1' ? '上架成功！' : '下架成功！'
              })
              this.initPage()
            } else {
              this.$Message.error({
                content: '操作失败！'
              })
            }
          },
          onCancel: () => {
            this.$Message.info('已取消！')
          }
        })
      },
      getLevels () {
        return this.levels.filter(it => it.checked)
      },
      getImages () {
        if (this.uploadList) {
          return this.uploadList.map(it => it.url)
        }
      },
      getQuery (item, levels, img) {
        let spec = []
        if (levels && levels.length !== 0) {
          for (let i = 0; i < levels.length; i++) {
            let c = levels[i]
            let tips = c.tips
            let o = {
              id: c.id
            }
            for (let j = 0; j < tips.length; j++) {
              let it = tips[j]
              switch (it.name) {
                default:
                  break
                case 'weight':
                  o.weight = it.model
                  break
                case 'sales':
                  o.sales = it.model
                  break
                case 'mini':
                  o.mini = it.model
                  break
                case 'y_price':
                  o.y_price = it.model
                  break
                case 'ori_price':
                  o.ori_price = it.model
                  break
                case 'stock':
                  o.stock = it.model
                  break
              }
            }
            spec.push(o)
          }
        }
        item.spec = JSON.stringify(spec)
        item.photo = JSON.stringify(img)
        return item
      },
      async saveShopping () {
        let item = this.item
        item.type = this.type // 分类
        let levels = this.getLevels()
        let imgList = this.getImages()
        let query = this.getQuery(item, levels, imgList)
        let res
        if (!this.id) { // 新增
          query.id = this.id
          res = await this.$http.addNewShop(query)
        } else {
          res = await this.$http.updShopItem(query)
        }
        let {code} = res
        if (code === 0) {
          if (this.id) {
            this.$Message.success({
              content: '修改成功！'
            })
          } else {
            this.$Message.success({
              content: '新增成功！'
            })
          }
        }
      },
      back () {
        this.$router.go(-1)
      },
      handleView (name) {
        this.imgName = name
        this.visible = true
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      },
      handleSuccess (res, file) {
        let {data} = res
        file.url = data
        file.name = data
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不支持',
          desc: '文件格式： ' + file.name + ' 不支持,请选择 jpg 或 png.'
        })
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '文件太大',
          desc: '' + file.name + ' 太大, 不能超过2M.'
        })
      },
      handleBeforeUpload () {
        return true
        // const check = this.uploadList.length < 5
        // if (!check) {
        //   this.$Notice.warning({
        //     title: 'Up to five pictures can be uploaded.'
        //   })
        // }
        // return check
      },
      handleInput (v, index, id) {
        console.log(v, index, id)
        let stash = JSON.parse(JSON.stringify(this.levels))
        stash[index].tips[id].model = v
        this.levels = stash
      },
      toBack () {
        this.$router.go(-1)
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList
      // this.selectColorType(Number(this.item.cate_id))
    }
  }
</script>

<style scoped>
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>

<style scoped lang="less">
  .level-item {
    &:not(:first-child) {
      margin-top: 10px;
    }
  }

  .bottom-div {
    width: 60%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
</style>
