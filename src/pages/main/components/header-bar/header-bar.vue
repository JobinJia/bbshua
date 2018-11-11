<template>
  <div class="header-bar">
    <!--<sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger>-->
    <!--<custom-bread-crumb show-icon :list="breadCrumbList"></custom-bread-crumb> &lt;!&ndash; style="margin-left: 30px;" &ndash;&gt;-->
    <div class="custom-top-con">
      <slot name="topMenu"></slot>
    </div>
    <!--<div class="custom-content-con">-->
      <!--<div class="user-msg">-->
        <!--&lt;!&ndash;<a href="javascript:;">Jobin.jia</a>&ndash;&gt;-->
        <!--<slot name="userMsg"></slot>-->
      <!--</div>-->
      <!--<slot name="other"></slot>-->
    <!--</div>-->
  </div>
</template>
<script>
// import siderTrigger from './sider-trigger'
import './header-bar.less'
export default {
  name: 'HeaderBar',
  components: {
    // siderTrigger,
  },
  props: {
    collapsed: Boolean
  },
  computed: {
    breadCrumbList () {
      return this.$store.state.app.breadCrumbList
    }
  },
  methods: {
    handleCollpasedChange (state) {
      this.$emit('on-coll-change', state)
    }
  }
}
</script>
