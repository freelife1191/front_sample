import axios from 'axios'
import router from '@/router'
import store from '@/store'

axios.default.timeout = 5000



// axios 인터셉트 응답
axios.interceptors.response.use(response => {
    // 점프의 기초로 백엔드 checkLogin에 의해 반환 된 Json 데이터
    if (!response.data.session) {
        router.replace({
            path: 'login',
            query: {
                redirect: router.currentRoute.fullPath
            }
        })
    }
    return response
}, err => {
    return Promise.reject(err)
})

export default axios;