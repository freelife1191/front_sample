<template>
  	<div>
    	<itemcontainer father-component="item"></itemcontainer>
  	</div>
</template>

<script>
import itemcontainer from '../../components/itemcontainer'

export default {
	name: 'item',
  	components: {
   		itemcontainer
  	},
  	created(){
      //제목 페이지에 시작 타이밍
  		this.$store.commit('REMBER_TIME');
  	}
}

</script>

<style lang="less">
    

</style>
