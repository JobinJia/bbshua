<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <!--<Avatar :src="userAvator"/>-->
      <a href="javascript:;">{{userInfo.name}}</a>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
  import './user.less'
  import {mapActions} from 'vuex'
  // import Cookies from 'js-cookie'

  export default {
    name: 'User',
    props: {
      userAvator: {
        type: String,
        default: ''
      },
      userInfo: {
        type: Object,
        default: () => {}
      }
    },
    methods: {
      ...mapActions([
        'handleLogOut'
      ]),
      handleClick (name) {
        switch (name) {
          case 'logout':
            this.handleLogOut().then(() => {
              this.$router.push({
                name: 'login'
              })
            })
            break
          default:
            break
        }
      }
    }
  }
</script>
