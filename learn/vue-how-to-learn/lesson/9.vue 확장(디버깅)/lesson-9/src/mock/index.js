import Axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(Axios)

mock.onGet('/todo-list').reply(200, require('./list.json'))
mock.onPost('/login').reply(config => {
  console.log(config)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // promise 요청 거절
      if (config.data.username === 'error') {
        reject({error: '네트워크 오류！'})
      }
      // promise 요청을 전달하십시오.
      if (config.data.username === 'admin' && config.data.password === '123456') {
        resolve([200, { success: true }])
      } else {
        resolve([200, {
          success: false,
          errorMsg: '계정 비밀번호가 잘못되었습니다.！'
        }])
      }
    }, 1000)
  })
})
// 요청 실패 테스트
mock.onPost().reply(500)

export default mock
