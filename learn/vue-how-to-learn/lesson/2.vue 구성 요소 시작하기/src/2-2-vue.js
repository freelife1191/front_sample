Vue.component('table-item', {
  props: ['text', 'anotherText'],
  template: '<tr><th>{{text}}-{{anotherText}}</th></tr>'
})

Vue.component('table-add', {
  props: ['addName', 'addBirth'],
  template: '<button v-on:click="tableAdd">추가</button>',
  methods: {
    tableAdd: function () {
      var p = { name: this.addName, birth: this.addBirth }
      this.$emit('table-add', p)
    }
  }
})

Vue.component('table-del', {
  template: '<button v-on:click="tableDelete">제거</button>',
  methods: {
    tableDelete: function () {
      this.$emit('t-delete');
    }
  }
})

new Vue({
  el: '#lesson1',
  data: {
    people: [
      { name: '허우 쾅핑', birth: 1970 },
      { name: '첸 록', birth: 1940 },
      { name: '리 타탄 - 강', birth: 1961 },
      { name: '가오 샤오퀸', birth: 1976 }
    ],
    newName: '',
    newBirth: ''
  },
  methods: {
    peopleAdd: function (data) {
      this.people.push(data);
    },
    peopleDel: function () {
      this.people.pop();
    }
  }
})
