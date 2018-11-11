<template>
  <Row type="flex" align="top" justify="start">
    <Col span="24" style="text-align: right;">
      <Button type="primary" size="default" ghost @click="goBack">返回</Button>
      <Button type="primary" size="default" @click="addItemHandler">添加</Button>
    </Col>
    <Col span="24">
      <Table style="margin-top: 10px;" size="small" border :columns="tableTitle" :data="tableData"></Table>
      <!--<div class="page-page">-->
      <!--<Page @on-change="changePageData" :total="pages.total" show-total show-elevator-->
      <!--:page-size="pages.pageSize"-->
      <!--:current.sync="pages.pageNum"/>-->
      <!--</div>-->
    </Col>
    <Modal v-model="isEditor" @on-ok="successHandler">
      <p slot="header" style="text-align: center;">请填写信息</p>
      <Form :label-width="100">
        <FormItem label="请输入等级名称">
          <Input v-model="item.name"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="add" @on-ok="addHandler">
      <p slot="header" style="text-align: center;">请填写信息</p>
      <Form :label-width="100">
        <FormItem label="请输入等级名称">
          <Input v-model="addItem.name"></Input>
        </FormItem>
      </Form>
    </Modal>
  </Row>
</template>

<script type="text/jsx">
  import Mixin from '@/common/js/app-mixin'

  export default {
    name: 'flower-category',
    mixins: [Mixin],
    data () {
      return {
        id: null,
        item: {
          name: null
        },
        isEditor: false,
        add: false,
        addItem: {
          name: null
        },
        tableTitle: [
          {
            align: 'center',
            fixed: 'left',
            title: '色系',
            key: 'name'
          }, {
            align: 'center',
            fixed: 'left',
            title: '操作',
            key: '',
            render: (h, params) => {
              return <div style="display:flex;flexDirection:row;justify-content:space-around;align-items:center;">
                <i-button type="primary" size="small" nativeOnClick={this.editorHandle.bind(this, params.row)}>编辑
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
      let id = this.$route.params.id
      this.id = id || null
      this.$nextTick(() => {
        this.initPage()
      })
    },
    methods: {
      initPage () {
        this.getList()
      },
      async getList () {
        let query = {
          cate_id: this.id
        }
        /* eslint-disable */
        let {data} = await this.$http.getColorSys(query)
        this.tableData = data
      },
      editorHandle (row) {
        this.item = row
        this.isEditor = true
      },
      updateList () {
        this.$nextTick(() => {
          this.getList()
        })
      },
      async successHandler () {
        let query = {
          id: this.id,
          cate_id: this.item.id,
          name: this.item.name
        }
        let {code} = await this.$http.updColorSys(query)
        if (code === 0) {
          this.$Message.success({
            content: '修改成功！'
          })
          this.updateList()
        }
      },
      async deleteItem (row) {
        this.$Modal.confirm({
          title: '确认删除?',
          content: `<p>确认删除${row.name}</p>`,
          onOk: async () => {
            let query = {
              id: row.id
            }
            let {code} = await this.$http.delColorSys(query)
            if (code === 0) {
              this.$Message.success({
                content: '删除成功！'
              })
              this.updateList()
            }
          },
          onCancel: () => {
            this.$Message.info('您已取消删除')
          }
        })
      },
      addItemHandler () {
        this.add = true
      },
      async addHandler () {
        let query = {
          cate_id: this.id,
          name: this.addItem.name
        }
        let {code} = await this.$http.addColorSys(query)
        if (code === 0) {
          this.$Message.success({
            content: '新增成功！'
          })
          this.updateList()
        }
      },
      changePageData () {
      },
      goBack () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>

</style>
