const ADD_ITEMNUM = 'ADD_ITEMNUM'
const REMBER_ANSWER = 'REMBER_ANSWER'
const REMBER_TIME = 'REMBER_TIME'
const INITIALIZE_DATA = 'INITIALIZE_DATA'
export default {
	//다음 질문으로 이동하려면 클릭하십시오.
	[ADD_ITEMNUM](state, num) {
		state.itemNum += num;
	},
	//대답을 기록하십시오.
	[REMBER_ANSWER](state, id) {
		state.answerid.push(id);
	},
	/*
	질문을 할 시간 기록하기
	 */
	[REMBER_TIME](state) {
		state.timer = setInterval(() => {
			state.allTime++;
		}, 1000)
	},
	/*
	정보 초기화,
	 */
	[INITIALIZE_DATA](state) {
		state.itemNum = 1;
		state.allTime = 0;
		state.answerid = [];
	},
}