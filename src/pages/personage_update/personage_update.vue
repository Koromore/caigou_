<template>
  <div id="personage_update">
  
    <el-main>
      <el-row>
        <el-col :span="24" class="greet">
          <div class="grid-content bg-purple-dark">
            <span>{{this.$store.state.phone}}</span>
            ,欢迎注册映盛中国供应商管理系统，标
            <span>*</span>资料必须如实填写！！
          </div>
        </el-col>
      </el-row>
      <!-- 基本信息start -->
      <el-row>
        <el-col :span="24" class="content_title">基本信息</el-col>
        <el-col :span="8" class="content_text">
          <span>*</span>
          <div>姓名：</div>
          <el-input v-model="name" placeholder="请输入联系人姓名" clearable></el-input>
        </el-col>
        <el-col :span="8" class="content_text">
          <span>*</span>
          <div>电话：</div>
          <el-input v-model="telephone" placeholder="请输入联系人电话" clearable></el-input>
        </el-col>
        <el-col :span="8" class="content_text">
          <span>*</span>
          <div>微信&amp;QQ：</div>
          <el-input v-model="wxqq" placeholder="请输入联系人微信&QQ" clearable></el-input>
        </el-col>
        <el-col :span="8" class="content_text">
          <span>*</span>
          <div>地址：</div>
          <el-input
            prefix-icon="el-icon-location-outline"
            v-model="site"
            placeholder="请输入联系人地址"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="8" class="content_text">
          <span>*</span>
          <div>区域：</div>
          <el-cascader
            :options="options"
            v-model="district_code"
            ref="cascaderAddr"
            filterable
            @change="handleChangeCity"
            placeholder="请选择办公地区"
          ></el-cascader>
        </el-col>
        <el-col :span="8" class="content_text">
          <div>邮箱：</div>
          <el-input v-model="mail" placeholder="请输入联系人邮箱" clearable></el-input>
        </el-col>
      </el-row>
      <!-- 基本信息end -->
      <!-- 服务信息start -->
      <el-row>
        <el-col :span="24" class="content_title">服务信息</el-col>
        <el-col :span="24" class="content_text">
          <span>*</span>
          <div style="width: 7%;">服务类型：</div>
          <el-input type="textarea" :rows="3" placeholder="请填写公司许可的服务类型" v-model="serviceType"></el-input>
        </el-col>
        <el-col :span="24" class="content_text">
          <span>*</span>
          <div>服务客户：</div>
          <el-input v-model="serviceCustomer" placeholder="请填写服务过的客户名称" clearable></el-input>
        </el-col>
      </el-row>
      <!-- 服务信息end -->
      <!-- 资质信息start -->
      <el-row>
        <el-col :span="24" class="content_title">资质信息</el-col>
        <el-col :span="9" class="content_text">
          <span>*</span>
          <div>银行卡开户行名称：</div>
          <el-input v-model="bankName" placeholder="请输入开户行名称" clearable></el-input>
        </el-col>
        <el-col :span="3" class="content_text"></el-col>
        <el-col :span="9" class="content_text">
          <span>*</span>
          <div>银行卡号：</div>
          <el-input maxlength="19" v-model="bankAccount" placeholder="请输入银行卡号" clearable></el-input>
        </el-col>
        <el-col :span="9" class="content_text">
          <span>*</span>
          <div>身份证：</div>
          <br>
          <el-input maxlength="18" v-model="idCard" placeholder="请输入身份证号" clearable></el-input>
        </el-col>
        <!-- 证件上传start -->
        <el-col :span="24" class="content_text">
          <div>上传证件：</div>
          <div v-show="dialogImageShow" class="dialog">
            <img :src="idCardImageUrl" alt="" srcset="" width="148" height="148">
            <i class="el-icon-delete dialog_del" @click="deleDialog"></i>
          </div>
          <el-upload
            :action="uploadApi"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="imgUploadSuccess"
            :disabled="id_img_show"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-col>
        <!-- 证件上传end -->
        <!-- 其他附件上传start -->
        <el-col :span="24" class="content_text">
          <div>其它附件：</div>
          <el-upload
            class="upload-demo"
            :action="uploadApi"
            :on-change="handleChangeUpload"
            :file-list="fileList"
            :on-success="domUploadSuccess"
            :on-remove="domUploadRemove"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</div>
          </el-upload>
          <!-- 已上传资质文件start -->
          <el-col class="certificates_list" :span="24">
            <div v-for="item in odleSupplierRegisterFileList" :key="item.index">
              <a href="javascript:;"><i class="el-icon-document"></i>{{item.fileName}}</a>
              <i class="el-icon-close" @click="deleFile(item.filePath)"></i>
            </div>
          </el-col>
          <!-- 已上传资质文件end -->
        </el-col>
        <!-- 其他附件上传end -->
        <el-col :span="24" style="height:54px;"></el-col>
        <el-col :span="2" class="but" :offset="10">
          <el-button type="primary" @click="update">提交</el-button>
        </el-col>
        <el-col :span="2" class="but">
          <el-button @click="cancel">取消</el-button>
        </el-col>
      </el-row>
      <!-- 资质信息end -->
    </el-main>
  </div>
</template>
<script>
import { regionData } from 'element-china-area-data'
import cities from '@/common/cities.js' // 引入城市数据
export default {
  name: 'personage_update',
  components: {},
  data() {
    return {
      // 上传API
      uploadApi: '', //
      // 信息填写
      version: '', // 信息版本号
      // 基本信息
      name: '', // 姓名
      telephone: '', // 电话
      wxqq: '', // 微信QQ
      site: '', // 地址
      district_code: '', // 区域代码
      district: '', // 区域
      mail: '', // 邮箱
      // 服务信息
      serviceType: '', // 服务类型
      serviceCustomer: '', // 服务客户
      // 资质信息
      bankName: '', // 银行名称
      bankAccount: '', // 银行卡号
      idCard: '', // 身份证号
      // 证件上传
      dialogImageUrl: '',
      dialogVisible: false,
      dialogImageShow: false, // 是否显示身份证图片
      idCardFront: '', // 身份证图片名称
      idCardFrontPath: '', // 身份证图片路径
      idCardImageUrl: '', // 获取到的身份证图片路径
      // 其他附件上传 列表显示
      fileList: [],
      supplierRegisterFileList: [], // 其他附件列表
      odleSupplierRegisterFileList: [], // 获取到的其他附件
      // 城市选择器数据
      options: cities,
      regionData: regionData, // 城市选择器数据
      selectedOptions: [],

      id_img_show: false // 是否禁用身份证上传组件
    }
  },
  // 方法
  methods: {
    // 获取存于vue-x中的登陆手机号
    locals() {
      this.uploadApi =
        '/pms/insunSupplierFileupload/upload' + '?phone=' + this.$store.state.phone
    },
    // 获取供应商信息 start
    getSupplierInfo() {
      let phone = this.$store.state.phone
      this.$axios
        .post(
          '/pms/insunSupplierRegisterInfo/getSupplierInfo' + '?phone=' + phone
        )
        .then(this.getSupplierInfoSuss)
    },
    getSupplierInfoSuss(res) {
      let data = res.data
      if (data.errorCode == "0") {
        let deli=JSON.parse(data.ext)
        // console.log(deli)
        this.version = deli.version // 信息版本号
        // 基本信息
        let supplier = deli.supplierRegisterInfo.supplierContactInfoList[0]
        let supplierInfo = deli.supplierRegisterInfo
        let districtValue = []
        districtValue.push(supplierInfo.province)
        districtValue.push(supplierInfo.city)
        districtValue.push(supplierInfo.area)
        let val = this.getValue(districtValue,this.options)
        let AddValue = []
        for (let i = 0; i < val.length; i++) {
          AddValue.push(val[i].value)
        }
        this.district_code= AddValue // 区域代码
        this.name= supplier.name // 姓名
        this.telephone= supplier.tel // 电话
        this.wxqq= supplier.wechatOrQQ // 微信QQ
        this.site= supplierInfo.address // 地址
        this.district= districtValue // 区域
        this.mail= supplier.mail // 邮箱
        // 服务信息
        this.serviceType= supplierInfo.serviceType // 服务类型
        this.serviceCustomer= supplierInfo.serviceCustomer // 服务客户
        // 资质信息
        this.bankName= supplierInfo.bankName // 银行名称
        this.bankAccount= supplierInfo.bankAccount // 银行卡号
        this.idCard= supplierInfo.idCard // 身份证号
        if (supplierInfo.idCardFrontPath != '') {
          this.dialogImageShow = true // 显示已上传的营业执照
          this.id_img_show = true // 禁用证件照上传功能
          this.idCardImageUrl = '/pms/upload' + supplierInfo.idCardFrontPath // 证件照图片显示路径
          this.idCardFrontPath = supplierInfo.idCardFrontPath // 证件照照图片上传路径
        }
        // 其他附件
        this.odleSupplierRegisterFileList = supplierInfo.supplierRegisterFileList
      }
    },
    // 获取供应商信息 end
    // 城市选择器
      // 通过代码获取选择城市名称
    getCascaderObj(val,opt) {
      return val.map(function (value, index, array) {
        for (var itm of opt) {
          if (itm.value == value) { opt = itm.children; return itm; }
        }
        return null
      })
    },
      // 通过城市名获取代码
    getValue(add,opt){
      return add.map(function (value, index, array) {
        for (var itm of opt) {
          if (itm.label == value) { opt = itm.children; return itm; }
        }
        return null
      })
    },
    handleChangeCity(thsAreaCode) {
      // 选择区域
      // this.district = this.$refs.cascaderAddr.getCheckedNodes()[0].pathLabels
      // 选择区域
      let add = this.getCascaderObj(thsAreaCode, this.options)
      let Addtest = []
      for (let i = 0; i < add.length; i++) {
        Addtest.push(add[i].label)
      }
      this.district = Addtest
    },
    // 城市选择器切换
    handleChange(val) {
    },
    // 证件上传 start
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 回调
    imgUploadSuccess(res, file, fileList) {
      let data = res
      if (data.errorCode == 0) {
        this.id_img_show = true
        this.idCardFront = file.name
        this.idCardFrontPath = data.ext.path
        // console.log(this.idCardFront)
        // console.log(this.idCardFrontPath)
      }
    },
    // 证件上传 end

    // 其它附件上传 start
    handleChangeUpload(file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    // 回调
    domUploadSuccess(res,file,fileList) {
      if (res.errorCode == 0) {
        let list = []
        for (let i = 0; i < fileList.length; i++) {
          let listData = {
            fileName: fileList[i].name,
            filePath: fileList[i].response.ext.path
          }
          list.push(listData)
        }
        this.supplierRegisterFileList = list
      }
    },
    domUploadRemove(file, fileList) {
      let list = []
      for (let i = 0; i < fileList.length; i++) {
        let listData = {
          fileName: fileList[i].name,
          filePath: fileList[i].response.ext.path
        }
        list.push(listData)
      }
      this.supplierRegisterFileList = list
    },
    // 其它附件上传 end

    // 提交 start
    update() {
      let supplierRegisterFileList = this.supplierRegisterFileList
      let odleSupplierRegisterFileList = this.odleSupplierRegisterFileList
      supplierRegisterFileList=supplierRegisterFileList.concat(odleSupplierRegisterFileList)
      let supplier = {
        version: this.version, // 信息版本
        phoneNum: this.$store.state.phone, // 供应商电话
        supplierRegisterInfo: {
          address: this.site, // 地址
          area: this.district[2], // 区域
          bankAccount: this.bankAccount, // 银行卡号
          bankAddrInfo: '', // 银行地址
          bankName: this.bankName, // 银行名称
          city: this.district[1], // 城市
          idCard: this.idCard, // 身份证号码
          idCardBack: '', // 身份证反面照名称
          idCardBackPath: '', // 身份证反面照路径
          idCardFront: this.idCardFront, // 身份证正面照名称
          idCardFrontPath: this.idCardFrontPath, // 身份证正面照路径
          province: this.district[0], // 省份
          serviceCustomer: this.serviceCustomer, // 服务客户
          serviceType: this.serviceType, // 服务类型
          supplierContactInfoList: [
            {
              mail: this.mail, // 邮箱
              name: this.name, // 名字
              tel: this.telephone, // 手机号
              wechatOrQQ: this.wxqq // 微信或QQ
            }
          ],
          supplierRegisterFileList:supplierRegisterFileList
        },
        type: 0
      }
      // console.log(supplier)
      this.$axios
        .post('/pms/insunSupplierRegisterInfo/addOrUpdateRegisterInfo', supplier
        // this.$qs.stringify({
        //     supplier: supplier
        //   })
        )
        .then(this.updateSuss)
    },
    updateSuss(res){
      let data = res.data
      if (data.errorCode == '0') {
        this.$alert(data.msg, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.loginState = true
            // console("取消")
            this.$router.push({ path:'/personage_datum' })
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
    // 提交 end
    cancel(){
      this.$confirm('是否放弃填写离开页面？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '离开',
        cancelButtonText: '继续填写'
      })
        .then(() => {
          // 点击离开跳转详情页面
          this.$router.push({ path:'/personage_datum' })
        })
        .catch(action => {
        });
    },
    getSmsCodeSuss(res) {
      let data = res.data

      this.$message({
        showClose: true,
        message: res.data.msg
      })
      if (data.errorCode == '-1') {
        if (data.ext == 1) {
          this.getImgCodeBox = true
          this.getImgCode()
          // 需获取图形验证码提示
          this.$message({
            showClose: true,
            message: res.data.msg
          })

          return false
        }
      } else if (data.errorCode == '0') {
        // 手机验证码发送成功提示
        this.$message({
          showClose: true,
          message: res.data.msg
        })
      }
    },
    // 上传信息 end
    // 删除身份证
    deleDialog(){
      this.$confirm('是否删除证件照？', '确认信息', {
        distinguishCancelAndClose: true,
        cancelButtonText: '取消',
        confirmButtonText: '删除'
      })
        .then(() => {
          // 点击删除
          // console.log("删除营业执照")
          let filePath = this.idCardFrontPath
          let phone = this.$store.state.phone
          let version = this.version
          // console.log(filePath)
          // console.log(phone)
          // console.log(version)
          // 发送删除请求
          this.$axios
            .post(
              '/pms//insunSupplierRegisterInfo/delFileByPath'
              + '?filePath=' + filePath
              + '&phone=' + phone
              + '&version=' + version
            )
            .then(this.deleDialogSuss)
        })
        .catch(action => {
          // 点击取消
        });
    },
    deleDialogSuss(res) {
      let data = res.data
      if (data.errorCode == '0') {
        this.$alert(data.msg, '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
        // 信息更新
        this.id_img_show = false
        this.getSupplierInfo()
      }else if(data.errorCode == '-1') {
        this.$alert(data.msg, '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      }
    },
    // 删除资质文件
    deleFile(filePath) {
      this.$confirm('是否删除资质文件？', '确认信息', {
        distinguishCancelAndClose: true,
        cancelButtonText: '取消',
        confirmButtonText: '删除'
      })
        .then(() => {
          // 点击删除
          let phone = this.$store.state.phone
          let version = this.version
          // 发送删除请求
          this.$axios
            .post(
              '/pms//insunSupplierRegisterInfo/delFileByPath'
              + '?filePath=' + filePath
              + '&phone=' + phone
              + '&version=' + version
            )
            .then(this.deleFileSuss)
        })
        .catch(action => {
          // 点击取消
        });
    },
    deleFileSuss(res) {
      let data = res.data
      // console.log(data)
      if (data.errorCode == '0') {
        this.$alert(data.msg, '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
        // 信息更新
        this.getSupplierInfo()
      }else if(data.errorCode == '-1') {
        this.$alert(data.msg, '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      }
    }
  },
  // 钩子函数
  mounted() {
    this.locals()
    this.getSupplierInfo()
  }
}
</script>
<style scoped>
.el-cascader {
  width: 100%;
}
#personage_update {
  background: rgba(246, 247, 249, 1);
}
.text_indent_1 {
  text-indent: 1em;
}
.el-main {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0;
}
.el-row {
  margin-bottom: 28px;
  padding: 13px 0;
  background: white;
  border-radius: 3px;
}
.el-col {
  padding: 0 36px;
}
.greet {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.64);
  height: 66px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
#personage_update .content_title {
  height: 55px;
  line-height: 55px;
  margin-bottom: 13px;
  font-weight: 650;
  color: rgba(0, 0, 0, 0.81);
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
#personage_update .content_text {
  /* height: 32px; */
  line-height: 32px;
  font-size: 14px;
  margin: 3px 0;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
}
#personage_update .grid-content span:nth-of-type(1){
   color:#1890FF;
}
#personage_update .content_text span,
#personage_update .grid-content span:nth-of-type(2){
  color: #FF6600;
}
#personage_update .but {
  padding: 0;
}
/* 证件显示样式start */
#personage_update .dialog{
  width: 148px;
  height: 148px;
  position: relative;
  border-radius: 9px;
  overflow: hidden;
}
#personage_update .dialog .dialog_del{
  position: absolute;
  top: 0;
  right: 0;
}
#personage_update .dialog:hover .dialog_del{
  background: white;
}
/* 证件显示样式end */
/* 资质文件样式start */
#personage_update .certificates_list{
  height: 54px;
  padding: 0;
}
#personage_update .certificates_list>div{
  width: 360px;
  height: 25px;
  line-height: 25px;
  box-sizing: border-box;
  margin-left: 5em;
  padding: 0 4px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
#personage_update .certificates_list>div:hover{
  background-color: #F5F7FA;
}
#personage_update .certificates_list a{
  box-sizing: border-box;
  width: 320px;
  height: 25px;
  line-height: 25px;
  overflow: hidden;
  /* padding-left: 4px; */
  color: #606266;
}
#personage_update .certificates_list a:hover{
  color: #409EFF;
}
#personage_update .certificates_list .el-icon-document {
    height: 100%;
    margin-right: 7px;
    color: #909399;
    line-height: inherit;
}
/* 资质文件样式start */
</style>
