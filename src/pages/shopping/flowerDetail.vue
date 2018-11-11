<template>
  <Row type="flex" align="middle" justify="start">
    <Col span="24">
      <Card :padding="0">
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          商品信息
        </p>
        <div class="main"
             style="margin-top: 10px;display: flex;flex-direction: column;justify-content: flex-start;align-items: center;">
          <Form :label-width="80" style="width: 60%;">
            <FormItem label="品种代码">
              <Input></Input>
            </FormItem>
            <FormItem label="商品名称">
              <Input></Input>
            </FormItem>
            <FormItem label="花材数量">
              <Input style="width: 30%"></Input>&nbsp; 扎
            </FormItem>
            <FormItem label="原价">
              <Input style="width: 30%"></Input>&nbsp; 元
            </FormItem>
            <FormItem label="等级">
              <div v-for="(item, index) in levels" :key="index" class="level-item"
                   style="display: flex;flex-direction: row;justify-content: flex-start;align-items: flex-start;align-content: center;">
                <Checkbox></Checkbox>
                <div style="width: 100px;white-space: nowrap;padding: 0 5px;">{{item.level}}</div>
                <div v-for="(it, id) in item.tips" :key="id" style="margin-left: 10px;">
                  <Input :placeholder="it.tip" style="width: 145px;"></Input>
                </div>
              </div>
            </FormItem>
            <FormItem label="商品图片">
              <!--
                :on-success="handleSuccess"
                :default-file-list="defaultList"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                -->
              <Upload
                ref="upload"
                :show-upload-list="false"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
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
              <Input placeholder="请输入商品描述"></Input>
            </FormItem>
            <FormItem label="商品详情">
              <Editor></Editor>
            </FormItem>
            <FormItem>
              <Button type="primary" size="default" ghost>返回列表</Button>
              <Button type="primary" size="default">保存商品</Button>
              <Button type="primary" size="default">上架</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </Col>
  </Row>
</template>

<script>
  import Mixin from '@/common/js/app-mixin'
  import Editor from './common/editor'

  export default {
    name: 'flowerDetail',
    mixins: [Mixin],
    components: {
      Editor
    },
    data () {
      return {
        levels: [
          {
            level: 'A级',
            checked: false,
            tips: [
              {
                model: null,
                tip: '请输入重量'
              }, {
                model: null,
                tip: '请输入销量'
              }, {
                model: null,
                tip: '请输入最底起售量'
              }, {
                model: null,
                tip: '请输入价格'
              }, {
                model: null,
                tip: '请输入库存'
              }
            ]
          }, {
            level: 'B级',
            checked: false,
            tips: [
              {
                model: null,
                tip: '请输入重量'
              }, {
                model: null,
                tip: '请输入销量'
              }, {
                model: null,
                tip: '请输入最底起售量'
              }, {
                model: null,
                tip: '请输入价格'
              }, {
                model: null,
                tip: '请输入库存'
              }
            ]
          }, {
            level: 'C级',
            checked: false,
            tips: [
              {
                model: null,
                tip: '请输入重量'
              }, {
                model: null,
                tip: '请输入销量'
              }, {
                model: null,
                tip: '请输入最底起售量'
              }, {
                model: null,
                tip: '请输入价格'
              }, {
                model: null,
                tip: '请输入库存'
              }
            ]
          }, {
            level: 'D级',
            checked: false,
            tips: [
              {
                model: null,
                tip: '请输入重量'
              }, {
                model: null,
                tip: '请输入销量'
              }, {
                model: null,
                tip: '请输入最底起售量'
              }, {
                model: null,
                tip: '请输入价格'
              }, {
                model: null,
                tip: '请输入库存'
              }
            ]
          }, {
            level: '优质',
            checked: false,
            tips: [
              {
                model: null,
                tip: '请输入重量'
              }, {
                model: null,
                tip: '请输入销量'
              }, {
                model: null,
                tip: '请输入最底起售量'
              }, {
                model: null,
                tip: '请输入价格'
              }, {
                model: null,
                tip: '请输入库存'
              }
            ]
          }
        ]
      }
    },
    created () {
    },
    methods: {}
  }
</script>

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
