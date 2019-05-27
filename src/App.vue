<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {getMess } from "./api/login";
  import {mapMutations} from 'vuex'

  export default {
  name: 'App',
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['CHANGE_NAME','CHANGE_LEVEL']),
    getUserInfo() {
        getMess().then(res=>{
          if(res.code === 200){
            console.log('得到钉钉上的信息',res);
            if(res.data.is_sys == true){
              this.CHANGE_LEVEL(0)
              this.CHANGE_NAME(res.data.user_info.name)
            }

          }
        })
      },


  },
  created() {
    this.getUserInfo()
  }
}
</script>
