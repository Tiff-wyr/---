<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">报修后台管理系统</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.phone" name="phone" type="text" auto-complete="on" placeholder="phone" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          登       录
        </el-button>
      </el-form-item>
      <div @click="forgetPass" class="forgetPass">忘记密码</div>

    </el-form>



  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import authRoutes from '@/router/authRoutes'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        phone: '',
        password: ''
      },
      loginRules: {
        phone: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  methods: {
    forgetPass(){
      this.$router.push('/forgetPass')
      console.log('aaaa')
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
            this.$axios.post('/user/adminLogin', this.loginForm)
              .then(res => {
                if(res.code === 200){
                  this.loading = false
                  this.$store.commit('CHANGE_USER_INFO', res.data)
                  this.$router.push('/')
                } else {
                  this.$message.info(res.msg)
                  this.loading = false
                }
              }).catch(err => this.loading = false)


        } else {
          this.$message.info(res.msg)
        }
      })
    },

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $light_gray:#333;

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-image: url("/static/image/loginback.jpg");
    background-size: 100% 100%;
    .login-form {
      position: absolute;
      left: 50%;

      background-color: #eee;
      border-radius: 5px;
      width: 400px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      margin-top: 120px ;
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #333;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: #333;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: #333;
      cursor: pointer;
      user-select: none;
    }
    .forgetPass {
      position: absolute;
      right: 0;
      bottom: -8%;
      color: #ccc;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      &:hover{
        color: #333;
      }
    }
  }
</style>

