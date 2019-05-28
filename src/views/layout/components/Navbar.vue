<template>
  <el-menu class="navbar" mode="horizontal" >
    <hamburger :toggle-click="toggleSideBar" :is-active="true" class="hamburger-container"/>
    <breadcrumb />
    <div>{{$store.state.userInfo.name}}</div>
    <img src="/static/image/logout.png" alt="" class="logout-img" @click="logout">
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import {constantRouterMap} from '@/router'
import {Logout} from '../../../api/login'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      let initUserInfo = {
        name:'',
        avatar: '',
        phone: '',
        sex: '',
        level: ''
      }
      this.$store.commit('CHANGE_USER_INFO', initUserInfo)
      this.$store.commit('CHANGE_ADD_ROUTES', [])
      this.$router.options.routes = constantRouterMap
      Logout().then(res=>{
        console.log(res)
        window.close()
      })

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .logout-img{
    width: 25px;
    height: 25px;
    float: right;
    margin-right: 20px;
    margin-top: 12px;
    cursor: pointer;
  }
.navbar {
  position: relative;
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .nav-title {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 400;
    font-size: 20px;
    margin: 0;
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

