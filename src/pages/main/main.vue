<template>
  <Layout style="height: 100%" class="main">
    <Sider hide-trigger collapsible :width="230" :collapsed-width="64" v-model="collapsed"
           style="overflow: hidden;position: relative;z-index: 999;">
      <side-menu ref="side_menu" accordion :active-name="activeName" :collapsed="collapsed" @on-select="turnToPage"
                 :menu-list="menuList">
        <div class="logo-con">
          <img src="~@/assets/app/top.png" width="40" height="40"/>
          <p class="app-title">集采</p>
        </div>
      </side-menu>
    </Sider>
    <Layout style="margin-top: 64px;min-width: 1024px;">
      <Content>
        <custom-bread-crumb show-icon :list="breadCrumbList"></custom-bread-crumb>
        <Layout>
          <Content class="content-wrapper">
            <!--<keep-alive> &lt;!&ndash;  :include="cacheList" &ndash;&gt;-->
              <router-view/>
            <!--</keep-alive>-->
          </Content>
        </Layout>
        <div class="footer">
          {{copyRight}}
        </div>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
  import SideMenu from './components/side-menu'
  // import HeaderBar from './components/header-bar'
  import User from './components/user'
  // import TopMenu from './components/top-menus'
  import customBreadCrumb from '../main/components/header-bar/custom-bread-crumb/custom-bread-crumb'
  import {mapMutations, mapActions} from 'vuex'
  import './main.less'

  export default {
    name: 'Main',
    components: {
      SideMenu,
      // HeaderBar,
      // TopMenu,
      User,
      customBreadCrumb
    },
    created () {
      // this.userInfo = this._$.getUserInfo()
    },
    data () {
      return {
        collapsed: false,
        isFullscreen: false,
        userInfo: null,
        activeName: null
      }
    },
    computed: {
      menuList () {
        return this.$store.getters.menuList
      },
      topMenuList () {
        return this.$store.state.app.topMenuList
      },
      breadCrumbList () {
        return this.$store.state.app.breadCrumbList
      },
      copyRight () {
        return this.$store.state.app.copyRight
      },
      key () {
        return new Date().getTime()
      }
    },
    methods: {
      ...mapMutations([
        'setTopMenuList',
        'setLeftMenuList'
      ]),
      ...mapActions([
        'handleLogin',
        'updateLeftMenuList',
        'toggleClickHandlerTopMenuList'
      ]),
      turnToPage (route) {
        let {name, params, query} = {}
        if (typeof route === 'string') {
          name = route
        } else {
          name = route.name
          params = route.params
          query = route.query
        }
        if (name.indexOf('isTurnByHref_') > -1) {
          window.open(name.split('_')[1])
          return
        }
        this.$router.push({
          name,
          params,
          query
        })
      },
      handleCollapsedChange (state) {
        this.collapsed = state
      },
      handleClick (item) {
        this.turnToPage(item.name)
      },
      async toggleTopMenu (route) {
        let stashTopMenu = this.$store.state.app.topMenuList
        stashTopMenu.forEach(item => {
          if (item.name === route.name) {
            item.checked = true
          } else {
            item.checked = false
          }
        })
        this.toggleClickHandlerTopMenuList(stashTopMenu)
        this.updateLeftMenuList(stashTopMenu)
        let leftMenus = this.menuList
        let name = leftMenus[0].children[0].name
        this.$nextTick(() => {
          this.$refs.side_menu.updateOpened(name)
          this.activeName = name
          this.$router.push({
            name
          })
        })
      }
    },
    watch: {
      '$route' (cur) {
        this.$nextTick(() => {
          this.activeName = cur.name
          this.$refs.side_menu.updateOpened(cur.name)
        })
      }
    },
    mounted () {
      /**
       * @description 初始化设置面包屑导航和标签导航
       */
      this.setTopMenuList()
      // this.updateLeftMenuList()
      this.$nextTick(() => {
        this.activeName = this.$route.name
      })
    }
  }
</script>

<style type="text/css" lang="less">
  .sys-copyright {
    width: 200px;
    position: fixed;
    left: 0;
    bottom: 0;
    color: rgba(255, 255, 255, .7);
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    line-height: 50px;
    z-index: 99999;
    background: #fff;
    font-size: 15px;
    text-align: center;
    text-indent: -15%;
    color: rgb(107, 107, 107);
    border-top: 1px solid #e8eaec;
  }
</style>
