// import AuthBtn from '@vue/btn-auth/render-btn-auth'

export default {
  components: {},
  data () {
    return {
      pages: {
        pageSize: 20,
        pageNum: 1,
        total: 0
      },
      pages2: {
        pageSize: 20,
        pageNum: 1,
        total: 0
      },
      pages3: {
        pageSize: 20,
        pageNum: 1,
        total: 0
      }
    }
  },
  methods: {
    initPageData () {
      this.pages = {
        pageSize: 20,
        pageNum: 1,
        total: 0
      }
    },
    initPageData2 () {
      this.pages2 = {
        pageSize: 20,
        pageNum: 1,
        total: 0
      }
    },
    initPageData3 () {
      this.pages3 = {
        pageSize: 20,
        pageNum: 1,
        total: 0
      }
    }
  },
  created () {
  },
  computed: {
    systemMap () {
      return this.$store.getters.systemMap
    }
  }
}
