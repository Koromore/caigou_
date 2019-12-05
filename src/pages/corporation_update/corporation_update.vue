<template>
  <div id="corporation_update">
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
      <el-row class="basic">
        <el-col :span="24" class="content_title">基本信息</el-col>
        <el-col :span="10" class="content_text">
          <span>*</span>
          <div>公司名称：</div>
          <el-input v-model="companyName" placeholder="请输入公司名称" clearable></el-input>
        </el-col>
        <el-col :span="10" class="content_text">
          <span>*</span>
          <div>统一社会信用代码：</div>
          <el-input v-model="creditCode" placeholder="请输入统一社会信用代码" clearable></el-input>
        </el-col>
        <el-col :span="10" class="content_text">
          <span>*</span>
          <div>办公地址：</div>
          <el-input v-model="address" placeholder="请输入办公地址" clearable></el-input>
        </el-col>
        <el-col :span="10" class="content_text">
          <span>*</span>
          <div>所属区域：</div>
          <el-cascader
            :options="options"
            v-model="district_code"
            ref="cascaderAddr"
            filterable
            @change="handleChangeCity"
            placeholder="请选择办公地区"
          ></el-cascader>
        </el-col>
        <el-col :span="10" class="content_text">
          <span>*</span>
          <div>公司成立时间：</div>
          <el-date-picker v-model="companyTime" type="date" placeholder="请选择成立时间" :value="time"></el-date-picker>
        </el-col>
        <el-col :span="10" class="content_text">
          <span>*</span>
          <div>法定代表人姓名：</div>
          <el-input v-model="companyLegal" placeholder="请输入法定代表人姓名" clearable></el-input>
        </el-col>
        <el-col :span="10" class="content_text">
          <span>*</span>
          <div>公司电话：</div>
          <el-input v-model="companyTel" placeholder="请输入公司电话" clearable></el-input>
        </el-col>
        <!-- 营业执照上传start -->
        <el-col :span="10" class="content_text">
          <div>营业执照：</div>
          <div v-show="dialogImageShow" class="dialog">
            <img :src="dialogImageUrl" alt="" srcset="" width="148" height="148">
            <i class="el-icon-delete dialog_del" @click="deleDialog"></i>
          </div>
          <el-upload
            :action="uploadApi"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="businessLicenseImgUploadSuccess"
            :disabled="id_img_show"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- 上传图片预览start -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <!-- 上传图片预览end -->
        </el-col>
        <!-- 营业执照上传end -->
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
      <!-- 联系人信息start -->
      <el-row class="linkman">
        <el-col :span="24" class="content_title">联系人信息</el-col>
        <el-col :span="24" class="linkman_list" v-for="item in linkman_list" :key="item.index">
          <el-col :span="6" class="content_text">
            <span>*</span>
            <div>姓名：</div>
            <el-input v-model="item.name" placeholder="请输入联系人姓名" clearable></el-input>
          </el-col>
          <el-col :span="6" class="content_text">
            <span>*</span>
            <div>电话：</div>
            <el-input v-model="item.tel" placeholder="请输入联系人电话" clearable></el-input>
          </el-col>
          <el-col :span="6" class="content_text">
            <span>*</span>
            <div>微信&QQ：</div>
            <el-input v-model="item.wechatOrQQ" placeholder="请输入联系人微信&QQ" clearable></el-input>
          </el-col>
          <el-col :span="6" class="content_text">
            <span>*</span>
            <div>邮箱：</div>
            <el-input v-model="item.mail" placeholder="请输入联系人邮箱" clearable></el-input>
          </el-col>
        </el-col>
        <el-button class="add_but" plain @click="add_linkman">+ 添加</el-button>
      </el-row>
      <!-- 联系人信息end -->
      <!-- 开票信息start -->
      <el-row>
        <el-col :span="24" class="content_title">开票信息</el-col>
        <el-col :span="12" class="content_text">
          <span>*</span>
          <div>开户行名称：</div>
          <el-input v-model="invoiceAccount" placeholder="请输入开户行名称" clearable></el-input>
        </el-col>
        <el-col :span="12" class="content_text">
          <span>*</span>
          <div>开户行账号：</div>
          <el-input v-model="invoiceBank" placeholder="请输入银行号码" clearable></el-input>
        </el-col>
        <el-col :span="7" class="content_text">
          <span>*</span>
          <div>收件人：</div>
          <el-input v-model="invoiceReceiveUser" placeholder="请输入请输入联系人姓名" clearable></el-input>
        </el-col>
        <el-col :span="7" class="content_text">
          <span>*</span>
          <div>收件人联系电话：</div>
          <el-input v-model="invoiceReceiveContact" placeholder="请输入联系人电话" clearable></el-input>
        </el-col>
        <el-col :span="10" class="content_text">
          <span>*</span>
          <div>收件地址：</div>
          <el-input v-model="invoiceReceiveAddr" placeholder="请输入收件地址" clearable></el-input>
        </el-col>
      </el-row>
      <!-- 开票信息end -->
      <!-- 银行信息start -->
      <el-row>
        <el-col :span="24" class="content_title">银行信息</el-col>
        <el-col :span="8" class="content_text">
          <span>*</span>
          <div>地区：</div>
          <el-input v-model="bankAddrInfo" placeholder="请选择开户银行所在区域" clearable></el-input>
        </el-col>
        <el-col :span="8" class="content_text">
          <span>*</span>
          <div>开户银行：</div>
          <el-input v-model="bankName" placeholder="请输入开户银行名称" clearable></el-input>
        </el-col>
        <el-col :span="8" class="content_text">
          <span>*</span>
          <div>银行账户：</div>
          <el-input v-model="bankAccount" placeholder="请输入银行账户号" clearable></el-input>
        </el-col>
      </el-row>
      <!-- 银行信息end -->
      <!-- 资质信息start -->
      <el-row class="certificates">
        <el-col :span="24" class="content_title">资质信息</el-col>
        <el-col :span="24" class="content_text">
          <div>上传附件：</div>
          <el-upload
            class="upload-demo"
            drag
            :action="uploadApi"
            multiple
            :on-success="domUploadSuccess"
            :on-remove="domUploadRemove"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</div>
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
  name: 'corporation_update',
  components: {},
  data() {
    return {
      test: true,
      time: '',
      // 上传API
      uploadApi: '', //
      version: '', // 信息版本
      // 信息填写
      // 基本信息
      companyName: '', // 企业名称
      creditCode: '', // 社会信用代码
      address: '', // 办公地址
      district_code: '', // 区域代码
      district: '', // 区域名称
      companyLegal: '', // 公司法人
      companyTime: '', // 成立时间
      companyTel: '', // 公司电话
      // 营业执照上传
      dialogImageUrl: '', // 营业执照路径用于上传是显示
      dialogVisible: false,
      id_img_show: false, // 是否禁用营业执照上传功能
      businessLicense: '', // 营业执照图片名称
      businessLicensePath: '', // 企业工商执照附件上传后的路径
      // 服务信息
      serviceType: '', // 服务类型
      serviceCustomer: '', // 服务客户
      // 联系人信息
      linkman_list: [
        {
          name: '',
          tel: '',
          wechatOrQQ: '',
          mail: ''
        },
        {
          name: '',
          tel: '',
          wechatOrQQ: '',
          mail: ''
        }
      ],
      // 开票信息
      invoiceAccount: '', // 发票单号/开票信息银行名称
      invoiceBank: '', // 开票信息银行卡号
      invoiceReceiveUser: '', // 收件人
      invoiceReceiveAddr: '', // 收件地址
      invoiceReceiveContact: '', // 收件人联系电话
      // 银行信息
      bankAddrInfo: '', // 银行地址
      bankName: '', // 银行名称
      bankAccount: '', // 银行卡号
      
      //资质信息start
      // 其他附件上传 列表显示
      fileList: [],
      supplierRegisterFileList: [], // 其他附件列表
      odleSupplierRegisterFileList: [],
      isAutoplay: '',
      // 城市选择器数据
      options: cities,
      dialogImageShow: false // 是否显示营业执照
    }
  },
  // 方法
  methods: {
    // 获取存于vue-x中的登陆手机号
    locals() {
      this.uploadApi =
        '/pms/insunSupplierFileupload/upload'
        + '?phone=' + this.$store.state.phone
    },

    // 获取供应商信息 start
    getSupplierInfo() {
      let phone = this.$store.state.phone
      this.$axios
        .post(
          '/pms/insunSupplierRegisterInfo/getSupplierInfo'
          + '?phone=' + phone
        )
        .then(this.getSupplierInfoSuss)
    },
    // 回调
    getSupplierInfoSuss(res) {
      let data = res.data
      if (data.errorCode == "0") {
        let deli=JSON.parse(data.ext)
        // console.log(deli)
        this.version = deli.version // 信息版本号
        // 基本信息
        let supplierrInfo = deli.supplierRegisterInfo
        let districtValue = []
        districtValue.push(supplierrInfo.province)
        districtValue.push(supplierrInfo.city)
        districtValue.push(supplierrInfo.area)
        let val = this.getValue(districtValue,this.options)
        let AddValue = []
        for (let i = 0; i < val.length; i++) {
          AddValue.push(val[i].value)
        }
        this.district_code = AddValue // 城市选择器代码
        this.companyName= supplierrInfo.companyName // 企业名称
        this.creditCode= supplierrInfo.creditCode // 社会信用代码
        this.address= supplierrInfo.address // 办公地址
        this.district= districtValue // 区域
        this.companyLegal= supplierrInfo.companyLegal // 公司法人
        this.companyTime= supplierrInfo.companyTime // 成立时间
        this.companyTel= supplierrInfo.companyTel // 公司电话
        if (supplierrInfo.businessLicensePath != '') {
          this.dialogImageShow = true // 显示已上传的营业执照
          this.id_img_show = true // 禁用营业执照上传功能
          this.dialogImageUrl = '/pms/upload' + supplierrInfo.businessLicensePath // 营业执照图片显示路径
          this.businessLicensePath = supplierrInfo.businessLicensePath // 营业执照图片上传路径
        }else{
          this.dialogImageShow = false // 显示已上传的营业执照
          this.id_img_show = false // 禁用营业执照上传功能
          this.dialogImageUrl = '' // 营业执照图片显示路径
          // this.businessLicensePath = '' // 营业执照图片上传路径
        }
        // 服务信息
        this.serviceType= supplierrInfo.serviceType // 服务类型
        this.serviceCustomer= supplierrInfo.serviceCustomer // 服务客户
        // 联系人信息
        let list = supplierrInfo.supplierContactInfoList
        this.linkman_list= list
        // 开票信息
        this.invoiceAccount= supplierrInfo.invoiceAccount // 开户行名称
        this.invoiceBank= supplierrInfo.invoiceBank // 开票信息银行卡号
        this.invoiceReceiveUser= supplierrInfo.invoiceReceiveUser // 收件人
        this.invoiceReceiveAddr= supplierrInfo.invoiceReceiveAddr // 收件地址
        this.invoiceReceiveContact= supplierrInfo.invoiceReceiveContact // 收件人联系电话
        // 银行信息
        this.bankAddrInfo= supplierrInfo.bankAddrInfo // 银行地址
        this.bankName= supplierrInfo.bankName // 银行名称
        this.bankAccount= supplierrInfo.bankAccount // 银行卡号
        // 资质文件
        this.odleSupplierRegisterFileList = supplierrInfo.supplierRegisterFileList
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
    handleChangeCity(e,form) {
      // 选择区域
      let add = this.getCascaderObj(e, this.options)
      let Addtest = []
      for (let i = 0; i < add.length; i++) {
        Addtest.push(add[i].label)
      }
      this.district = Addtest
    },
    // 城市选择器切换
    handleChange(val) {
    },
    // 营业执照上传
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 营业执照上传回调
    businessLicenseImgUploadSuccess(res, file, fileList) {
      let data = res
      if (data.errorCode == 0) {
        this.id_img_show = true
        this.businessLicense = file.name
        this.businessLicensePath = data.ext.path
      }
    },
    // 上传附件
    // 上传附件回调
    domUploadSuccess(res, file, fileList) {
      let data = res
      if (data.errorCode == 0) {
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
    domUploadRemove(file, fileList){
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
    // 添加联系人
    add_linkman() {
      let linkman_list = this.linkman_list
      let linkmen_ = {
        name: '',
        tel: '',
        wechatOrQQ: '',
        mail: ''
      }
      linkman_list.push(linkmen_)
      this.linkman_list = linkman_list
    },
    // 上传信息 start
    update() {
      let supplierRegisterFileList = this.supplierRegisterFileList
      let odleSupplierRegisterFileList = this.odleSupplierRegisterFileList
      supplierRegisterFileList=supplierRegisterFileList.concat(odleSupplierRegisterFileList)
      let supplier = {
        version: this.version, // 信息版本
        phoneNum: this.$store.state.phone, // 供应商电话
        supplierRegisterInfo: {
          address: this.address, // 办公地址
          area: this.district[2], // 区域
          bankAccount: this.bankAccount, // 银行卡号
          bankAddrInfo: this.bankAddrInfo, // 银行地址
          bankName: this.bankName, // 银行名称
          businessLicense: this.businessLicense, // 企业工商执照代码
          businessLicensePath: this.businessLicensePath, // 企业工商执照路径
          city: this.district[1], // 城市
          companyLegal: this.companyLegal, // 企业法人
          companyName: this.companyName, // 公司名称
          companyTel: this.companyTel, // 公司电话
          companyTime: this.companyTime, // 公司成立时间
          creditCode: this.creditCode, // 社会信用代码
          invoiceAccount: this.invoiceAccount, // 发票单号/开票信息银行名称
          invoiceBank: this.invoiceBank, // 开票信息银行卡号
          invoiceReceiveAddr: this.invoiceReceiveAddr, // 收件地址
          invoiceReceiveContact: this.invoiceReceiveContact, // 收件人联系电话
          invoiceReceiveUser: this.invoiceReceiveUser, // 收件人
          province: this.district[0], // 省份
          registerInfoId: '', // 注册ID
          serviceCustomer: this.serviceCustomer, // 服务客户
          serviceType: this.serviceType, // 服务类型
          supplierContactInfoList: this.linkman_list, // 联系人信息列表
          supplierRegisterFileList: supplierRegisterFileList // 上传文件列表
        },
        type: 1
      }
      this.$axios
        .post(
          '/pms/insunSupplierRegisterInfo/addOrUpdateRegisterInfo', supplier
          // this.$qs.stringify({
          //   supplier: supplier
          // })
        )
        .then(this.updateSuss)
    },
    updateSuss(res) {
      // console.log(res)
      let data = res.data
      if (data.errorCode == '0') {
        this.$alert(data.msg, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push({ path:'/corporation_datum' })
          }
        })
      }else if(data.errorCode == '-1'){
        this.$alert(data.msg, '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      }
      
    },
    // 上传信息 end

    // 取消上传
    cancel() {
      this.$confirm('是否放弃填写离开页面？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '离开',
        cancelButtonText: '继续填写'
      })
        .then(() => {
          // 点击离开跳转详情页面
          this.$router.push({ path:'/corporation_datum' })
        })
        .catch(action => {
        });
    },
    // 删除营业执照
    deleDialog(){
      this.$confirm('是否删除营业执照？', '确认信息', {
        distinguishCancelAndClose: true,
        cancelButtonText: '取消',
        confirmButtonText: '删除'
      })
        .then(() => {
          // 点击删除
          // console.log("删除营业执照")
          let filePath = this.businessLicensePath
          let phone = this.$store.state.phone
          let version = this.version
          // console.log(filePath)
          // console.log(phone)
          // console.log(version)
          // 发送删除请求
          this.$axios
            .post(
              '/pms/insunSupplierRegisterInfo/delFileByType'
              + '?filePath=' + filePath
              + '&phone=' + phone
              + '&version=' + version
              + '&fileType=businessLicense'
            )
            .then(this.deleDialogSuss)
        })
        .catch(action => {
          // 点击取消
        });
    },
    deleDialogSuss(res) {
      let data = res.data
      // console.log(data)
      if (data.errorCode == '0') {
        this.$alert(data.msg, '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
        // 信息更新
        this.id_img_show = false
        this.businessLicensePath = ''
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
.el-cascader,
.el-date-editor {
  width: 100%;
}
#corporation_update {
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
#corporation_update .content_title {
  height: 55px;
  line-height: 55px;
  margin-bottom: 13px;
  font-weight: 650;
  color: rgba(0, 0, 0, 0.81);
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
#corporation_update .content_text {
  line-height: 32px;
  font-size: 14px;
  margin: 3px 0;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
}
#corporation_update .grid-content span:nth-of-type(1){
   color:#1890FF;
}
#corporation_update .content_text span,
#corporation_update .grid-content span{
  color: #ff6600;
}
#corporation_update .but {
  padding: 0;
}
#corporation_update .basic .dialog{
  width: 148px;
  height: 148px;
  position: relative;
  border-radius: 9px;
  overflow: hidden;
}
#corporation_update .basic .dialog .dialog_del{
  position: absolute;
  top: 0;
  right: 0;
}
#corporation_update .basic .dialog:hover .dialog_del{
  background: white;
}
/* 联系人列表样式 start */
#corporation_update .linkman .linkman_list {
  padding: 0;
}
#corporation_update .linkman .linkman_list:nth-last-of-type(1) {
  margin-bottom: 24px;
}
#corporation_update .linkman .add_but {
  width: 1008px;
  margin: 0 auto;
  display: block;
  border-style: dashed;
}
/* 联系人列表样式 end */
/* 资质文件样式start */
#corporation_update .certificates_list{
  padding: 0;
}
#corporation_update .certificates_list>div{
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
#corporation_update .certificates_list>div:hover{
  background-color: #F5F7FA;
}
#corporation_update .certificates_list a{
  box-sizing: border-box;
  width: 320px;
  height: 25px;
  line-height: 25px;
  overflow: hidden;
  /* padding-left: 4px; */
  color: #606266;
}
#corporation_update .certificates_list a:hover{
  color: #409EFF;
}
#corporation_update .certificates_list .el-icon-document {
    height: 100%;
    margin-right: 7px;
    color: #909399;
    line-height: inherit;
}
/* 资质文件样式start */
</style>
