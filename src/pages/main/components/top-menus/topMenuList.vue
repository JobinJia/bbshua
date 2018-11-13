<template>
  <Menu active-name="order" mode="horizontal" theme="dark">
    <MenuItem :name="item.name" v-for="(item, index) in list" :key="index" @on-select="handleSelect">
      {{item.meta.title}}
    </MenuItem>
  </Menu>
</template>

<script>
  import Mixin from '@/pages/main/components/side-menu/mixin.js'
  import SideMenuItem from '@/pages/main/components/side-menu/side-menu-item.vue'

  export default {
    name: 'topMenuList',
    mixins: [Mixin],
    components: {
      SideMenuItem
    },
    props: {
      list: {
        type: Array,
        default: () => {
          return []
        },
        required: true
      },
      activeName: String
    },
    methods: {
      handleSelect (name) {
        debugger
        this.$emit('on-select', name)
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
    justify-content: flex-start;
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
