<template lang="html">
  <Row type="flex" align="top" justify="start" style="background: #fff">
    <Col span="24">
      <Form inline>
        <FormItem>
          <Button type="warning" ghost :disabled="hasPage('pre_id')"
                  @click="preOrder">上个订单
          </Button>
        </FormItem>
        <FormItem>
          <Button type="primary" ghost :disabled="hasPage('next_id')"
                  @click="nextOrder">下个订单
          </Button>
        </FormItem>
        <FormItem>
          <Button type="primary" ghost @click="detailExport">订单商品导出</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" ghost @click="freExport">订单运费导出</Button>
        </FormItem>
      </Form>
      <Steps :current="0" status="wait">
        <Step title="提交订单" content="这里是该步骤的描述信息"></Step>
        <Step title="支付订单" content="这里是该步骤的描述信息"></Step>
        <Step title="商家发货" content="这里是该步骤的描述信息"></Step>
        <Step title="确认收货" content="这里是该步骤的描述信息"></Step>
      </Steps>
    </Col>
    <Col span="24" style="margin-top: 20px;">
      <Card :padding="0">
        <p slot="title" style="color: red;">
          <Icon type="md-alert"/>
          当前状态: {{payStatus}}
        </p>
        <Row style="padding: 10px 40px;">
          <Col span="24">
            <pageLabel :pageList="pageList1"></pageLabel>
          </Col>
          <Col span="24">
            <div style="padding: 10px 0 0 0; margin-top: 10px;font-size: 18px;" v-if="pageBaseObject !== null">
              <Icon type="ios-bookmark" :size="20"/>
              内部备注
            </div>
            <Input v-if="pageBaseObject !== null" v-model="pageBaseObject.des" style="margin-top: 15px;" type="textarea"
                   :rows="4" placeholder="请输入内容"></Input>
            <div style="text-align: right;margin-top: 10px;">
              <Button type="primary" @click="updDesHandler">确认</Button>
            </div>
          </Col>
          <Col span="24">
            <div style="padding: 10px 0 0 0; margin-top: 10px;font-size: 18px;">
              <Icon type="ios-bookmark" :size="20"/>
              选择物流方式
            </div>
            <Select clearable v-model="sendType" style="width: 250px;margin-top: 15px;">
              <Option v-for="(item, index) in sendTypeList" :key="index" :value="item.key" :label="item.val"></Option>
            </Select>
            <Button type="primary" style="margin-top: 15px;" @click="updSendTypeHandler">确定</Button>
          </Col>
          <Col span="24">
            <div style="padding: 10px 0 0 0; margin-top: 10px;font-size: 18px;">
              <Icon type="ios-bookmark" :size="20"/>
              收货人信息
            </div>
            <Table style="margin-top: 15px;" size="large" border :columns="consigneeTitle"
                   :data="consigneeData"></Table>
          </Col>
          <Col span="24">
            <div style="padding: 10px 0 0 0; margin-top: 10px;font-size: 18px;">
              <Icon type="ios-bookmark" :size="20"/>
              物流信息
            </div>
            <Table style="margin-top: 15px;" size="large" border :columns="sendTitle" :data="sendData"></Table>
            <div style="text-align: right;padding: 8px 0;">
              <Button size="default" type="primary" @click="updateAllPrice">保存</Button>
            </div>
            <Table style="margin-top: 15px;" size="large" border :columns="sendTitle2" :data="sendData2"></Table>
          </Col>
          <Col span="24">
            <div style="padding: 10px 0 0 0; margin-top: 10px;font-size: 18px;">
              <Icon type="ios-bookmark" :size="20"/>
              商品信息
            </div>
            <div style="margin-top: 15px;" v-for="(item, index) in bottomPageList" :key="index">
              <Col span="24">
                <h4 style="padding: 10px 0px;font-weight: 400;">{{item.title}}</h4>
                <Table size="large" border :columns="item.tableTitle" :data="item.data"></Table>
              </Col>
            </div>
          </Col>
          <Col span="24" style="margin-top: 5px;">
            <div
              style="display: flex;flex-direction: row;justify-content: flex-end;align-content: center;line-height: 40px;">
              <h3>商品差价:</h3>
              <p style="font-size: 15px;color: red;">{{computedMethod}}计算</p>
            </div>
          </Col>
          <Divider></Divider>
          <Col span="24" style="text-align: right;">
            <!--<Button type="primary" size="default" @click="saveDiffPrice">保存上海结算</Button>-->
            <!--<Button type="primary" size="default">保存昆明结算</Button>-->
            <Button type="primary" size="default" :disabled="canEditor()" @click="createDiffPrice">保存</Button>
          </Col>
          <Col span="24">
            <div style="padding: 10px 0 0 0; margin-top: 10px;font-size: 18px;">
              <Icon type="ios-bookmark" :size="20"/>
              汇总信息
            </div>
            <Table style="margin-top: 15px;" size="large" border :columns="computedTitle" :data="computedData"></Table>
          </Col>
          <Col span="24" style="text-align: right;margin-top: 10px;">
            <Button size="default" type="primary" @click="lockOrder(1)">审核保存</Button>
            <!--<Button size="default" type="primary" >锁定</Button>-->
            <Button size="default" type="primary" @click="lockOrder(2)">解锁</Button>
          </Col>
          <Col span="24" style="margin-top: 10px;">
            <Row type="flex" align="middle" justify="start">
              <Col span="12" style="display: flex;flex-direction: column;">
                <Form :label-width="100">
                  <FormItem label="客户备注信息">
                    <Input size="default" disabled></Input>
                  </FormItem>
                  <FormItem label="平台务注信息">
                    <Input size="default" disabled></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="12" style="display: flex;flex-direction: column;">
                <Form :label-width="100">
                  <FormItem label="添加备注">
                    <Input type="textarea" :rows="4" placeholder="请添加文字备注信息"></Input>
                  </FormItem>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col span="24" style="text-align: right;">
            <Button size="default" type="primary">保存备注</Button>
          </Col>
          <Col span="24" v-if="pageBaseObject !== null">
            <Button v-if="pageBaseObject.pay_status === '2'" size="default" type="primary" @click="sureSend">确认发货
            </Button>
            <Button v-if="pageBaseObject.pay_status === '2' || pageBaseObject.pay_status === '3'" size="default"
                    type="primary" @click="printOne">电子面单打印
            </Button>
            <Button v-if="pageBaseObject.pay_status === '2' || pageBaseObject.pay_status === '3'" size="default"
                    type="primary" @click="printTwo">理货单打印
            </Button>
            <Button v-if="pageBaseObject.pay_status === '2' || pageBaseObject.pay_status === '3'" size="default"
                    type="primary" @click="printThree">装箱单打印
            </Button>
            <Button
              v-if="pageBaseObject.pay_status === '2' || pageBaseObject.pay_status === '3' || pageBaseObject.pay_status === '4'"
              size="default" @click="printFour"
              type="primary">订单详情打印
            </Button>
            <Button size="default"
                    type="primary">订单详情导出Excel
            </Button>
          </Col>
        </Row>
      </Card>
      <Card :padding="10" style="margin-top: 10px;">
        <Form :label-width="100">
          <FormItem label="理货单上传">
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
            <Modal title="预览" v-model="visible">
              <img :src="imgName" v-if="visible" style="width: 100%">
            </Modal>
          </FormItem>
        </Form>
        <Button type="primary" size="default" style="margin-left: 100px;">保存</Button>
      </Card>
    </Col>
  </Row>
</template>

<script type="text/jsx">
  import pageLabel from './common/labelItem'
  import Mixin from '@/common/js/app-mixin'

  export default {
    name: 'orderDetail',
    mixins: [Mixin],
    components: {
      pageLabel
    },
    data () {
      return {
        sendType: null,
        computedMethod: '',
        pageList1: [
          {
            title: '基本信息',
            icon: 'ios-bookmark',
            tableTitle: [
              {
                title: '用户昵称',
                align: 'center',
                tooltip: true,
                key: 'nick_name'
              }, {
                title: '订单编号',
                align: 'center',
                tooltip: true,
                key: 'order_sn'
              }, {
                title: '创建时间',
                align: 'center',
                tooltip: true,
                key: 'created_at_str'
              }, {
                title: '支付时间',
                align: 'center',
                tooltip: true,
                key: 'pay_at_str'
              }, {
                title: '发货时间',
                align: 'center',
                tooltip: true,
                key: 'send_at_str'
              }
            ],
            data: []
          }, {
            title: '附加信息',
            icon: 'ios-bookmark',
            tableTitle: [
              {
                title: '是否选择次日发货',
                align: 'center',
                tooltip: true,
                key: 'nick_name'
              }, {
                title: '信任之选',
                align: 'center',
                tooltip: true,
                key: 'order_sn'
              }, {
                title: '神秘之选',
                align: 'center',
                tooltip: true,
                key: 'created_at_str'
              }
            ],
            data: []
          }
        ],
        consigneeTitle: [
          {
            title: '收货人',
            align: 'center',
            tooltip: true,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                  props: {
                    size: 'large',
                    value: params.row.name
                  },
                  on: {
                    input: (value) => {
                      params.row.name = value
                    },
                    'on-blur': () => {
                      let query = {
                        order_id: this.id,
                        name: params.row.name
                      }
                      this.saveAddress(query)
                    }
                  }
                })
              ])
            }
          }, {
            title: '手机号码',
            align: 'center',
            tooltip: true,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                  props: {
                    size: 'large',
                    value: params.row.phone
                  },
                  on: {
                    input: (value) => {
                      params.row.phone = value
                    },
                    'on-blur': () => {
                      let query = {
                        order_id: this.id,
                        phone: params.row.phone
                      }
                      this.saveAddress(query)
                    }
                  }
                })
              ])
            }
          }, {
            title: '收货地址',
            align: 'center',
            tooltip: true,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                  props: {
                    size: 'large',
                    value: params.row.address
                  },
                  on: {
                    input: (value) => {
                      params.row.address = value
                    },
                    'on-blur': () => {
                      let query = {
                        order_id: this.id,
                        address: params.row.address
                      }
                      this.saveAddress(query)
                    }
                  }
                })
              ])
            }
          }, {
            title: '操作',
            align: 'center',
            tooltip: true,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    size: 'default',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                    }
                  }
                }, '确认修改')
              ])
            }
          }
        ],
        consigneeData: [],
        sendTitle: [
          {
            title: '打包费',
            align: 'center',
            tooltip: true,
            children: [
              {
                title: '预付',
                align: 'center',
                tooltip: true,
                key: 'pack_price'
              }, {
                title: '结算',
                align: 'center',
                tooltip: true,
                render: (h, params) => {
                  return h('div', [
                    h('Input', {
                      props: {
                        size: 'default',
                        value: params.row.true_pack_price
                      },
                      on: {
                        input: (v) => {
                          v = Number(v)
                          params.row.true_pack_price = v
                          params.row.allTruePrice = this.$util.add([v, params.row.true_warm_price, params.row.true_fre_price])
                        },
                        'on-blur': () => {
                          this.updatePrice({true_pack_price: params.row.true_pack_price})
                        }
                      }
                    })
                  ])
                }
              }
            ]
          }, {
            title: '保温费',
            align: 'center',
            tooltip: true,
            children: [
              {
                title: '预付',
                align: 'center',
                tooltip: true,
                key: 'warm_price'
              }, {
                title: '结算',
                align: 'center',
                tooltip: true,
                render: (h, params) => {
                  return h('div', [
                    h('Input', {
                      props: {
                        size: 'default',
                        value: params.row.true_warm_price
                      },
                      on: {
                        input: (v) => {
                          v = Number(v)
                          params.row.true_warm_price = v
                          params.row.allTruePrice = this.$util.add([params.row.true_pack_price, v, params.row.true_fre_price])
                        },
                        'on-blur': () => {
                          this.updatePrice({true_warm_price: params.row.true_warm_price})
                        }
                      }
                    })
                  ])
                }
              }
            ]
          }, {
            title: '运费',
            align: 'center',
            tooltip: true,
            children: [
              {
                title: '预付',
                align: 'center',
                tooltip: true,
                key: 'fre_price'
              }, {
                title: '结算',
                align: 'center',
                tooltip: true,
                render: (h, params) => {
                  return h('div', [
                    h('Input', {
                      props: {
                        size: 'default',
                        value: params.row.true_fre_price
                      },
                      on: {
                        input: (v) => {
                          v = Number(v)
                          params.row.true_fre_price = v
                          params.row.allTruePrice = this.$util.add([params.row.true_pack_price, params.row.true_warm_price, v])
                        },
                        'on-blur': () => {
                          this.updatePrice({true_fre_price: params.row.true_fre_price})
                        }
                      }
                    })
                  ])
                }
              }
            ]
          }, {
            title: '物流费',
            align: 'center',
            tooltip: true,
            children: [
              {
                title: '预付',
                align: 'center',
                tooltip: true,
                key: 'allPrice'
              }, {
                title: '结算',
                align: 'center',
                tooltip: true,
                key: 'allTruePrice'
              }
            ]
          }, {
            title: '物流差价',
            align: 'center',
            tooltip: true,
            key: 'diff_fre_price'
          }
        ],
        pageBaseObject: null, // 页面原始信息，所有信息都在这个里面
        sendData: [],
        sendTitle2: [
          {
            title: '分拣人',
            align: 'center',
            tooltip: true,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                  props: {
                    placeholder: '请输入分拣人',
                    value: params.row.sorting
                  },
                  on: {
                    input: (v) => {
                      params.row.sorting = v
                    },
                    'on-blur': () => {
                      this.updateSendMsg({sorting: params.row.sorting})
                    }
                  }
                })
              ])
            }
          }, {
            title: '物流代理公司',
            align: 'center',
            tooltip: true,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                  props: {
                    placeholder: '请输入物流代理公司',
                    value: params.row.log_agent
                  },
                  on: {
                    input: (v) => {
                      params.row.log_agent = v
                    },
                    'on-blur': () => {
                      this.updateSendMsg({log_agent: params.row.log_agent})
                    }
                  }
                })
              ])
            }
          }, {
            title: '联系代理电话',
            align: 'center',
            tooltip: true,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                  props: {
                    placeholder: '请输入联系代理电话',
                    value: params.row.log_agent_phone
                  },
                  on: {
                    input: (v) => {
                      params.row.log_agent_phone = v
                    },
                    'on-blur': () => {
                      this.updateSendMsg({log_agent_phone: params.row.log_agent_phone})
                    }
                  }
                })
              ])
            }
          }, {
            title: '物流编号',
            align: 'center',
            tooltip: true,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                  props: {
                    placeholder: '请输入物流编号',
                    value: params.row.log_code
                  },
                  on: {
                    input: (v) => {
                      params.row.log_code = v
                    },
                    'on-blur': () => {
                      this.updateSendMsg({log_code: params.row.log_code})
                    }
                  }
                })
              ])
            }
          }, {
            title: '物流公司',
            align: 'center',
            tooltip: true,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                  props: {
                    placeholder: '请输入物流公司',
                    value: params.row.log_company
                  },
                  on: {
                    input: (v) => {
                      params.row.log_company = v
                    },
                    'on-blur': () => {
                      this.updateSendMsg({log_company: params.row.log_company})
                    }
                  }
                })
              ])
            }
          }
          // {
          //   title: '操作',
          //   align: 'center',
          //   tooltip: true,
          //   render: (h, params) => {
          //     return h('div', [
          //       h('Button', {
          //         props: {
          //           size: 'default',
          //           type: 'primary'
          //         },
          //         on: {
          //           click: () => {
          //           }
          //         }
          //       }, '审核保存')
          //     ])
          //   }
          // }
        ], // 物流
        sendData2: [{}],
        bottomPageList: [
          {
            title: '特价商品',
            icon: 'ios-bookmark',
            tableTitle: [
              {
                title: '品牌代码',
                align: 'center',
                tooltip: true,
                key: 'brand'
              }, {
                title: '商品名称',
                align: 'center',
                tooltip: true,
                key: 'good_name'
              }, {
                title: '等级',
                align: 'center',
                tooltip: true,
                key: 'spec'
              }, {
                title: '规格',
                align: 'center',
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
                  return h('div', [
                    h('span', str)
                  ])
                }
              }, {
                title: '预付数量',
                align: 'center',
                tooltip: true,
                key: 'count'
              }, {
                title: '结算数量',
                align: 'center',
                tooltip: true,
                render: (h, params) => {
                  let editor = this.pageBaseObject.order_lock === '1'
                  return h('div', [
                    h('Input', {
                      props: {
                        size: 'large',
                        value: params.row.true_count,
                        disabled: !editor
                      },
                      on: {
                        input: (v) => {
                          v = Number(v)
                          params.row.true_count = v
                        },
                        'on-blur': () => {
                          let query = {
                            id: params.row.id,
                            true_count: params.row.true_count
                          }
                          this.updateShopMsg(query)
                        }
                      }
                    })
                  ])
                }
              }, {
                title: '上海参考',
                align: 'center',
                tooltip: true,
                key: 'good_price'
              }, {
                title: '昆明参考',
                align: 'center',
                tooltip: true,
                key: 'km_good_price'
              }, {
                title: '昆明结算',
                align: 'center',
                tooltip: true,
                key: 'true_km_price'
              }, {
                title: '上海结算',
                align: 'center',
                tooltip: true,
                render: (h, params) => {
                  let editor = this.pageBaseObject.order_lock === '1'
                  return h('div', [
                    h('Input', {
                      props: {
                        size: 'large',
                        value: params.row.true_good_price,
                        disabled: !editor
                      },
                      on: {
                        input: (v) => {
                          v = Number(v)
                          params.row.true_good_price = v
                        },
                        'on-blur': () => {
                          let query = {
                            id: params.row.id,
                            true_good_price: params.row.true_good_price
                          }
                          this.updateShopMsg(query)
                        }
                      }
                    })
                  ])
                }
              }
            ],
            data: []
          }, {
            title: '热销商品',
            icon: 'ios-bookmark',
            tableTitle: [
              {
                title: '品牌代码',
                align: 'center',
                tooltip: true,
                key: 'brand'
              }, {
                title: '商品名称',
                align: 'center',
                tooltip: true,
                key: 'good_name'
              }, {
                title: '等级',
                align: 'center',
                tooltip: true,
                key: 'spec'
              }, {
                title: '规格',
                align: 'center',
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
                  return h('div', [
                    h('span', str)
                  ])
                }
              }, {
                title: '预付数量',
                align: 'center',
                tooltip: true,
                key: 'count'
              }, {
                title: '结算数量',
                align: 'center',
                tooltip: true,
                render: (h, params) => {
                  let editor = this.pageBaseObject.order_lock === '1'
                  return h('div', [
                    h('Input', {
                      props: {
                        size: 'large',
                        value: params.row.true_count,
                        disabled: !editor
                      },
                      on: {
                        input: (v) => {
                          v = Number(v)
                          params.row.true_count = v
                        },
                        'on-blur': () => {
                          let query = {
                            id: params.row.id,
                            true_count: params.row.true_count
                          }
                          this.updateShopMsg(query)
                        }
                      }
                    })
                  ])
                }
              }, {
                title: '上海参考',
                align: 'center',
                tooltip: true,
                key: 'good_price'
              }, {
                title: '昆明参考',
                align: 'center',
                tooltip: true,
                key: 'km_good_price'
              }, {
                title: '昆明结算',
                align: 'center',
                tooltip: true,
                key: 'true_km_price'
              }, {
                title: '上海结算',
                align: 'center',
                tooltip: true,
                render: (h, params) => {
                  let editor = this.pageBaseObject.order_lock === '1'
                  return h('div', [
                    h('Input', {
                      props: {
                        size: 'large',
                        value: params.row.true_good_price,
                        disabled: !editor
                      },
                      on: {
                        input: (v) => {
                          v = Number(v)
                          params.row.true_good_price = v
                        },
                        'on-blur': () => {
                          let query = {
                            id: params.row.id,
                            true_good_price: params.row.true_good_price
                          }
                          this.updateShopMsg(query)
                        }
                      }
                    })
                  ])
                }
              }
            ],
            data: []
          }, {
            title: '团购包邮',
            icon: 'ios-bookmark',
            tableTitle: [
              {
                title: '品牌代码',
                align: 'center',
                tooltip: true,
                key: 'brand'
              }, {
                title: '商品名称',
                align: 'center',
                tooltip: true,
                key: 'good_name'
              }, {
                title: '等级',
                align: 'center',
                tooltip: true,
                key: 'spec'
              }, {
                title: '规格',
                align: 'center',
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
                  return h('div', [
                    h('span', str)
                  ])
                }
              }, {
                title: '预付数量',
                align: 'center',
                tooltip: true,
                key: 'count'
              }, {
                title: '结算数量',
                align: 'center',
                tooltip: true,
                render: (h, params) => {
                  let editor = this.pageBaseObject.order_lock === '1'
                  return h('div', [
                    h('Input', {
                      props: {
                        size: 'large',
                        value: params.row.true_count,
                        disabled: !editor
                      },
                      on: {
                        input: (v) => {
                          v = Number(v)
                          params.row.true_count = v
                        },
                        'on-blur': () => {
                          let query = {
                            id: params.row.id,
                            true_count: params.row.true_count
                          }
                          this.updateShopMsg(query)
                        }
                      }
                    })
                  ])
                }
              }, {
                title: '上海参考',
                align: 'center',
                tooltip: true,
                key: 'good_price'
              }, {
                title: '昆明参考',
                align: 'center',
                tooltip: true,
                key: 'km_good_price'
              }, {
                title: '昆明结算',
                align: 'center',
                tooltip: true,
                key: 'true_km_price'
              }, {
                title: '上海结算',
                align: 'center',
                tooltip: true,
                render: (h, params) => {
                  let editor = this.pageBaseObject.order_lock === '1'
                  return h('div', [
                    h('Input', {
                      props: {
                        size: 'large',
                        value: params.row.true_good_price,
                        disabled: !editor
                      },
                      on: {
                        input: (v) => {
                          v = Number(v)
                          params.row.true_good_price = v
                        },
                        'on-blur': () => {
                          let query = {
                            id: params.row.id,
                            true_good_price: params.row.true_good_price
                          }
                          this.updateShopMsg(query)
                        }
                      }
                    })
                  ])
                }
              }
            ],
            data: []
          }, {
            title: '新品推荐',
            icon: 'ios-bookmark',
            tableTitle: [
              {
                title: '品牌代码',
                align: 'center',
                tooltip: true,
                key: 'brand'
              }, {
                title: '商品名称',
                align: 'center',
                tooltip: true,
                key: 'good_name'
              }, {
                title: '等级',
                align: 'center',
                tooltip: true,
                key: 'spec'
              }, {
                title: '规格',
                align: 'center',
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
                  return h('div', [
                    h('span', str)
                  ])
                }
              }, {
                title: '预付数量',
                align: 'center',
                tooltip: true,
                key: 'count'
              }, {
                title: '结算数量',
                align: 'center',
                tooltip: true,
                render: (h, params) => {
                  let editor = this.pageBaseObject.order_lock === '1'
                  return h('div', [
                    h('Input', {
                      props: {
                        size: 'large',
                        value: params.row.true_count,
                        disabled: !editor
                      },
                      on: {
                        input: (v) => {
                          v = Number(v)
                          params.row.true_count = v
                        },
                        'on-blur': () => {
                          let query = {
                            id: params.row.id,
                            true_count: params.row.true_count
                          }
                          this.updateShopMsg(query)
                        }
                      }
                    })
                  ])
                }
              }, {
                title: '上海参考',
                align: 'center',
                tooltip: true,
                key: 'good_price'
              }, {
                title: '昆明参考',
                align: 'center',
                tooltip: true,
                key: 'km_good_price'
              }, {
                title: '昆明结算',
                align: 'center',
                tooltip: true,
                key: 'true_km_price'
              }, {
                title: '上海结算',
                align: 'center',
                tooltip: true,
                render: (h, params) => {
                  let editor = this.pageBaseObject.order_lock === '1'
                  return h('div', [
                    h('Input', {
                      props: {
                        size: 'large',
                        value: params.row.true_good_price,
                        disabled: !editor
                      },
                      on: {
                        input: (v) => {
                          v = Number(v)
                          params.row.true_good_price = v
                        },
                        'on-blur': () => {
                          let query = {
                            id: params.row.id,
                            true_good_price: params.row.true_good_price
                          }
                          this.updateShopMsg(query)
                        }
                      }
                    })
                  ])
                }
              }
            ],
            data: []
          }
        ],
        id: null,
        computedTitle: [
          {
            title: '花材总重量',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '上海总参考价',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '上海总结算价',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '上海差价',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '物流预算',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '物流结算',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '物流差价',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '总差价',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }, {
            title: '总金金额',
            align: 'center',
            tooltip: true,
            key: 'nick_name'
          }
        ], // 汇总
        computedData: [],
        defaultList: [
          // {
          //   'name': 'a42bdcc1178e62b4694c830f028db5c0',
          //   'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
          // }
        ],
        imgName: '',
        visible: false,
        uploadList: []
      }
    },
    created () {
      let id = this.$route.params.id
      this.id = id
      this.$nextTick(() => {
        this.initPage()
      })
    },
    computed: {
      sendTypeList () {
        return this.$util.mapToArray(this.systemMap.send_type)
      },
      payStatus () {
        if (this.pageBaseObject) {
          return this.$util.getNameByStatus(this.pageBaseObject.pay_status, 'pay_status', this.systemMap)
        }
        return '-'
      }
    },
    watch: {},
    methods: {
      initPage () {
        this.getOrderDetailMsg()
      },
      async updSendTypeHandler () {
        let query = {
          id: this.id,
          send_type: this.sendType
        }
        let {code} = await this.$http.updSendType(query)
        if (code === 0) {
          this.$Message.success({
            content: '修改物流方式成功！'
          })
        }
      },
      async getOrderDetailMsg () {
        let query = {
          id: this.id
        }
        let {data} = await this.$http.getOrderList(query)
        this.pageBaseObject = data // 保存最初信息
        this.computedMethod = data.diff_good_price || ''
        // 基本信息组装
        let base = {
          nick_name: data.user.nick_name,
          order_sn: data.order_sn,
          created_at_str: this.$util.getDateByTimestamp(data.created_at),
          pay_at_str: this.$util.getDateByTimestamp(data.pay_at),
          send_at_str: this.$util.getDateByTimestamp(data.send_at)
        }
        // 物流方式
        let sendType = data.send_type
        this.sendType = sendType
        let consigeeMsg = [data.order_address] // 收货人
        this.consigneeData = consigeeMsg
        let baseArr = [base]
        // let otheArr = [...data.] 信任之选 // TODO 不晓得取哪个字段。
        let o = data.order_freight
        // 处理物流信息 默认为0方便计算
        let sendMsg = {
          pack_price: o.pack_price || 0,
          true_pack_price: o.true_pack_price || 0,
          warm_price: o.warm_price || 0,
          true_warm_price: o.true_warm_price || 0,
          fre_price: o.fre_price || 0,
          true_fre_price: o.true_fre_price || 0,
          diff_fre_price: data.diff_fre_price
        }
        sendMsg.allPrice = this.$util.add([sendMsg.pack_price, sendMsg.warm_price, sendMsg.fre_price])
        sendMsg.allTruePrice = this.$util.add([sendMsg.true_pack_price, sendMsg.true_warm_price, sendMsg.true_fre_price])
        this.sendData = [sendMsg]
        this.pageList1[0].data = baseArr
        // 处理分练人
        let sendMsg2 = {
          sorting: o.sorting,
          log_agent: o.log_agent,
          log_agent_phone: o.log_agent_phone,
          log_code: o.log_code,
          log_company: o.log_company
        }
        this.sendData2 = [sendMsg2]
        // 按页面顺序取值 type  2143 = 特热团新
        let speObj = data.order_detail.find(item => item.type === '2') || null
        let hotObj = data.order_detail.find(item => item.type === '1') || null
        let tamObj = data.order_detail.find(item => item.type === '4') || null
        let newObj = data.order_detail.find(item => item.type === '3') || null
        let sepList = (speObj && speObj.good_list) ? speObj.good_list : []
        let hotList = (hotObj && hotObj.good_list) ? hotObj.good_list : []
        let tamList = (tamObj && tamObj.good_list) ? tamObj.good_list : []
        let newList = (newObj && newObj.good_list) ? newObj.good_list : []
        this.bottomPageList[0].data = sepList
        this.bottomPageList[1].data = hotList
        this.bottomPageList[2].data = tamList
        this.bottomPageList[3].data = newList
      },
      updateList () {
        this.$nextTick(() => this.getOrderDetailMsg())
      },
      async updDesHandler () {
        let query = {
          id: this.id,
          des: this.pageBaseObject.des
        }
        let {code} = await this.$http.updOrderDesc(query)
        if (code === 0) {
          this.$Message.success({
            content: '修改内部备注成功！'
          })
        }
      },
      preOrder () {
        this.id = this.pageBaseObject.pre_id
        this.$router.replace({
          name: 'orderDetail',
          params: {
            id: this.pageBaseObject.pre_id
          }
        })
        this.updateList()
      },
      nextOrder () {
        this.id = this.pageBaseObject.next_id
        this.$router.push({
          name: 'orderDetail',
          params: {
            id: this.pageBaseObject.next_id
          }
        })
        this.updateList()
      },
      detailExport () {
        window.location.href = `https://bbshua.com/order-detail-export?order_sn=${this.pageBaseObject.order_sn}`
      },
      freExport () {
        window.location.href = `https://bbshua.com/order-fre-export?order_sn=${this.pageBaseObject.order_sn}`
      },
      hasPage (pageKey) {
        if (this.pageBaseObject === null) return false
        let id = this.pageBaseObject[pageKey]
        return this.$util.isNull(id)
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
      async updatePrice (query) {
        query.order_id = this.id
        let {code} = await this.$http.updatePrice(query)
        if (code === 0) {
          this.$Message.success({
            content: '修改成功！'
          })
          this.updateList()
        }
      },
      async updateAllPrice () {
        let query = {
          order_id: this.id,
          true_pack_price: this.sendData[0].true_pack_price,
          true_warm_price: this.sendData[0].true_warm_price,
          true_fre_price: this.sendData[0].true_fre_price,
          diff_fre_price: this.sendData[0].allTruePrice
        }
        let {code} = await this.$http.updateAllPrice(query)
        if (code === 0) {
          this.$Message.success({
            content: '保存成功！'
          })
          this.updateList()
        }
      },
      async updateSendMsg (query) {
        query.order_id = this.id
        let {code} = await this.$http.updateSendMsg(query)
        if (code === 0) {
          this.$Message.success({
            content: '修改成功！'
          })
          this.updateList()
        }
      },
      async updateShopMsg (query) {
        let {code} = await this.$http.updateShopInOrderDetail(query)
        if (code === 0) {
          this.$Message.success({
            content: '修改成功！'
          })
          this.updateList()
        }
      },
      async saveDiffPrice () {
        // let query = {
        //   order_id: this.id
        // }
        // let {code} = await this.$http.updateShopInOrderDetail(query)
        // if (code === 0) {
        //   this.$Message.success({
        //     content: '保存差价成功！'
        //   })
        //   this.updateList()
        // }
      },
      async createDiffPrice () {
        let query = {order_id: this.id}
        let {code} = await this.$http.createDiffPrice(query)
        if (code === 0) {
          this.$Message.success({
            content: '保存成功！'
          })
          this.updateList()
        }
      },
      canEditor () {
        if (this.pageBaseObject) {
          return this.pageBaseObject.order_lock !== '1'
        }
        return false
      },
      async saveAddress (query) {
        let {code} = await this.$http.saveAddress(query)
        if (code === 0) {
          this.$Message.success({
            content: '修改成功'
          })
          this.updateList()
        }
      },
      async lockOrder (status) {
        let query = {
          order_id: this.id
        }
        let {code} = await this.$http.lockOrder(query)
        if (code === 0) {
          this.$Message.success({
            content: status === 1 ? '审核保存成功！' : '解锁成功！'
          })
          this.updateList()
        }
      },
      sureSend () {
        // 发送快递
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要发货吗?</p>',
          onOk: async () => {
            let {code} = await this.$http.sendOrder({
              id: this.$route.params.id
            })
            if (code === 0) {
              this.$Message.success({
                content: '发货成功！'
              })
              this.updateList()
            } else {
              this.$Message.error({
                content: '发货失败！'
              })
            }
          },
          onCancel: () => {
            this.$Message.info('您已取消发货！')
          }
        })
      },
      printOne () {
        // 电子面单打印
        this.$router.push({
          name: 'printOne',
          params: {id: this.id}
        })
      },
      printTwo () {
        // 理货单打印
        this.$router.push({
          name: 'printTwo',
          params: {id: this.$route.params.id}
        })
      },
      printThree () {
        // 装箱单打印
        this.$router.push({
          name: 'printThree',
          params: {id: this.$route.params.id}
        })
      },
      printFour () {
        // 订单详情打印
        this.$router.push({
          name: 'printFour',
          params: {id: this.$route.params.id}
        })
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList
    }
  }
</script>

<style lang="less" scoped type="text/css">
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
