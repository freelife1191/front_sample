<template>
  <div>
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1"><router-link to="/">홈페이지</router-link></el-menu-item>
      <el-menu-item index="2" :style="{float: 'right'}">
        <router-link v-show="!user.name" to="/login">로그인</router-link>
        <el-dropdown @command="loginOut">
          <span :style="{color:'#FFF'}" v-show="user.name">
          {{user.name}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command>로그 아웃</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
    <el-card class="box-card">
      <p>Hello {{user.name}}</p>
    </el-card>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    data() {
      return {
        activeIndex:'1',
        user:{
          name:''
        }
      }
    },
    beforeCreate(){
      // 홈 페이지가 새로 고침 될 때 서버가 토큰을 설정하면
      // 시간이되면 로그인하지 않은 상태로 표시됩니다.
      this.$http.get('/api/token')
        .then(res => {
          console.dir(res.data)
          if (res.data.error) {
            this.userLoginOut();
            this.$message.error(res.data.error);
            this.user.name = null;
            return false;
          }else{
            let username = localStorage.getItem('username');
            if (username) {
              this.user.name = username;
            }
          }
        })
        .catch(err => {
            this.$message.error(`${err.message}`)
        })
      
    },
    methods: {
      ...mapActions(['userLoginOut']),
      // 로그 아웃 loginOut
      loginOut(){
        this.userLoginOut();
        this.user.name = null;
        if (!this.$store.state.token) {
            this.$router.push('/login')
            this.$message.success('성공적으로 로그 아웃돼었습니다.');
        } else {
            this.$message.success('로그 아웃하지 못했습니다.');
        }
        
      }
    }
  }
</script>
