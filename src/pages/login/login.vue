<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="div" style="width:100%;height:100%;position:relative;">
    <div class="panel_state">
      <div class="w">
        <img id="u29_img" class="img " src="~@/assets/app/logo.png">
        <div id="u3" class="text">
          <p style="font-size:36px;">
            <span
              style="font-family:'微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';font-weight:700;font-size:48px;">集采后台业务管理系统</span>
            <span style="font-family:'微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';font-weight:700;"> </span>
          </p>
          <p style="font-size:36px;">
            <span style="font-family:'微软雅黑';font-weight:400;">Business Management System</span>
          </p>
        </div>
        <!-- 表单部分 -->
        <!--<el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">-->
          <!--<div style="position:relative;top:170px;left:220px;width: 700px;height:100px;">-->
            <!--<div class="u13_div">-->
              <!--<img class="img " src="~@/assets/app/u18.png">-->
              <!--&lt;!&ndash;<el-input v-model="ruleForm2.name" placeholder="请输入用户名称"&ndash;&gt;-->
                        <!--&lt;!&ndash;@keyup.enter.native="handleSubmit('ruleForm2')"></el-input>&ndash;&gt;-->
            <!--</div>-->
            <!--<div class="u13_div password">-->
              <!--<img width="19" class="img " src="~@/assets/app/u20.png">-->
              <!--&lt;!&ndash;<el-input type="password" v-model="ruleForm2.password" auto-complete="off"&ndash;&gt;-->
                        <!--&lt;!&ndash;placeholder="请输入登录密码" @keyup.enter.native="submitForm('ruleForm2')"></el-input>&ndash;&gt;-->
            <!--</div>-->
            <!--<a href="javascript:;" @click="handleSubmit('ruleForm2')">-->
              <!--<img src="~@/assets/app/login.png" width="49" height="49"-->
                   <!--style="position:absolute;top:2px;right:20px;"/>-->
            <!--</a>-->
          <!--</div>-->
        <!--</el-form>-->
      </div>
    </div>
  </div>
  <!--<div class="login">-->
  <!--<div class="login-con">-->
  <!--<Card icon="log-in" :bordered="false">-->
  <!--<div class="form-con">-->
  <!--<login-form @on-success-valid="handleSubmit"></login-form>-->
  <!--<p class="login-tip">输入用户名和密码</p>-->
  <!--</div>-->
  <!--</Card>-->
  <!--</div>-->
  <!--</div>-->
</template>

<script>
  import LoginForm from '@/common/vue/login-form'
  import {mapActions} from 'vuex'
  import {setToken} from '../../common/js/util'

  export default {
    data () {
      return {
        ruleForm2: {
          name: '',
          password: ''
        }
      }
    },
    components: {
      LoginForm
    },
    methods: {
      ...mapActions([
        'handleLogin',
        'initMenus',
        'updateTopMenuList',
        'updateLeftMenuList',
        'updateSystemStatusList'
      ]),
      handleSubmit ({userName, password}) {
        setToken('123')
        this.updateTopMenuList([])
        this.$http.getSystemStatus().then(res => {
          console.log(res)
          let {data} = res
          this.updateSystemStatusList(data)
        })
        this.$router.push({
          name: '_home'
        })
        // this.handleLogin({userName, password}).then(res => {
        //   this.updateTopMenuList(res, true)
        //   this.$router.push({
        //     name: 'home'
        //   })
        // })
      }
    },
    computed: {
      topMenuList () {
        return this.$store.state.app.topMenuList
      }
    },
    created () {
    },
    mounted () {
      setToken('123')
      this.initMenus()
      this.$http.getSystemStatus().then(res => {
        let {data} = res
        this.updateSystemStatusList(data)
        this.$router.push({
          name: 'spe'
        })
      })
    }
  }
</script>

<style scoped lang="less">
  .div {
    background: url("http://cdn.huashijituan.net/u0_state0.jpg");
    background-size: cover;
  }

  .panel_state {
    height: 300px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.498039215686275);
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  #u29_img {
    width: 100px;
    height: 100px;
    margin: 47px 16px 0 100px;
    float: left;
  }

  #u3 {
    float: left;
    margin: 49px 0 25px 0;
    font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
    font-style: normal;
    color: #ffffff;
    text-align: left;
    line-height: 48px;
  }

  .u13_div {
    width: 300px;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    background: #fff;
    position: absolute;
    .el-input {
      border: 0;
      position: relative;
      top: -19px;
      left: -3px;
      height: 50px;
      width: 215px;
      color: rgb(204, 204, 204);
      font-size: 14px;
    }
  }

  .password {
    top: 0;
    left: 317px;
  }

  #u18_img {
    // width: 24px;
    height: 24px;
    margin: 13px;
  }
</style>
