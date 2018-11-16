<template>
  <Row type="flex" align="top" justify="start">
    <Col span="24" style="text-align: right;">
      <Button type="primary" size="default" @click="addHandler">添加</Button>
    </Col>
    <Col span="24">
      <Table style="margin-top: 10px;" size="small" border :columns="tableTitle" :data="tableData"></Table>
      <!--<div class="page-page">-->
        <!--<Page @on-change="changePageData" :total="pages.total" show-total show-elevator-->
              <!--:page-size="pages.pageSize"-->
              <!--:current.sync="pages.pageNum"/>-->
      <!--</div>-->
    </Col>
    <Modal v-model="editorFlag" @on-ok="submitHandler">
      <p slot="header">公告</p>
      <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
        <template v-if="item.status === 'finished'">
          <img :src="item.url">
          <div class="demo-upload-list-cover">
            <!--<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>-->
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
        style="display: inline-block;">
        <div v-if="uploadList.length < 1" style="width: 150px;height:150px;line-height: 150px;">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
    </Modal>
  </Row>
</template>

<script type="text/jsx">
  import Mixin from '@/common/js/app-mixin'
  export default {
    name: 'wx-app',
    mixins: [Mixin],
    data () {
      return {
        editorFlag: false,
        defaultList: [],
        uploadList: [],
        tableTitle: [
          {
            align: 'center',
            fixed: 'left',
            title: '序号',
            type: 'index'
          }, {
            align: 'center',
            fixed: 'left',
            title: '内容',
            render: (h, params) => {
              return <div>
                <img src={params.row.url} alt="" width="100%;" />
              </div>
            }
          }, {
            align: 'center',
            fixed: 'left',
            title: '操作',
            key: '',
            render: (h, params) => {
              return <div style="display:flex;flexDirection:row;justify-content:space-around;align-items:center;">
                <i-button type="primary" size="small" nativeOnClick={this.editorHandler.bind(this, params.row)}>编辑</i-button>
                <i-button type="error" size="small" nativeOnClick={this.delHandler.bind(this, params.row)}>删除</i-button>
              </div>
            }
          }
        ],
        tableData: [],
        editorItem: {}
      }
    },
    created () {
      this.initPage()
    },
    methods: {
      addHandler () {
        this.editorItem = {}
        this.defaultList = []
        this.$nextTick(() => { // 赋值后马上更新
          this.uploadList = this.$refs.upload.fileList
          this.editorFlag = true
        })
      },
      async delHandler (row) {
        let query = {
          id: row.id
        }
        let {code} = await this.$http.delWxImg(query)
        if (code === 0) {
          this.$Message.success({
            content: '删除成功！'
          })
          this.getList()
        }
      },
      initPage () {
        this.getList()
      },
      async getList () {
        let {data} = await this.$http.getWxAppList()
        this.tableData = data
      },
      editorHandler (row) {
        let o = JSON.parse(JSON.stringify(row))
        this.editorItem = o
        let arr = [{
          url: o.url
        }]
        this.defaultList = arr
        this.$nextTick(() => { // 赋值后马上更新
          this.uploadList = this.$refs.upload.fileList
        })
        this.editorFlag = true
      },
      // 图片上传
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
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        })
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        })
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 5
        if (!check) {
          this.$Notice.warning({
            title: 'Up to five pictures can be uploaded.'
          })
        }
        return check
      },
      async submitHandler () {
        let url = this.uploadList[0].url
        let query = {
          url: url
        }
        if (this.editorItem.id) {
          query.id = this.editorItem.id
          let {code} = await this.$http.updWxImg(query)
          if (code === 0) {
            this.$Message.success({
              content: '修改小程序公告成功！'
            })
            this.getList()
          }
        } else {
          let {code} = await this.$http.addWxImg(query)
          if (code === 0) {
            this.$Message.success({
              content: '添加小程序公告成功！'
            })
            this.getList()
          }
        }
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList
    }
  }
</script>

<style scoped>
  .demo-upload-list {
    display: inline-block;
    width: 150px;
    height: 150px;
    text-align: center;
    line-height: 150px;
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
