<template>
  <div>
    <Row type="flex" align="top" justify="start">
      <Col span="24" style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;">
        <Button type="primary" size="default" @click="changeTab(1)">热销banner</Button>
        <Button type="primary" size="default" ghost @click="changeTab(2)" style="margin-left: 10px;">首页banner</Button>
      </Col>
      <Col span="24" style="text-align: right;">
        <Button type="primary" size="default" @click="addNewItem">添加</Button>
      </Col>
      <Col span="24">
        <Table style="margin-top: 10px;" size="small" border :columns="tableTitle" :data="tableData"></Table>
        <!--<div class="page-page">-->
          <!--<Page @on-change="changePageData" :total="pages.total" show-total show-elevator-->
                <!--:page-size="pages.pageSize"-->
                <!--:current.sync="pages.pageNum"/>-->
        <!--</div>-->
      </Col>
    </Row>
    <Modal title="商品预览" v-model="visible">
      <img :src="viewSrc" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script type="text/jsx">
  import Mixin from '@/common/js/app-mixin'
  // import ImageView from '@/common/vue/imgeView/imageView'

  export default {
    name: 'flower-banner',
    mixins: [Mixin],
    components: {
    },
    data () {
      return {
        type: 1,
        visible: false,
        viewSrc: null,
        tableTitle: [
          {
            align: 'center',
            fixed: 'left',
            title: '图片ID',
            key: 'id'
          }, {
            align: 'center',
            fixed: 'left',
            title: '图片',
            render: (h, params) => {
              return <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
                <img onClick={this.viewHandler.bind(this, params)} src={params.row.cover} width="120" height="120" />
              </div>
            }
          }, {
            align: 'center',
            fixed: 'left',
            title: '操作',
            key: '',
            render: (h, params) => {
              return <div style="display:flex;flexDirection:row;justify-content:space-around;align-items:center;">
                <i-button type="primary" size="small" nativeOnClick={this.editorItem.bind(this, params.row)}>编辑
                </i-button>
                <i-button type="error" size="small" nativeOnClick={this.deleteItem.bind(this, params.row)}>删除</i-button>
              </div>
            }
          }
        ],
        tableData: []
      }
    },
    created () {
      this.initPage()
    },
    methods: {
      initPage () {
        this.getList()
      },
      async getList () {
        let query = {
          type: this.type,
          page: this.pages.pageNum
        }
        let {data} = await this.$http.getBanner(query)
        this.tableData = data
      },
      updateList () {
        this.$nextTick(() => {
          this.updateList()
        })
      },
      changePageData () {
      },
      changeTab (type) {
        this.type = type
      },
      editorItem (row) {
        this.$router.push({
          name: 'editorBanner',
          params: {
            type: this.type,
            id: row.id
          }
        })
      },
      addNewItem () {
        this.$router.push({
          name: 'editorBanner',
          params: {
            type: this.type,
            id: null
          }
        })
      },
      deleteItem (row) {
      },
      viewHandler (o) {
        if (o.row && o.row.cover) {
          this.visible = true
          this.viewSrc = o.row.cover
        }
      }
    }
  }
</script>

<style scoped>

</style>
