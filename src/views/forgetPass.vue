<template>
    <div class="forgetPass">
      <div class="align">
        <el-card>
          <el-steps :active="step" align-center>
            <el-step title="身份验证"></el-step>
            <el-step title="重置密码"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
          <div v-if="step === 1" class="auto-align">
            <el-input v-model="verify.phone" placeholder="请输入手机号"></el-input>
            <div style="margin: 20px 0 20px 0" class="clearfix">
              <el-input v-model="verify.password" placeholder="请输入验证码" class="fll" style="width: 60%"></el-input>
              <div class="fll">
                <div v-if="isFa" @click="sendCode" class="send">{{sendText}}</div>
                <div v-else class="send">{{time}}s</div>
              </div>

            </div>
            <el-button size="mini" type="primary" @click="handleClick" style="text-align: left">确定</el-button>
          </div>
          <div v-if="step === 2" class="auto-align">
            <p>请设置新密码</p>
            <el-input v-model="fix.password"></el-input>
            <p>请再次输入新密码</p>
            <el-input v-model="fix.conformPassword"></el-input>
            <el-button size="mini" type="primary" @click="handleConform" style="margin-top: 20px;text-align:left;">确定</el-button>
          </div>
          <div v-if="step === 3" class="auto-align tc">
            <el-button type="success" icon="el-icon-check" circle></el-button>
              <p>重置密码成功</p>
            <el-button @click="$router.push('/login')" size="mini" type="success">返回登录页</el-button>
          </div>
        </el-card>
      </div>
    </div>
</template>

<script>
  import {sendCode,checkPhone,conform,setNewPass} from "../api/forgetPassword";

  export default {
      name: "forgetPass",
      data(){
          return {
            step :1,
            verify:{
              phone:'',
              password:''
            },
            isFa:true,
            time:60,
            sendText:"发送验证码",
            fix:{
              password:'',
              conformPassword:''
            }
          }
      },
      methods:{
        sendCode(){
          checkPhone({phone:this.verify.phone}).then(res=>{
            if(res.code === 200){
              this.isFa=false
              sendCode({mobile:this.verify.phone})
              let timer= setInterval(()=>{
                if(this.time > 0){
                  this.time--
                }else{
                  clearInterval(timer)
                  this.isFa=true
                  this.time=60
                  this.sendText="重新发送"
                }
              },1000)

            }else{
              this.isFa=true
              this.time=60
              this.sendText="重新发送"
              this.$message.warning(res.msg)
            }
          })

        },
        handleClick(){
          conform(this.verify).then(res=>{
            if(res.code === 200){
              this.step = 2
            }
          })

        },
        handleConform(){
          setNewPass({phone:this.verify.phone,password:this.fix.conformPassword}).then(res=>{
            if(res.code === 200){
              this.$message.success(res.msg)
              this.step = 3
            }
          })

        }
      }
    }
</script>

<style scoped>
.forgetPass{
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: url("/static/image/forgetPass.jpg");
  background-size: 100% 100%;
}
  .align{
    margin: 100px auto;
    width: 60%;
  }
  .auto-align{
    margin: 50px auto;
    width: 30%;
  }
  .send{
    background-color: #409EFF;
    border-color: #409EFF;
    width: 80px;
    height: 38px;
    line-height: 40px;
    text-align: center;
    font-size: 12px;
    font-weight: lighter;
    color: #fff;
    cursor: pointer;
    margin-left: 8px;
    border-radius: 5px;

  }
</style>
