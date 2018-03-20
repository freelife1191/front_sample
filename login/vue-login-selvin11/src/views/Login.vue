<template>
  <el-card class="box-card">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-form 
          label-position="left" 
          label-width="80px" 
          :model="formLogin"
          :rules="rules"
          ref="formLogin">
          <!-- $ refs는 구성 요소가 렌더링 된 후에 만 채워지고 응답하지 않습니다. 단지 하위 구성 요소에 대한 직접적인 응답으로 사용됩니다. 템플릿 또는 계산 된 속성에서 $ refs를 사용하지 마십시오. 。 -->
          <el-form-item label="계정" prop="name">
            <el-input v-model="formLogin.name"></el-input>
          </el-form-item>
          <el-form-item label="비밀번호" prop="password">
            <el-input v-model="formLogin.password"></el-input>
          </el-form-item>
          <el-form-item label="암호 확인" prop="checkPassword">
            <el-input v-model="formLogin.checkPassword"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="login">로그인</el-button>
              <el-button @click="resetForm">취소</el-button>
          </el-form-item>
          <el-form-item>
            <router-link to="/register">
              <el-button type="">계정 없음, 지금 등록하십시오<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script type="text/javascript">
  // vuex /src/helper.js에 보조 함수를 소개합니다.
  // actions의 메소드를 컴포넌트의 메소드로 직접 변환합니다.
  import {mapActions} from 'vuex'

  export default {
    data(){
      let checkUserName = (rule,value,cb)=>{
        if(!value){
          return cb(new Error('계정은 비워 둘 수 없습니다.!'))
        }else{
          cb(); // 뒤를 판단해라.
        }

      }
      let checkPassword = (rule,value,cb)=>{
        if(!value){
          return cb(new Error('비밀번호는 비워 둘 수 없습니다.!'))
         }else{
          cb();
         }
      }
      let checkPasswordAgain = (rule,value,cb)=>{
        if(!value){
          return cb(new Error('암호를 다시 입력하면 비워 둘 수 없습니다.!'))
         }else if(value !== this.formLogin.password){
          return cb(new Error('일치하지 않는 암호를 두 번 입력하십시오.!'));
         }else{
          cb();
         }
      }
      return{
        formLogin:{
          name: '',
          password: '',
          checkPassword: ''
        },
        rules:{
          name:[
            {validator:checkUserName,trigger: 'blur'}
          ],
          password:[
            {validator:checkPassword,trigger: 'blur'}
          ],
          checkPassword:[
            {validator:checkPasswordAgain,trigger: 'blur'}
          ]
        }
      }
    },
    methods:{
      ...mapActions(['userLogin']),
      // 로그인 인터페이스에 대한 요청 시작
      login(){
        let user = this.formLogin;
        let formData = {
          name: user.name,
          password: user.password
        };
        // 양식 유효성 검사
        this.$refs['formLogin'].validate((valid) => {
          if (valid) {
            // 인증 요청 로그인 인터페이스 후
            this.$http.post('/api/login',formData)
                .then(res => {
                    console.dir(res.data)
                    if (res.data.success) {
                      this.userLogin(res.data);
                      this.$message.success(`${res.data.message}`)
                      // 로그인 성공 홈페이지로 이동
                      // this.$router.push({name:'Home'}) 
                      this.$router.push('/')
                    }else{
                      this.$message.error(`${res.data.message}`);
                      return false;
                    }
                })
                .catch(err => {
                    this.$message.error(`${err.message}`, 'ERROR!')
                })
          } else {
            this.$message.error('表单验证失败!')
            return false;
          }
        });
      },
      // 양식 재설정
      resetForm(){
        console.log('session')
        this.$refs['formLogin'].resetFields();
      }
    }
  }
</script>