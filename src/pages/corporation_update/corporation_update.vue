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
            :value="test"
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
        <!-- 营业执照：上传start -->
        <el-col :span="10" class="content_text">
          <div>营业执照：</div>
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
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-col>
        <!-- 营业执照：上传end -->
      </el-row>
      <!-- 基本信息end -->
      <!-- 服务信息start -->
      <el-row>
        <el-col :span="24" class="content_title">服务信息</el-col>
        <el-col :span="24" class="content_text">
          <span>*</span>
          <div style="width: 7%;">服务类型：</div>
          <el-input type="textarea" :rows="3" placeholder="请填写公司许可的服务类型" v-model="serviceType"></el-input>
          <!-- <span style="width: 93%;">{{service}}</span> -->
        </el-col>
        <el-col :span="24" class="content_text">
          <span>*</span>
          <div>服务客户：</div>
          <el-input v-model="serviceCustomer" placeholder="请填写服务过的客户名称" clearable></el-input>
          <!-- <span>{{client}}</span> -->
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
          <el-input v-model="invoiceBankName" placeholder="请输入开户行名称" clearable></el-input>
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
      <el-row>
        <el-col :span="24" class="content_title">资质信息</el-col>
        <el-col :span="24" class="content_text">
          <div>上传附件：</div>
          <el-upload
            class="upload-demo"
            drag
            :action="uploadApi"
            multiple
            :on-success="domUploadSuccess"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg...不超过500kb</div>
          </el-upload>
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
      test:'',
      time: '',
      // 上传API
      uploadApi: '', //
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
      invoiceBankName: '', // 开户行名称
      invoiceBank: '', // 开票信息银行卡号
      invoiceReceiveUser: '', // 收件人
      invoiceReceiveAddr: '', // 收件地址
      invoiceReceiveContact: '', // 收件人联系电话
      // 银行信息
      bankAddrInfo: '', // 银行地址
      bankName: '', // 银行名称
      bankAccount: '', // 银行卡号
      // 营业执照上传
      dialogImageUrl: '',
      dialogVisible: false,
      businessLicense: '',
      //资质信息start
      // 其他附件上传 列表显示
      fileList: [],
      supplierRegisterFileList: [], // 其他附件列表
      // 城市选择器数据
      options: cities,
      // 缓存账号
      scissionid: '',
      id_img_show: false // 是否显示上传组件
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
    // 回调
    getSupplierInfoSuss(res) {
      let data = res.data
      if (data.errorCode == "0") {
        let deli=JSON.parse(data.ext)
        // 基本信息
        let supplierrInfo = deli.supplierRegisterInfo
        this.companyName= supplierrInfo.companyName // 企业名称
        this.creditCode= supplierrInfo.creditCode // 社会信用代码
        this.address= supplierrInfo.address // 办公地址
        this.district= '' // 区域
        this.companyLegal= supplierrInfo.companyLegal // 公司法人
        this.companyTime= supplierrInfo.companyTime // 成立时间
        this.companyTel= supplierrInfo.companyTel // 公司电话
        this.businessLicensePath= '' // 企业工商执照附件上传后的路径
        // 服务信息
        this.serviceType= supplierrInfo.serviceType // 服务类型
        this.serviceCustomer= supplierrInfo.serviceCustomer // 服务客户
        // 联系人信息
        let list = supplierrInfo.supplierContactInfoList
        this.linkman_list= list
        // 开票信息
        this.invoiceBankName= supplierrInfo.invoiceBank // 开户行名称
        this.invoiceBank= supplierrInfo.invoiceAccount // 开票信息银行卡号
        this.invoiceReceiveUser= supplierrInfo.invoiceReceiveUser // 收件人
        this.invoiceReceiveAddr= supplierrInfo.invoiceReceiveAddr // 收件地址
        this.invoiceReceiveContact= supplierrInfo.invoiceReceiveContact // 收件人联系电话
        // 银行信息
        this.bankAddrInfo= supplierrInfo.bankAddrInfo // 银行地址
        this.bankName= supplierrInfo.bankName // 银行名称
        this.bankAccount= supplierrInfo.bankAccount // 银行卡号
      }
    },
    // 获取供应商信息 end
    // 城市选择器
    getCascaderObj(val,opt) {
      return val.map(function (value, index, array) {
        for (var itm of opt) {
          if (itm.value == value) { opt = itm.children; return itm; }
        }
        return null
      })
    },
    handleChangeCity(e,form) {
      // 选择区域
      let add = this.getCascaderObj(e, this.options)
      let Addtest = []
      for (let i = 0; i < add.length; i++) {
        // const element = array[i];
        Addtest.push(add[i].label)
      }
      this.district = Addtest
      // console.log(this.district)
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
        let oldData = this.supplierRegisterFileList
        let resData = {
          fileName: file.name,
          filePath: res.ext.path
        }
        oldData.push(resData) // 将返回的数据添加到对象中
        this.supplierRegisterFileList = oldData
      }
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
      let supplier = {
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
          invoiceAccount: this.invoiceBank, // 发票单号
          invoiceBank: this.invoiceBank, // 开票信息银行卡号
          invoiceReceiveAddr: this.invoiceReceiveAddr, // 收件地址
          invoiceReceiveContact: this.invoiceReceiveContact, // 收件人联系电话
          invoiceReceiveUser: this.invoiceReceiveUser, // 收件人
          province: this.district[1], // 省份
          registerInfoId: '', // 注册ID
          serviceCustomer: this.serviceCustomer, // 服务客户
          serviceType: this.serviceType, // 服务类型
          supplierContactInfoList: this.linkman_list, // 联系人信息列表
          supplierRegisterFileList: this.supplierRegisterFileList // 上传文件列表
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
      console.log(res)
      let data = res.data
      if (data.errorCode == '0') {
        this.$alert(data.msg, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.loginState = true
            this.$router.push({ path:'/corporation_datum' })
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
</style>
