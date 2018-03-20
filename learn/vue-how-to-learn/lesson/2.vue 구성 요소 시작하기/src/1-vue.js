//전역등록
Vue.component('table-title', {
  template: '<p>전역으로 등록 된 구성 요소입니다.!</p>'
})

Vue.component('table-item', {
  template: '<th>{{text}}</th>',
  //구성 요소의 데이터 속성은 함수로 표현됩니다.
  data: function () {
    return {
      text: '전역 등록 양식 구성 요소'
    }
  }
})

new Vue({
  el: '#lesson1'
})

//부분 등록
var Child1 = {
  template: '<div>나는 부분적으로 등록 된 구성 요소이다.!</div>'
}

new Vue({
  el: '#lesson2',
  components: {
    //고발 된 혹,'table-comp'
    tableChild: Child1
  }
})

//구성 요소 내의 로컬 등록
var Child2 = {
  template: '<div>나는 로컬 컴포넌트 내의 컴포넌트이다.!</div>'
}

//구성 요소 안의 다른 하위 구성 요소 참조
Vue.component('table-father', {
  //템플릿에 하나의 루트 노드 만있을 수 있으므로 여기에 하위 구성 요소를 부모로 묶어야합니다.
  template: '<div><table-title></table-title>전역으로 등록 된 구성 요소입니다！<table-child></table-child></div>',
  components: {
    'table-child': Child2
  }
})

new Vue({
  el: '#lesson3'
})