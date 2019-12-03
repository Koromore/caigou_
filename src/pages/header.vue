<template>
	<div class="topheader">
		<el-header style="height:86px;">
			<div class="header-left">
				<img src="~@/assets/images/logo.png" alt="" srcset="" class="logo">
			</div>
			<div class="header-right">
				<i class="el-icon-bell"></i>
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link">
						{{this.$store.state.phone}}
						<i class="el-icon-caret-bottom el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item divided class="clearfix">
							<span @click="logout">退出</span>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</el-header>
	</div>
</template>
<script>
export default {
  name: 'topheader',
  data() {
    return {}
  },
  methods: {
    logout() {
      this.$confirm('是否退出登录？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '退出',
        cancelButtonText: '取消'
      })
        .then(() => {
          //退出登录
          this.$store.commit('logout')
          this.$router.push({ path: '/login' })
        })
        .catch(action => {
        });
    }
  }
}
</script>
<style>
.topheader {
  padding-bottom: 86px;
  height: 0px;
}
.header-left {
  height: 86px;
  line-height: 86px;
  color: #409eff;
  font-size: 28px;
	float: left;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
}
.header-left .logo{
	height: 81%;
}
.header-right {
  margin-top: 33px;
  float: right;
  height: 20px;
  line-height: 20px;
  color: #555555;
  font-size: 18px;
  cursor: pointer;
}
.topheader .el-dropdown {
  font-size: 15px;
}
.el-dropdown-menu {
  min-width: 160px;
}
.el-dropdown-menu span {
  text-align: center;
  display: block;
}
.topheader .el-header {
  padding: 0px 50px;
  position: fixed;
  top: 0;
  width: 100%;
  background: #f8f8f8;
  z-index: 1000;
  -webkit-box-shadow: 0 0 15px #d5d3d8;
  box-shadow: 0 3px 15px #d5d3d8;
}
</style>
