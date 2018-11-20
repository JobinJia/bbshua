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
  mounted () {
    let currentPage = Number(localStorage.getItem('pagination')) || 1
    this.pages.pageNum = currentPage
  },

  beforeUpdate () {
    localStorage.setItem('pagination', this.pages.pageNum)
  },
  beforeDestroy () {
    let cachePage = ['spe', 'new', 'flower', 'team', 'hotFlower']
    this.$router.beforeEach((to, from, next) => {
      if (to.name !== 'newProDetail' && (from.name !== 'newProDetail' || !cachePage.includes(to.name))) {
        localStorage.setItem('lastPage', from.name)
        localStorage.setItem('pagination', '1')
      }
      next()
    })
  },
  computed: {
    systemMap () {
      return this.$store.getters.systemMap
    }
  }
}
