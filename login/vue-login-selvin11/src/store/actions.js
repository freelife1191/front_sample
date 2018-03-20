import * as types from './mutation-types'

const actions = {
 // actions의 함수는 저장소 인스턴스와 동일한 속성 및 메서드를 가진 컨텍스트 개체를 허용합니다.
 // 따라서 컨텍스트에서 돌연변이에 정의 된 상태, getter 및 메서드를 호출 할 수 있습니다
 // userLogin (context) {
 // context.commit (types.LOGIN);
 //}
 // 코드를 단순화하기 위해 es6 함수 매개 변수 구조를 사용하면 context.commit => 직접 커밋 할 수 있습니다.
 // .vue 파일에서 상태 변경은 store.dispatch ( 'userLogin')에 의해 트리거됩니다.
 // 여기에있는 데이터는 변이를 커밋 할 때 / api / login에서 반환 된 사용자 객체를 검색해야하기 때문입니다.
  userLogin({
    commit
  }, data) {
    commit(types.LOGIN, data);
  },
  delUserSession({
    commit
  }, data) {
    commit(types.DELSESSION, data);
  },
  userLoginOut({
    commit
  }) {
    commit(types.LOGINOUT);
  }
}

export default actions