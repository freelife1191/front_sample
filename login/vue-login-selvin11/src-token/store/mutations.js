import * as types from './mutation-types'

// vuex 사용법에 대해서는 실제로 행의 프로세스를 이해한다.
// vuex -> 액션 -> 돌연변이 커밋 -> 상태 ->보기 -> 디스패치 트리거 액션 -> ...
// actions는 실제로 돌연변이가 상태를 동 기적으로 변경하고 비동기 적으로 변경하지 못하도록하는 업데이트 된 버전의 돌연변이입니다.
// actions는 비동기로 변경할 수있는 커밋입니다.
// 내 블로그 요약을보십시오 http://selvinpro.com/2017/03/17/vuex-about/#more
export const mutations = {
  // 여기에 제출 된 데이터를 참조하십시오.
  // / api / login에서 반환 된 token. name, messeage와 같은 정보가 들어 있습니다.
  [types.LOGIN](state, data) {
    // 로컬에 token 및 username 저장
    localStorage.setItem('token', data.token)
    state.token = data
    localStorage.setItem('username', data.name)
    state.username = data.name
      // vuex의 핵심 역할은 구성 요소 들간의 복잡한 상태를 관리하는 것입니다 (장바구니 논리 등 ...)
      // 브라우저가 새로 고쳐지면이 상태도 함께 비 웁니다.
      // 로그인 / 로그 아웃 메커니즘을 저장하려면 브라우저에 장기간 보관해야합니다.
      // 그래서 여기에 localStorage를 사용합니다.
      // 프런트 엔드 논리 처리의 가능성을 크게 높이는 vuex 라이브러리의 성격을 이해하십시오.
  },
  [types.LOGINOUT](state) {
    localStorage.removeItem('token');
    state.token = null
    localStorage.removeItem('username');
    state.username = null;
  }
}

export default mutations