<template>
  <div class="top-menu">
    <div class="menu-item" :class="item.checked ? 'active' : ''" v-for="(item, index) in list" :key="index"
         @click="toggleTopMenu(item)">
      {{item.meta.title}}
    </div>
  </div>
</template>

<script>
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
    methods: {
      toggleTopMenu (route) {
        this.$emit('on-toggle-top-menu', route)
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
