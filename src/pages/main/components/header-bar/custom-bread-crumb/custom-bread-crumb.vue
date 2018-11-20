<style scoped lang="less">
  .bread {
    padding-left: 20px;
    &::before {
      content: "";
      display: inline-block;
      width: 5px;
      height: 20px;
      background: #19be6b;
      position: relative;
      left: -5px;
      top: 4px;
    }
  }
</style>
<template>
  <div class="custom-bread-crumb"
       style="width: 100%;height: 50px;line-height: 50px;background: #f3f3f3;position: fixed; z-index: 99;">
    <Breadcrumb :style="{fontSize: `${fontSize}px`}">
      <BreadcrumbItem>
        <div class="bread">{{showTitle()}}</div>
      </BreadcrumbItem>
      <!--<BreadcrumbItem v-for="(item, index) in list" :key="`bread-crumb-${item.name}-${index}`"> &lt;!&ndash; :to="item.to" &ndash;&gt;-->
      <!--<common-icon style="margin-right: 4px;" :type="item.icon || ''"/>-->
      <!--{{ showTitle(item) }}-->
      <!--</BreadcrumbItem>-->
    </Breadcrumb>
  </div>
</template>
<script>
  import CommonIcon from '@/common/vue/common-icon'
  import './custom-bread-crumb.less'

  export default {
    name: 'customBreadCrumb',
    components: {
      CommonIcon
    },
    props: {
      list: {
        type: Array,
        default: () => []
      },
      fontSize: {
        type: Number,
        default: 14
      },
      showIcon: {
        type: Boolean,
        default: false
      }
    },
    watch: {},
    methods: {
      showTitle () {
        // return showTitle(item, this)
        let item = this.$route
        return (item.query.title) ? item.query.title : (item && item.meta && item.meta.title) ? item.meta.title : ''
      },
      getCurrentItem () {
        return this.list[this.list.length - 1]
      },
      isCustomIcon (iconName) {
        return iconName.indexOf('_') === 0
      },
      getCustomIconName (iconName) {
        return iconName.slice(1)
      }
    }
  }
</script>
