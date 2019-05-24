<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  methods: {
    getUserInfo() {
      console.log('登录')
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>
