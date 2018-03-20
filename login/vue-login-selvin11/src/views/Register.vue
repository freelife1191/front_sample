<template>
  <el-card class="box-card">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-form
         label-position="left" 
         label-width="80px" 
         :model="formRegister"
         :rules="rules"
         ref="formRegister">
          <el-form-item label="계정" prop="name">
            <el-input v-model="formRegister.name"></el-input>
          </el-form-item>
          <el-form-item label="비밀번호" prop="password">
            <el-input v-model="formRegister.password"></el-input>
          </el-form-item>
          <el-form-item label="암호 확인" prop="checkPassword">
            <el-input v-model="formRegister.checkPassword"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="addUser">지금 등록하십시오</el-button>
              <el-button>취소</el-button>
            </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script type="text/javascript">
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
         }else if(value !== this.formRegister.password){
          return cb(new Error('일치하지 않는 암호를 두 번 입력하십시오.!'));
         }else{
          cb();
         }
      }

      return{
        formRegister:{
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
      // 사용자 등록
      addUser(){
        let user = this.formRegister;
        let formData = {
          name: user.name,
          password: user.password
        };
        // 양식 유효성 검사
        this.$refs['formRegister'].validate((valid)=>{
          if(valid){
            this.$http.post('/api/register',formData)
            .then(res => {
              console.dir(res.data)
              if (res.data.error) {
                this.$message.error(res.data.error);
                return false;
              }else{
                this.$router.push('/login')
              }
            })
            .catch(err => {
                this.$message.error(`${err.message}`)
            })
          }else{
            this.$message.error('양식 유효성 검사에 실패했습니다.!')
            return false;
          }
        })
      }
    }
  }
</script>