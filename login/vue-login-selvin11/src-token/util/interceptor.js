import axios from 'axios'
import router from '@/router'
import store from '@/store'

axios.default.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json'


// axios 요청 가로 채기
axios.interceptors.request.use(
    config => {
        // 토큰 localStorage가 있는지 여부를 확인한 다음 각 http 헤더와 토큰을 비교합니다.
        if (localStorage.getItem('token')) {
            config.headers.Authorization = `token ${localStorage.getItem('token')}`
                .replace(/(^\")|(\"$)/g, '')
        }else{
            router.replace({
                path: 'login',
                query: {
                    redirect: router.currentRoute.fullPath
                }
            })
        }
        return config
    },
    err => {
        return Promise.reject(err)
    })


// axios 인터셉트 응답
axios.interceptors.response.use(response => {
    // 점프의 기초로 반환 된 checkLogin json 데이터의 백 엔드
    if (!response.data.token) {
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