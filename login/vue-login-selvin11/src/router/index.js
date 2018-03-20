import Vue from 'vue'
import Router from 'vue-router'
// import axios from 'axios'
import store from '@/store/index.js'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'

Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        name: 'home',
        // 라우팅 요소 정보 meta
        meta: {
            requireLogin: true // 이 경로에 로그인해야 함을 나타내는이 필드를 추가하십시오.
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
// 브라우저를 새로 고치지 마십시오.
// 로그인 할 필요가 있고 로그인 할 필요가없는 각 로그인 사이에서 점프하는 인터셉터를 구현했습니다.
// 하단은 다른 라우팅 차단 프로그램의 다른 두 개의 차단, 생각을 기록하는 것입니다

// router.beforeEach((to, from, next) => {
//     if (to.meta.requireLogin) {
//     // 상태에 user.name이 있는지 판단하여
//     // 저장소의 코드를 탐색하여 이해합니다.
//     //이 예제는 상태를 단순화하고 프로세스 만 실행했습니다.
//     // !!하지만 사용자 정보가 vuex가 관리하는 전역 상태에만 포함되는지 여부
//     // 브라우저가 새로 고침되면 모든 상태가 비게되고 매번 로그인 페이지로 리디렉션됩니다.
//     // 그래서 가로 채기의 의미가있다. 맨 아래에 설명이있다.
//         if (store.state.user.name) {
//             next();
//         } else {
//             // next({path:xxx})현재 탐색이 중단되고 새로운 탐색이 수행됩니다.
//             next({
//                 path: '/login',
//                 // $router.path 
//                 // URL 쿼리 매개 변수를 나타내는 키 / 값 객체입니다.
//                 // 예를 들어 경로 / foo에 대해 $ route.query.user == 1? User = 1,
//                 // 쿼리 매개 변수가 없으면 빈 개체입니다.
//                 //처음에는 / (Home)을 가정하고 로그인하지 말고 점프 / 로그인 할 다음 경로
//                 //성공적으로 로그인 한 후 redirect => to.fullPath (즉, 경로를 입력) => / (홈)
//                 query: {
//                     redirect: to.fullPath
//                 }
//                 // 경로를 매개 변수로 전달한 다음 성공적인 로그인 후 경로로 점프합니다.
//                 // $ router.fullPath 구문 분석 된 URL. 쿼리 매개 변수와 해시에 대한 전체 경로가 들어 있습니다.
//             })
//         }
//     } else {
//         next();
//     }
// })


// 이제 모든 경로가 차단되었습니다.
// 그러나이 방법은 단순한 프런트 엔드 라우팅 제어 일뿐입니다.
// 사용자가 로그인 권한이 필요한 경로에 액세스하는 것을 실제로 막지는 못하며 다음과 같은 문제점이 있습니다.
// 1. 모든 경로에 액세스 할 수 있습니다. 입력하면 강제로 로그인 페이지로 이동합니다.
// 브라우저가 새로 고쳐지면 상태가 지워지기 때문에 매번 로그인 페이지로 리디렉션됩니다.
// 3. 서버의 세션이 실패했지만 localStorage에 저장된 사용자 정보를 노화에 따라 자동으로 제거 할 수없는 경우
// ------ 솔루션 ------
// 처음에는 내 프로그램이 홈 페이지와 같은 페이지에 로그인해야합니다.
// 생성 된 훅 함수에서,
// 페이지 새로 고침이 요청을 전달할 때까지 백엔드 API를 요청합니다.
// 세션이 실패하면 오류 코드를 반환하고 프론트 엔드를 지워서 localStorage의 사용자 정보를 지울 수 있습니다
// 그러나 문제는 분명하다, 필요가 더 많은 상태 라우팅에 로그인 할 때, 당신은 각각을 설정할 필요가있다.


// 전역 적으로 마운트 할 수있는 http 요청 인터셉터가 필요합니다. Axios의 인터셉터 모듈을 사용하여 위의 프로세스를 사용하여 글로벌 요청을 요청하십시오
// /util/interceptor.js는 axios 응답 차단을 구현합니다.



// 다른 두 옵션을 생각하는 라우팅을 생각하다.
// 프로그램 하나
// 백엔드에서 백엔드 API를 요청합니다.

// router.beforeEach((to, from, next) => {

//     if (to.meta.requireLogin) {
//         // 세션 api의 백엔드에 요청
//         axios.get('/api')
//             .then(res => {
//                 // console.dir(res.data)
//                 if (res.data.error) {
//                     next({
//                         // 세션이 실패하면 로그인 페이지로 이동합니다.
//                         path: '/login',
//                         // 점프 후 매개 변수 리디렉션에 지정된 URL 앞에 점프
//                         query: {
//                             redirect: to.fullPath
//                         }
//                     })
//                 } else {
//                     next();
//                 }
//             })
//             .catch(err => {
//                 console.dir(err);
//             })

//     } else {
//         next();
//     }
// })

// 프로그램 2 :
// localStorage의 존재에 따라 기준을 결정하고,
// 로그인 상태가 필요한 페이지를 입력 할 때마다 (home.vue 및 store / mutations.js 참조)
// 세션 수를 얻기 위해 API에 액세스 할 수 있으므로 요청 수가 처음으로 증가합니다.
// router.beforeEach((to, from, next) => {
//     let session = localStorage.getItem('session')
//     if (to.meta.requireLogin) {
//         if (session) {
//             next();
//         } else {
//             next({
//                 path: '/login',
//                 query: {
//                     redirect: to.fullPath
//                 }
//             })
//         }

//     } else {
//         next();
//     }
// })


export default router;