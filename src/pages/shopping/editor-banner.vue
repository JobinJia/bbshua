<template>
  <Row type="flex" align="top" justify="start">
    <Col span="24">
      <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
        <template v-if="item.status === 'finished'">
          <img :src="item.url">
          <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
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
        style="display: inline-block;width:120px;">
        <div style="width: 120px;height:120px;line-height: 120px;">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
      <Modal title="预览" v-model="visible">
        <img :src="imgName" v-if="visible" style="width: 100%">
      </Modal>
    </Col>
    <Col span="24" style="margin-top: 20px;">
      <Button type="primary" size="default" @click="addNewBanner">提交</Button>
    </Col>
  </Row>
</template>

<script>
  export default {
    name: 'editor-banner',
    data () {
      return {
        item: null,
        id: null,
        type: null,
        defaultList: [],
        imgName: '',
        visible: false,
        uploadList: []
      }
    },
    created () {
      let {type, id} = this.$route.params
      this.type = type
      this.id = id || null
      if (id) {
        this.$nextTick(() => {
          this.initPage()
        })
      }
    },
    methods: {
      initPage () {
        this.getItem()
      },
      async getItem () {
        let query = {
          type: this.type,
          id: this.id
        }
        let {data} = await this.$http.getBanner(query)
        this.item = data
        let arr = [{
          url: data.cover
        }]
        console.log(arr)
        this.defaultList = arr
        this.$nextTick(() => { // 赋值后马上更新
          this.uploadList = this.$refs.upload.fileList
        })
      },
      handleView (item) {
        this.imgName = item.url
        this.visible = true
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      },
      handleSuccess (res, file) {
        // file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar'
        // file.name = '7eb99afb9d5f317c912f08b5212fd69a'
        console.log(res)
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
      async addNewBanner () {
        let query = {
          cover: this.uploadList[0].url,
          type: this.type
        }
        let res
        if (this.id) { // 修改
          query.id = this.id
           res = await this.$http.updBanner(query)
        } else {
          res = await this.$http.addBanner(query)
        }
        console.log(res)
        let {code} = res
        if (this.id) {
          if (code === 0) {
            this.$Message.success({
              content: '修改成功！'
            })
          }
        } else {
          if (code === 0) {
            this.$Message.success({
              content: '新增成功！'
            })
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
    width: 120px;
    height: 120px;
    text-align: center;
    line-height: 120px;
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
