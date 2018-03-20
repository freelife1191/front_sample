import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from '../component/App.vue'
import Login from '../component/Login.vue'
import UserInfo from '../component/UserInfo.vue'
//상태 관리
Vue.use(Vuex)
//라우팅
Vue.use(VueRouter)

//라우팅 구성
//메뉴를 추가해야하는 경우 여기에 경로를 추가하고 UserMenu.vue에 항목을 추가하십시오. router-link
const router = new VueRouter({
  routes: [{
    path: '/login',
    component: Login
  }, {
    path: '/user_info',
    component: UserInfo
  }]
})

//Vuex구성
const store = new Vuex.Store({
  state: {
    domain:'http://test.example.com', //백그라운드 요청의 주소를 저장하고 편의를 수정하십시오 (예 : 테스트 서비스에서 공식 서비스 도메인 이름）
    userInfo: { //사용자 정보 저장
      nick: null,
      ulevel: null,
      uid: null,
      portrait: null
    }
  },
  mutations: {
    //사용자 정보 업데이트
    updateUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    }
  }
})

//쿠키를 설정하고 vue 인스턴스에 추가하여 전역 호출을 용이하게합니다.
//vue 전역 호출이 필요한 이유는 일부 구성 요소에서 사용하는 인터페이스가 세션 유효성 검사를 요구할 수 있기 때문입니다. 세션은 쿠키에서 가져옵니다
//물론 세션을 vuex에 저장하는 경우는 예외입니다.
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  var exdate = new Date();　　　　
  exdate.setDate(exdate.getDate() + expiredays);　　　　
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//cookie가져 오기、
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
Vue.prototype.getCookie = getCookie;

//cookie삭제
Vue.prototype.delCookie =(name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }

//vue인스턴스
var app = new Vue({
  data: {},
  el: '#app',
  render: h => h(App),
  router,
  store,
  watch:{
    "$route" : 'checkLogin'
  },
  created() {
    this.checkLogin();
  },
  methods:{
    checkLogin(){

      //session 존재 확인
      if(!this.getCookie('session')){
        this.$router.push('/login');
      }else{
        this.$router.push('/user_info');
      }
    }
  }
})