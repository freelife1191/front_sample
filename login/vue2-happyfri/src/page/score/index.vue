<template>
  	<div>
    	<div class="your_scores_container">
            <header class="your_scores"><span class="score_num">{{score}}</span><span class="fenshu">分！</span></header>
            <div class="result_tip">{{scoreTips}}</div>
        </div>
        <div class="share_button" @click="showCover"></div>
        <div class="share_code">
            <header class="share_header">포도 집 걱정, 대답 해.。</header>
            <img src="../../images/4-4.png" height="212" width="212" class="code_img"> 
        </div>
        <div class="share_cover" v-show="showHide" @click="showCover">
            <img src="../../images/5-2.png" class="share_img">
        </div>
  	</div>
</template>

<script>
import {mapState} from 'vuex';
export default {
	name: 'score',
    data(){
        return {
            showHide: false, //팁 표시 여부
            score: 0, //점수
            scoreTips:'', //점수 팁
            rightAnswer: [2, 7, 12, 13, 18], //정답
            scoreTipsArr:['당신은 지식이 초등 교사에게 돌려 보내지지 않는다고 말합니까?','나쁘지는 않지만 계속 나아갈 필요가 있습니다!','출혈을 피하십시오. 개선의 여지가 있습니다!','IQ는 버스트 테이블에서 한 걸음 떨어져 있습니다!','당신도 똑똑한 친구, 포도 집에 오신 것을 환영합니다!'],
        }
    },
    computed: mapState(['answerid']),
	created(){
        this.computedScore();
        this.getScoreTip();
        document.body.style.backgroundImage = 'url(./static/img/4-1.jpg)';
    },
    methods: {
        //점수 계산하기
        computedScore(){
            this.answerid.forEach((item, index) => {
                if (item == this.rightAnswer[index]) {
                    this.score += 20;
                }
            })
        },
        //공유 팁 표시 여부
        showCover: function (){
            this.showHide = !this.showHide;
        },
        //점수에 따라 팁 표시
        getScoreTip: function (){
            if(this.score <= 20) {
                this.scoreTips = this.scoreTipsArr[0];
                return
            }
            if(this.score <= 40) {
                this.scoreTips = this.scoreTipsArr[1];
                return
            }
            if(this.score <= 60) {
                this.scoreTips = this.scoreTipsArr[2];
                return
            }
            if(this.score <= 80) {
                this.scoreTips = this.scoreTipsArr[3];
                return
            }
            if(this.score <= 100) {
                this.scoreTips = this.scoreTipsArr[4];
            }
        }
    },
}

</script>

<style lang="less">
    body{
        background-image: url(../../images/4-1.jpg);
        padding-top: 1.2rem;
    }
    .your_scores_container{
        width: 9.7rem;
        height: 9.1rem;
        background: url(../../images/4-2.png) no-repeat;
        background-size: 100% 100%;
        margin: 0 auto 0;
        position: relative;
        .your_scores{
            position: absolute;
            width: 100%;
            text-indent: 3.3rem;
            top: 4.7rem;
            font-size: 1.4rem;
            font-weight: 900;
            -webkit-text-stroke: 0.05rem #412318;
            font-family: 'Microsoft YaHei';
            .score_num{
                font-family: Tahoma,Helvetica,Arial;
                color: #a51d31;
            }
            .fenshu{
                color: #a51d31;
            }
        }
        .result_tip{
            position: absolute;
            top: 7rem;
            width: 9rem;
            left: 0.6rem;
            color: #3e2415;
            font-size: 0.65rem;
            text-align: center;
        }
    }
    .share_button{
        width: 6.025rem;
        height: 2.4rem;
        margin: 0.8rem auto 0;
        background: url(../../images/4-3.png) no-repeat 0.4rem 0;
        background-size: 5.825rem 100%;
    }
    .share_code{
        width: 5.3rem;
        margin: 1.5rem auto 0;
        .share_header{
            color: #664718;
            font-size: 0.475rem;
            font-family: 'Microsoft YaHei';
            width: 7rem;
            font-weight: 500;
        }
        .code_img{
            height: 5.3rem;
            width: 5.3rem;
            margin-top: 0.5rem;
        }
    }
    .share_cover{
        position: fixed;
        bottom: 0;
        right: 0;
        top: 0;
        left: 0;
        background: url(../../images/5-1.png) no-repeat;
        background-size: 100% 100%;
        opacity: 0.92;
    }
    .share_img{
        height: 10.975rem;
        width: 11.95rem;
        position: fixed;
        top: 0.5rem;
        left: 50%;
        margin-left: -5.975rem;
    }
</style>
