var todo = new Vue({
    el: '#todo',
    data: {
        todoNew: '',
        todoList: []
    },
    methods: {
        todoAdd: function () {
            //텍스트 내용, 완료된 완료 상태, 편집 가능한 편집 상태 3 가지 속성을 포함하여 할 일 데이터 객체 추가
            //빈 입력 상자를 추가합니다.
        },
        todoRemove: function (index) {
            //완료 할 데이터 삭제
        },
        editTodo: function (index) {
            //해야 할 일 편집 데이터
        }
    },
    filters: {
        editShow: function (value) {
            //키 텍스트 스위치는 각각 "확인"및 "편집", 편집 "삭제"버튼 상태가 비활성화됩니다
        }
    },
    computed: {
        todoTotal: function () {
            //todo:나머지는 끝내라.
        }
    }
})