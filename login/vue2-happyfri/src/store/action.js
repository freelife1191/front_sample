import ajax from '../config/ajax'

export default {
	addNum({ commit, state }, id) {
		//다음 질문을 클릭하고 답변 ID를 기록하여 마지막 질문이 아닌지 확인한 후 다음 질문으로 건너 뜁니다.
		commit('REMBER_ANSWER', id);
		if (state.itemNum < state.itemDetail.length) {
			commit('ADD_ITEMNUM', 1);
		}
	},
	//정보 초기화
	initializeData({ commit }) {
		commit('INITIALIZE_DATA');
	}
}