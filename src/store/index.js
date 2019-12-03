import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        phone: '',  //手机号
        isLogin:'error', //是否登陆
    },
    action:{
    },
    mutations:{
        //第一个参数默认是state 第二个是传递过来的参数
        //登录模块
        login(state,data){
            // console.log(`请求vuex登陆${data.phone}`)
            state.phone = data.phone;
            //全局vuex 登陆状态
            state.isLogin = window.sessionStorage.getItem('isLogin') || 'error';
            try {
                localStorage.phone = data.phone;
            } catch (err) {
                console.log(err);
            }
        },
        //退出登录
        logout(state,data){
            // console.log(`请求vuex退出${data.phone}`)
            window.sessionStorage.setItem('isLogin','error');
            localStorage.removeItem('phone');
            state.isLogin = 'error';
            state.phone = '';
        },
    }
})
