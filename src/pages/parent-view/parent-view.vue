<template>
  <Layout>
    <Header class="header-con">
      <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange" :active-name="$router.name">
        <top-menu :list="topMenuList"  @on-select="toggleTopMenu" slot="topMenu"></top-menu>
      </header-bar>
    </Header>
    <Layout>
      <Content>
        <router-view/>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
  import {mapMutations, mapActions} from 'vuex'
  import HeaderBar from '../main/components/header-bar'
  import TopMenu from '../main/components/top-menus'
  export default {
    name: 'ParentView',
    components: {
      HeaderBar,
      TopMenu
    },
    data () {
      return {
        collapsed: false
      }
    },
    computed: {
      topMenuList () {
        return this.$store.state.app.topMenuList
      }
    },
    created () {
    },
    watch: {
      '$router.name' (cur) {
        console.log(cur)
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
      handleCollapsedChange (state) {
        this.collapsed = state
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
    }
  }
</script>
