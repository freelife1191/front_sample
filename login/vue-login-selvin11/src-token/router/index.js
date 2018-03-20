import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'
import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'

Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        name: 'home',
        // 라우팅 메타 정보 메타
        meta: {
            requireAuth: true //이 경로에 로그인해야 함을 나타내는이 필드를 추가합니다.
        },
        component: Home
    }, {
        path: '/login',
        name: 'login',
        component: Login
    }, {
        path: '/register',
        name: 'register',
        component: Register
    }]
})

// 경로 차단 설정
// vue-router 전역 훅에 인터셉터를 설정합니다.
// 각 경로는 후크 함수가됩니다.
//에서 다음 배달을 떠나기 위해 입장합니다.
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    if (to.meta.requireAuth) {
        if (token) {
            next()
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next()
    }
})

export default router;