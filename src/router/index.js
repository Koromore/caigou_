import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import qs from 'qs'
import store from '../store/index'
import Login from '@/pages/login/login'
import Corporation_datum from '@/pages/corporation_datum/corporation_datum'
import Corporation_update from '@/pages/corporation_update/corporation_update'
import Personage_datum from '@/pages/personage_datum/personage_datum'
import Personage_update from '@/pages/personage_update/personage_update'

Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.use(Router)

const router = new Router({
    // mode: 'history',
    // base:'/pms/',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Login
        },
        {
            path: '*',
            name: 'not',
            component: Login
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/corporation_datum',
            name: 'Corporation_datum',
            component: Corporation_datum,
            meta: {
                requireAuth: true //需要加校检判断的路由
            }
        },
        {
            path: '/corporation_update',
            name: 'Corporation_update',
            component: Corporation_update,
            meta: {
                requireAuth: true //需要加校检判断的路由
            }
        },
        {
            path: '/personage_datum',
            name: 'Personage_datum',
            component: Personage_datum,
            meta: {
                requireAuth: true //需要加校检判断的路由
            }
        },
        {
            path: '/personage_update',
            name: 'Personage_update',
            component: Personage_update,
            meta: {
                requireAuth: true //需要加校检判断的路由
            }
        }
    ]
})


// 页面刷新时，重新赋值 更新vuex内部值
try {
    if (window.localStorage.getItem('phone')) {

        let userInfo = {
            phone:localStorage.getItem('phone'),
        }
        store.commit('login',userInfo)
        console.log("刷新")
    }
} catch (e) {

}

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.isLogin=='success') {
            console.log('%c login success!','color:red;background:yellow')
            next();
        }
        else {
            console.log('%c please login!','color:blue;background:yellow')
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
})

export default router;
