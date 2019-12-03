<template>
  <div class="login">
    <div class="login-div" :style="winHeight">
      <div class="login-title">
        <p>映盛中国</p>
        <p>供应商管理系统</p>
      </div>
      <div class="login-box">
        <div class="login-input">
          <div class="title">登录/注册</div>
          <el-form ref="form" :model="form">
            <!-- 手机号输入框 start -->
            <el-form-item class="phone">
              <el-input
                autocomplete="off"
                clearable
                v-model="form.phone"
                placeholder="手机号"
                prefix-icon="el-icon-mobile"
                @blur="test"
              ></el-input>
              <div class="hint"  v-if=login_but_show>您的手机号已注册请直接登陆</div>
              <div class="hint" v-if=register_but_show>您的手机号未注册请注册后登陆</div>
            </el-form-item>
            <!-- 手机号输入框 end -->

            <!-- 手机验证码输入框 start -->
            <el-form-item class="verification" v-if=smsCodeBox>
              <el-input
                autocomplete="off"
                type="verification"
                v-model="form.smsCode"
                placeholder="验证码"
                prefix-icon="el-icon-message"
              ></el-input>
            </el-form-item>
            <!-- 手机验证码输入框 end -->

            <!-- 获取手机验证码 start -->
            <el-button plain class="getv" @click="getSmsCode" v-if=smsCodeBox :disabled="isDisabled">
              {{buttonName}}
            </el-button>
            <!-- <el-button @click="sendMsg" type="" :disabled="isDisabled">{{buttonName}}</el-button> -->

            <!-- 获取手机验证码 end -->

            <!-- 图片验证码输入框 start -->
            <el-form-item class="img_verification" v-if=getImgCodeBox>
              <el-input
                autocomplete="off"
                type="verification"
                v-model="form.imgCode"
                placeholder="验证码"
                prefix-icon="el-icon-message"
              ></el-input>
            </el-form-item>
            <!-- 图片验证码输入框 end -->

            <!-- 重新获取图形验证码 start -->
            <el-form-item class="get_img_code"  v-if=imgCodeShow>
              <el-button plain @click="getImgCode">
                换一张
              </el-button>
            </el-form-item>
            <!-- 重新获取图形验证码 end -->

            <!-- img验证码 start -->
            <el-form-item class="img_code"  v-if=getImgCodeBox>
              <el-button plain @click="getImgCode" v-if=imgCodeButShow>
              获取验证码
              </el-button>
              <el-table
                v-loading="loading"
                element-loading-text=""
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                v-if=loading
                style="width: 100%;height: 40px">
              </el-table>
              <img width="36%" height="40" :src=imgcode alt="获取验证码" srcset="" v-if=imgCodeShow>
            </el-form-item>
            <!-- img验证码 end -->

            <!-- 选择账号类型 start -->
            <div style="width: 100%;height: 36px;" v-if=register_but_show>
              <el-radio v-model="form.type" label="0">个人</el-radio>
              <el-radio v-model="form.type" label="1">公司</el-radio>
            </div>
            <!-- 选择账号类型 end -->
            
            <!-- 验证按钮 start -->
            <el-form-item class="verify_but" v-if=verify_but_show>
              <el-button type="primary" @click="verify('form')">验证</el-button>
            </el-form-item>
            <!-- 验证按钮 end -->

            <!-- 登陆按钮 start -->
            <el-form-item class="login_but" v-if=login_but_show>
              <el-button type="primary" @click="login('form')">登录</el-button>
            </el-form-item>
            <!-- 登陆按钮 end -->

            <!-- 注册按钮 start -->
            <el-form-item class="register_but" v-if=register_but_show>
              <el-button type="info" @click="register('form')">注册</el-button>
            </el-form-item>
            <!-- 注册按钮 end -->
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import topHeader from '../header.vue'
export default {
  name: 'login',
  components: {
    // topHeader
  },
  data() {
    return {
      imgcode: '../../../static/images/logo.png',
      form: {
        phone: '', // 手机号
        smsCode: '', // 验证码
        type: '0', // 账号类型
        imgCode: ''
      },
      loginState: true, // 避免多次点击
      registerState: true, // 避免多次点击
      winHeight: '', // 获取显示高度
      verify_code: '', // 验证手机号是否被注册的返回值
      smsCodeBox: true, // 短信验证码显示与否
      verify_but_show: false, // 验证按钮显示与否
      login_but_show: false, // 登录按钮显示与否
      register_but_show: false, // 注册按钮显示与否
      getImgCodeBox: false, // 图形验证码显示与否
      imgCodeButShow: true, // 获取图片验证码按钮显示与否
      imgCodeShow: false, // 获取图片验证码显示与否
      loading: false, // 加载图片验证码动画
      buttonName: "发送短信", // 获取短信验证码按钮文字
			isDisabled: false, // 获取短信验证码按钮是否禁用
			time: 60 // 获取短信验证码按钮禁用时间
    }
  },
  watch: {
    verify_code () {
      this.verify_code_if()
    }
  },
  methods: {
    orderHight() {
      var winHeight = window.innerHeight - 86
      this.winHeight = 'height:' + winHeight + 'px;'
    },
    test(){
      this.verify()
    },
    // 验证手机号是否已注册 start
    verify(){
      let phone_text = /^1[34578]\d{9}$/
      if (this.form.phone === '' || !phone_text.test(this.form.phone)) {
        this.$alert('请正确填写手机号！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.loginState = true
          }
        })
        return false
      } else {
        // 获取验证码
        let params = {}
        params.phone = this.form.phone
        // console.log(params)
        this.$axios
          .post(
            '/pms/insunSupplierRegisterInfo/judgeSupplierPhoneExists' + '?phone=' +params.phone
          )
          .then(this.verifySuss)
      }
    },
    verifySuss(res){
      let data = res.data
      this.verify_code = data.ext
    },
    // 验证手机号是否已注册 end

    // 通过返回值显示注册/登陆 start
    verify_code_if(){
      if (this.verify_code == 1) {
        this.login_but_show = true
        this.register_but_show = false
      }else if(this.verify_code == 0){
        this.login_but_show = false
        this.register_but_show = true
      }
    },
    // 通过返回值显示注册/登陆 end

    // 获取短信验证码 start
    getSmsCode(){
      if (this.form.phone === '') {
        this.$alert('请填写手机号！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.loginState = true
          }
        })
        return false
      } else {
        
        // 获取验证码
        let params = {}
        params.phone = this.form.phone
        if (this.register_but_show == true) {
          params.type = "register"
        }else if(this.login_but_show == true){
          params.type = "login"
        }
        params.imgCode = this.form.imgCode
        this.$axios
          .post(
            '/pms/smsRestService/getShortMsg'
            + '?phone=' + params.phone
            + '&type=' + params.type
            + '&imgCode=' + params.imgCode
          )
          .then(this.getSmsCodeSuss)
      }
    },
    getSmsCodeSuss(res) {
      let data = res.data

        this.$message({
          showClose: true,
          message: res.data.msg
        });
      if (data.errorCode == "-1") {
        if (data.ext == 1) {
          this.getImgCodeBox = true
          this.getImgCode()
          // 需获取图形验证码提示
          this.$message({
          showClose: true,
          message: res.data.msg
          });

        return false
        }
      }else if(data.errorCode == "0"){
        // 倒计时
        let me = this;
        me.isDisabled = true;
        let interval = window.setInterval(function() {
          me.buttonName = me.time + 's后重新发送';
          --me.time;
          if(me.time < 0) {
            me.buttonName = "重新发送";
            me.time = 60;
            me.isDisabled = false;
            window.clearInterval(interval);
          }
        }, 1000);
        // 手机验证码发送成功提示
        this.$message({
          showClose: true,
          message: res.data.msg
        });
      }
    },
    // 获取短信验证码 end

    // 获取图片验证码 start
    getImgCode() {
      if (this.form.phone === '') {
        this.$alert('请填写手机号！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.loginState = true
          }
        })
        return false
      } else {
        // 获取图片验证码
        this.imgCodeButShow = false
        this.loading = true
        let params = {}
        params.mobile = this.form.phone
        if (this.register_but_show == true) {
          params.type = "register"
        }else if(this.login_but_show == true){
          params.type = "login"
        }
        this.$axios
          .post(
            '/pms/smsRestService/captcha'
            + '?mobile=' + params.mobile
            + '&type=' + params.type
          )
          .then(this.getImgCodeSuss)
      }
    },
    getImgCodeSuss(res){
      let data = res.data
      if (data.errorCode == "0") {
        this.loading = false
        this.imgCodeShow = true
        const data = res.data
        this.imgcode = 'data:image/jpg;base64,' + data.img
      }
    },
    // 获取图片验证码 end

    // 注册start
    register(formName) {
      if (this.form.phone === '' || this.form.smsCode === '') {
        this.$alert('请将信息填写完整！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.registerState = true
          }
        })
        return false
      } else {
        // 注册
        this.registerFn()
      }
    },
    registerFn() {
      let params = {}
      params.phone = this.form.phone
      params.shortMsgCode = this.form.smsCode
      params.type = this.form.type
      params.imgCode = this.form.imgCode
      this.$axios
        .post('/pms//insunSupplierRegisterInfo/signUp'
        + '?phone=' + params.phone // 手机号
        + '&shortMsgCode=' + params.shortMsgCode // 短信验证码
        + '&imgCode=' + params.imgCode // 图形验证码
        + '&type=' + params.type) // 账号类型
        .then(this.registerFnSuccess)
    },
    registerFnSuccess(res){
      // 注册成功
      let data = res.data
      if (data.errorCode == 0) {
        this.$alert('注册成功', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            //每次登陆后就设置 isLogin  更新vuex状态
            window.sessionStorage.setItem('isLogin', 'success')
            this.$store.commit('login', {phone:this.form.phone })
            this.loginState = true // 避免多次点击按钮
            let type = this.form.type
            // 判断账号类型跳转不同页面
            if (type == 0) {
              this.$router.push({ path:'/personage_datum'  }) // 个人信息页面
            }else if (type == 1) {
              this.$router.push({ path:'/corporation_datum'  }) // 企业信息页面
            }
          }
        })
      }else if(data.errorCode == '-1'){
        this.$alert(data.msg, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.loginState = true
          }
        })
      }

    },
    // 登陆start
    login(formName) {
      // if (!this.loginState) return
      // this.loginState = false
      if (
        this.form.phone === '' ||
        this.form.smsCode === ''
      ) {
        this.$alert('请将信息填写完整！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.loginState = true
          }
        })
        return false
      } else {
        //登录
        this.loginFn()
      }
    },
    loginFn() {
      let params = {}
      //params.append('username', this.form.username)
      params.phone = this.form.phone
      params.shortMsgCode = this.form.smsCode
      params.imgCode = this.form.imgCode
      this.$axios
        .post('/pms/insunSupplierRegisterInfo/login'
        + '?phone=' + params.phone // 手机号
        + '&shortMsgCode=' + params.shortMsgCode // 短信验证码
        + '&imgCode=' + params.imgCode) // 图形验证码
        .then(this.loginSuccess)
    },
    loginSuccess(res) {
      let data = res.data
      if (data.errorCode == '0') {
        //每次登陆后就设置 isLogin  更新vuex状态
        window.sessionStorage.setItem('isLogin', 'success')
        this.$store.commit('login', {phone:this.form.phone })
        if (data.ext == 0 & data.img == 0 ) {
          this.$router.push({ path:'/personage_update'  }) // 个人信息填写页面
        }else if (data.ext == 1 & data.img == 0) {
          this.$router.push({ path:'/personage_datum'  }) // 个人信息详情页面
        }else if (data.ext == 0 & data.img == 1) {
          this.$router.push({ path:'/corporation_update'  }) // 企业信息填写页面
        }else if (data.ext == 1 & data.img == 1) {
          this.$router.push({ path:'/corporation_datum'  }) // 企业信息详情页面
        }
      }else if(data.errorCode == '-1'){
        this.$alert(data.msg, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.loginState = true
          }
        })
      }
      
    },
    // 登陆 end
  },
  mounted() {
    this.orderHight()
  }
}
</script>
<style scoped>
.login .el-form-item {
  margin-bottom: 24px;
  width: 100%;
}
.login .el-button {
  width: 100%;
}
.login-div {
  height: 100%;
  background: #eee;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.login-title {
  width: 36%;
  font-size: 40px;
  color: #fff;
  text-align: center;
  font-family: '微软雅黑';
}
.login-title p:nth-of-type(1) {
  color: #555555;
  font-weight: 700;
  font-size: 36px;
}
.login-title p:nth-of-type(2) {
  color: rgba(0, 0, 0, 0.42);
}
.login-box {
  width: 50%;
}
.login-input {
  width: 360px;
  margin: auto;
  padding-top: 32px;
}
.login-input .title{
  margin-bottom: 13px
}
.login-input .el-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.login-input .verification {
  width: 60%;
}
.login-input .img_verification {
  width: 36%;
}
.login-input .hint{
  height: 13px;
}
.login-input .getv {
  width: 36%;
  height: 40px;
}
.login-input .get_img_code{
  width: 28%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-end;
  align-content: flex-end;
}
.login-input .get_img_code button{
  padding: 0;
  background: none;
  border: none;
  text-align: right
}
.login-input .img_code {
  width: 36%;
  height: 40px;
}
.login-input .img_code img{
  width: 100%;
  height: 40px;
}
.login-input .remember {
  width: 50%;
}
.login-input .forget {
  height: 40px;
}
.login .el-checkbox__inner {
  width: 20px;
  height: 20px;
}
.login .el-checkbox__inner::after {
  height: 10px;
  left: 7px;
  top: 3px;
}
</style>
