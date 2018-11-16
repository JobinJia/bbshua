<template>
  <div>
    <Modal title="商品预览" v-model="visible" @on-cancel="cancel" @on-ok="cancel">
      <!--<img :src="viewSrc" v-if="visible" style="width: 100%">-->
      <Card dis-hover style="padding: 30px;" :bordered="false">
        <a href="javascript:;" style="position: absolute;left: -10px; top:50%;" @click="last">
          <Icon type="ios-arrow-dropleft" size="50"/>
        </a>
        <div v-for="(item, index) in imgList" :key="index">
          <img v-show="item.current" :src="item.url" style="width: 100%;">
        </div>
        <a href="javascript:;" style="position: absolute;right: -10px; top:50%;" @click="next">
          <Icon type="ios-arrow-dropright" size="50"/>
        </a>
      </Card>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'imageView',
    props: {
      viewSrc: String,
      list: Array
    },
    data () {
      return {
        visible: false,
        imgList: []
      }
    },
    watch: {
      list (cur) {
        if (cur) {
          let arr = cur.map((it, i) => {
            return {
              current: i === 0,
              url: it
            }
          })
          console.log(arr)
          this.imgList = arr
        }
      }
    },
    methods: {
      cancel () {
        this.visible = false
      },
      ok () {
        this.cancel()
      },
      show () {
        this.visible = true
      },
      last () {
        let cur = this.imgList.find(it => it.current)
        let idx = this.imgList.indexOf(cur)
        // let len = this.imgList.length
        if ((idx !== -1) && (idx - 1) >= 0) {
          this.imgList[idx].current = false
          this.imgList[idx - 1].current = true
        }
      },
      next () {
        let cur = this.imgList.find(it => it.current)
        let idx = this.imgList.indexOf(cur)
        let len = this.imgList.length
        if ((idx !== -1) && (idx + 1) < len) {
          this.imgList[idx].current = false
          this.imgList[idx + 1].current = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
