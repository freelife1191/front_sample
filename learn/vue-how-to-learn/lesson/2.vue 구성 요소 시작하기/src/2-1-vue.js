//문법
Vue.component('table-item', {
  //고발 된 혹,'another-text'
  props: ['text', 'anotherText'],
  template: '<th>{{text}}-{{anotherText}}</th>'
})

new Vue({
  el: '#lesson1',
  data: {
    people: [
      { name: '허우 쾅핑', birth: 1970 },
      { name: '첸 록', birth: 1940 },
      { name: '리 타탄 - 강', birth: 1961 },
      { name: '가오 샤오퀸', birth: 1976 }
    ]
  }
})

//동적 구문
Vue.component('child', {
  props: ['myMessage'],
  template: '<p>{{myMessage}}</p>'
})

new Vue({
  el: '#lesson2',
  data: {
    parentMsg: 'Hello World!'
  }
})

//prop검증
Vue.component('table-type', {
  props: {
    sn: Number,
    text: String,
    'another-text': {
      type: String,
      required: true
    }
  },
  template: '<th>{{sn}}.{{text}} {{anotherText}}</th>'
})

new Vue({
  el: '#lesson3'
})