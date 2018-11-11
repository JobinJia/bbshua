<template>
  <div>
    <Modal>
      <p slot="title">请填写信息</p>
      <div slot="footer">
        <Button type="primary" size="default" ghost>取消</Button>
        <Button type="primary" size="default">确认</Button>
      </div>
      <div>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'editor',
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
