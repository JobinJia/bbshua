<template>
  <div class="top-menu">
    <div style="display: flex;flex-direction: row;justify-content: flex-start;">
      <div class="menu-item" :class="item.checked ? 'active' : ''" v-for="(item, index) in list" :key="index"
           @click="toggleTopMenu(item)">
        {{item.meta.title}}
      </div>
    </div>
    <div
      style="display: flex;flex-direction: row;justify-content: flex-end;align-items: center;height: 64px;width: 200px;margin-right: 30px;">
      <div class="grid-content bg-purple"
           style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;">
        <b style="margin-top: 20px;"><img src="~@/assets/app/u94.png" id="u94"/><b></b></b>
        <span style="margin-left: 5px;">{{name}}</span>
        <a style="margin-left: 20px;margin-top: 10px;" href="javascript:;" @click="backHome"><img
          src="~@/assets/app/u96.png"/></a>
        <span></span>
        <a style="margin-left: 20px;margin-top: 10px;" href="javascript:;" @click="dialogVisible = true">
          <img src="~@/assets/app/u102.png" id="u102"/>
        </a>
      </div>
    </div>
    <Modal v-model="dialogVisible" @on-ok="loginOut">
      <p slot="header">确认退出?</p>
      <p style="line-height: 50px;">确定要退出登录吗？</p>
    </Modal>
  </div>
</template>

<script>
  import { delToken } from '@/common/js/util'
  export default {
    name: 'topMenuList',
    props: {
      list: {
        type: Array,
        default: () => {
          return []
        },
        required: true
      }
    },
    data () {
      return {
        dialogVisible: false
      }
    },
    computed: {
      name () {
        let str = localStorage.getItem('userName')
        return str
      }
    },
    methods: {
      toggleTopMenu (route) {
        this.$emit('on-toggle-top-menu', route)
      },
      backHome () {
      },
      loginOut () {
        delToken()
        this.$router.push({
          name: 'login'
        })
      }
    },
    mounted () {

    }
  }
</script>

<style scoped type="text/css" lang="less">
  .top-menu {
    height: 64px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-sizing: border-box;
    .menu-item {
      margin-left: 18px;
      font-size: 15px;
      padding: 0 10px;
      cursor: pointer;
    }
    &:last-child {
      margin-right: 20px;
    }
    .active {
      color: rgb(255, 208, 75);
      border-bottom: 2px solid rgb(255, 208, 75);
    }
  }
</style>
