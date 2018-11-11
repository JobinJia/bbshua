<template>
  <!-- 表单部分 -->
  <!-- <Form :model="ruleForm2" status-icon ref="ruleForm2" :label-width="100" class="demo-ruleForm">
     <div style="position:relative;top:170px;left:220px;width: 700px;height:100px;">
       <div class="u13_div">
         <Input v-model="ruleForm2.name" placeholder="请输入用户名称"
                @keyup.enter.native="submitForm('ruleForm2')"></Input>
       </div>
       <div class="u13_div password">
         <img width="19" class="img " src="~@/assets/app/u20.png">
         <Input typee="password" v-model="ruleForm2.password" auto-complete="off"
                placeholder="请输入登录密码" @keyup.enter.native="submitForm('ruleForm2')"></Input>
       </div>
       <a href="javascript:;" @click="submitForm('ruleForm2')">
         <img src="~@/assets/app/login.png" width="49" height="49"
              style="position:absolute;top:2px;right:20px;"/>
       </a>
     </div>
   </Form>-->

  <Form ref="loginForm" class="demo-ruleForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <img class="img " src="~@/assets/app/u18.png">
      <Input v-model="form.userName" placeholder="请输入用户名称">
      </Input>
    </FormItem>
    <FormItem prop="password">
      <img width="19" class="img " src="~@/assets/app/u20.png">
      <Input type="password" v-model="form.password" placeholder="请输入登录密码">
      </Input>
    </FormItem>
    <FormItem>
      <!--<Button @click="handleSubmit" type="primary" long>登录</Button>-->
      <a href="javascript:;" @click="handleSubmit">
        <img src="~@/assets/app/login.png" width="49" height="49"
             style="position:absolute;top:2px;right:20px;"/>
      </a>
    </FormItem>
  </Form>
</template>
<script>
  export default {
    name: 'LoginForm',
    props: {
      userNameRules: {
        type: Array,
        default: () => {
          return [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ]
        }
      },
      passwordRules: {
        type: Array,
        default: () => {
          return [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    data () {
      return {
        form: {
          userName: '',
          // userName: '13000000000',
          // password: '000000'
          password: ''
        }
      }
    },
    computed: {
      rules () {
        return {
          userName: this.userNameRules,
          password: this.passwordRules
        }
      }
    },
    methods: {
      handleSubmit () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$emit('on-success-valid', {
              userName: this.form.userName,
              password: this.form.password
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
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
