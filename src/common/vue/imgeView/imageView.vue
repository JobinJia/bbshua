<template>
  <div>
    <Modal title="商品预览" v-model="visible" @on-cancel="cancel" @on-ok="cancel">
      <img :src="viewSrc" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'imageView',
    props: {
      visible: Boolean,
      viewSrc: String
    },
    methods: {
      cancel () {
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped>

</style>
