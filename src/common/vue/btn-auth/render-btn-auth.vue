<template>
  <div v-if="btn !== null" class="auth-btn">
    <Button :type="btn.type" :size="btn.size" v-auth :data-id="btn.auth">{{btn.title}}</Button>
  </div>
</template>

<script>
  export default {
    name: 'render-btn-auth',
    props: {
      btn: {
        type: Object,
        default () {
          return {
            type: '',
            size: '',
            auth: '',
            title: ''
          }
        }
      }
    },
    methods: {
      clickHandler () {
        this.$emit('on-click')
      }
    }
  }
</script>

<style scoped type="text/css" lang="less">
  .auth-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    & > * {
    }
  }
</style>
