# vue-example-login
> ** 좋은 스타 지원을 느껴 ~ **
> Github의 주소 : https://github.com/doterlin/vue-example-login (https://github.com/doterlin/vue-example-login)
> 프레젠테이션 주소 : https://doterlin.github.io/vue-example-login (https://doterlin.github.io/vue-example-login)

실행 : index.html을 직접 엽니 다.

## 기술 스택
+ [vue.js] (https://vuejs.org/v2/guide/) 기본 프레임 워크
+ [vuex] (https://vuex.vuejs.org/) 상태 관리
+ [vue-router] (https://router.vuejs.org/) 경로 관리

일반 과정
일반 로그인 프로세스에서 프런트 엔드 시나리오는 다음과 같습니다.
1. 상태 확인 : 페이지에 들어가거나 ** 라우팅 변경 ** 로그인 상태가 있는지 확인하십시오 ( '쿠키'또는 '로컬 저장소'값에 저장 됨).
2. 로그인 상태 쿼리 로그인 정보 (uid, avatar, etc ...)가 있으면 저장하고, 그렇지 않으면 로그인 페이지로 건너 뜁니다.
3. 로그인 페이지 (또는 로그인 상자)에서 사용자 입력 정보가 ​​유효한지 확인하십시오.
4. 검사를 통과 한 후 등록 요청을 보내고 사용자에게 실패한 피드백을 확인합니다.
실패 로그인 사용자가 실패한 메시지이며, 'session` 로그인 상태 정보 저장 (아마도 점프)의 후단에서 꺼낸 5. 성공적인 로그인 데이터;
6. 사용자를 로그 아웃하여 로그인 상태를 삭제하십시오.

내가 하나씩 단계를 게시 아래 https://github.com/doterlin/vue-example-login](https://github.com/doterlin/vue-example [의 코드를 모두 구현 코드를 어떻게 분석 할 수 -login) 및 코드를 이해하는 데 도움이되는 자세한 설명이 포함되어 있습니다.

이 전에 우리는 로그인 페이지 경로가`/ login`이고 로그인 경로가`/ user_info`라고 가정했습니다. 이것은`App.vue`에`router-view`를 넣고 두 경로를 저장하고 렌더링합니다.

```javascript
// component/App.vue
<template>
<div class="container" id="app">
  <transition name="fade">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
</div>
</template>
...
```
그리고`vue-router '설정을해라 :
```javascript
// js/app.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../component/Login.vue'
import UserInfo from '../component/UserInfo.vue'

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [{
    path: '/login',
    component: Login
  }, {
    path: '/user_info',
    component: UserInfo
  }]
})
...
```

## 상태 확인 및 점프
2 번에 상태를 확인해야합니다 : * 사용자가 페이지를 열면 * 1, 경로가 변경되면 * 2 *

먼저 check 로그인 상태 메쏘드`checkLogin`을 써야합니다 :
```javascript
// js/app.js
...
var app = new Vue({
  data: {},
  el: '#app',
  render: h => h(App),
  router,
  store,
  methods:{
    checkLogin(){
      // 세션이 있는지 확인하십시오.
      // 소스 또는 참조 온라인에서의 쿠키 조작 메소드
      if(!this.getCookie('session')){
        //로그인 상태가 없으면 로그인 페이지로 건너 뜁니다.
        this.$router.push('/login');
      }else{
        //그렇지 않으면 로그인 페이지로 이동하십시오.
        this.$router.push('/user_info');
      }
    }
  }
})
```
  
사용자 환경을 향상시키기 위해 사용자 **가 ** 페이지를 열면 프런트 엔드는 로그인했는지 여부를 확인해야하며 사용자가 다시 로그인 할 필요가 없습니다. 이 구현은 매우 간단하며`vue instance`의`generated` 훅에서 작성했습니다 :
```javascript
// js/app.js
...
var app = new Vue({
  ...
  created() {
    this.checkLogin();
  },
  methods:{
    checkLogin(){
     ...
    }
  }
})
```
또한 '라우팅'변경 사항은 로그인 확인, 다음 시나리오 (라우팅 변경)가 필요합니다. 로그인 상태를 확인하지 않으면 잘못된 것일 수 있습니다.
+ 사용자가 페이지에 들어갈 때 로그인했지만 작업을 수행하는 동안 로그인이 오래되었습니다.
+ 사용자가 쿠키 / 로컬 저장소를 수동으로 삭제하고 작업을 수행합니다.
+ 로그인하지 않고 로그인해야하는 경로를 사용자가 직접 입력하거나 (즐겨 찾기에서 입력하는 경우)
+ 사용자가 로그인 할 때 로그인 페이지 라우팅을 입력합니다.

라우팅을 모니터하는 이유가되기에 충분하기 때문에`vue``watch` 함수를 사용할 수 있습니다 :

```javascript
// js/app.js
...
var app = new Vue({
  ...
  //监听路由检查登录
  watch:{
    "$route" : 'checkLogin'
  },

  //进入页面时
  created() {
    this.checkLogin();
  },

  methods:{
    checkLogin(){
     ...
    }
  }
})
```
이 시점에서 우리는`일반적인 프로세스 '의 첫 번째 단계를 완료했다. 다음으로, 사용자의 개인 정보를 얻는 방법.

## 2. 사용자 정보 얻기
로그인이 성공한 후에는 일반적으로 닉네임, 아바타, 레벨 등 백엔드 사용자의 정보를 표시해야합니다. 백엔드에서 http 요청을받는 것은 쉽지만, (예를 들어, 일반적으로 uid는 각 백엔드 인터페이스에서 매개 변수로 취해야하므로 전역 상태 (`vuex`)로 저장해야합니다.
```javascript
// component/App.vue
...
<script>
export default {
  ...
  mounted(){
    //구성 요소가 마운트되기 시작할 때 사용자 정보 가져 오기
    this.getUserInfo();
  },
  methods: {
    //사용자로부터 일부 정보 요청
    getUserInfo(){
      this.userInfo = {
        nick: 'Doterlin',
        ulevel: 20,
        uid: '10000',
        portrait: 'images/profile.png'
      }

      //정보 요청 받기
      ts.$http.get(url, {
        //매개 변수
        "params": this.userInfo
      }).then((response) => {
        //Success
        if(response.data.code == 0){
          this.$store.commit('updateUserInfo', this.userInfo); 
        }
      }, (response) => {
        //Error
      });

    }
  }
}
</script>
...
```
물론,`app.js`로 작성하거나`store.js`를 별도로 작성하고`app.js` (권장)와 같이 이전에 설정해야합니다 :
```javascript
// js/app.js
// Vuex구성
...
const store = new Vuex.Store({
  state: {
    domain:'http://test.example.com', //백그라운드 요청의 주소를 저장하고 편의를 수정하십시오 (예 : 테스트 서비스에서 공식 서비스 도메인 이름으로).
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
...
```

## 체크섬을 입력하고 로그인 요청을 보냅니다.
예기치 않은 문자 및 너무 빈번한 요청이 백그라운드로 확산되는 것을 방지하기 위해 사용자 입력의 프론트 엔드가 중복 요청을 확인하고 방지합니다. 물론, 다른 사이트는 다른 합법적 인 문자를 가지고 있으며, 무효 인``만 유효합니다 :
```javascript
//component/Login.vue
<template>
<div class="login" id="login">
   ...
    <div class="log-email">
        <input type="text" placeholder="Email" :class="'log-input' + (account==''?' log-input-empty':'')" v-model="account"><input type="password" placeholder="Password" :class="'log-input' + (password==''?' log-input-empty':'')"  v-model="password">
        <a href="javascript:;" class="log-btn" @click="login">Login</a>
    </div>
    ...
</div>
</template>
<script>
import Loading from './Loading.vue'
export default {
  name: 'Login',
  data(){
  	return {
          isLoging: false,
  		account: '',
  		password: ''
  	}
  },
  components:{
    Loading
  },
  methods:{

  	//로그인 로직
  	login(){
  		if(this.account!='' && this.password!=''){
  			this.toLogin();
  		}
  	}

}
</script>
...
```
`this.toLogin`은 로그인 요청 방법입니다. 백엔드에 대한`post` 패스워드는 보통`hash algorithm`과 같이 암호화 후에 설정된 백엔드 규칙에 따라 직접 보내지지 않습니다. 이중 해시 암호화, 대략`js / sha1.min.js` 참조 :
```javascript
...
    //로그인 요청
  	toLogin(){

  	// 비밀 번호를 이해하는 백엔드와 암호화 규칙
    // 다음은 해시 알고리즘의 예입니다./js/sha1.min.js
  		let password_sha = hex_sha1(hex_sha1( this.password ));

  		//다시 전송 된 매개 변수에 로그인해야합니다.
  		let loginParam = {
  			account: this.account,
  			password_sha
  		}

          //로그인시 설정
          this.isLoging = true;
      
  		//백엔드 요청
  		this.$http.post( 'example.com/login.php', {
  		param: loginParam).then((response) => {
            if(response.data.code == 1){
              //로그인이 성공하면 로그인 상태를 저장하고 만료 날짜를 설정하십시오
              let expireDays = 1000 * 60 * 60 * 24 * 15;
              this.setCookie('session', response.data.session, expireDays);
              //이동
              this.$router.push('/user_info'); 
            }
	      }, (response) => {
	        //Error
	      });

...
```

이것으로 처음 3,4,5 단계가 완료됩니다. 마지막 단계는 취소하는 것입니다.

## 로그 아웃
취소가 필요하지 않을 때 백엔드를 작성해야하는 몇 가지 필요 사항 중 저장된 로그인 상태를 삭제하는 것이 중요합니다.
```javascript
// component/UserInfo.vue
...
   logout(){
     쿠키를 삭제하고 로그인 페이지로 이동하십시오.
      this.isLogouting = true;
      // logout.php와 같이 백 엔드를 요청합니다.
      // this.$http.post('eaxmple.com/logout.php')...
      // 성공 후 쿠키 삭제
      this.delCookie('session');

      //녹화 상태 재설정
      this.isLogouting = false;

      //로그인 페이지로 이동
      this.$router.push('/login/');
    }
...
```

>   이것으로 간단한 로그인 프론트 엔드 작업이 완료되고 위의 내용이 개인에 의해 실행되고 요약됩니다.
>   틀린 사람이라면 조언을 해주시고 의논하십시오.

