<template>

<div style="width: 100%">
  <div id="login-page-title">
    <h1>欢迎使用阿巴阿巴文档</h1>
  </div>

  <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="demo-loginForm" >
    <el-form-item label="用户名" prop="userName" >
      <el-input v-model="loginForm.userName" autocomplete="off" class="input" ></el-input>
    </el-form-item>

  

    <el-form-item label="密码" prop="pass" >
      <el-input type="password" v-model="loginForm.pass" autocomplete="off" class="input" ></el-input>
    </el-form-item>



    <el-form-item>
      <el-button type="primary" @click="checklogin()">登录</el-button>
      <el-button @click="resetForm('loginForm')">重置</el-button>
    </el-form-item>
  </el-form>

</div>

</template>

<script>
  export default {
    data() {
      var validateuserName = (rule, value, callback) =>{
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };

      return {
        loginForm: {
          pass: '',
          userName: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' },
            {
               required: true
            }
          ],
          userName:[
            {
              validator:validateuserName,trigger:'blur'
            },
            {
               required: true
            }
          ]

        }
      };
    },
    methods: {
      checklogin(){
      let formData = new FormData();
      formData.append('username', this.loginForm.userName);
      formData.append('password', this.loginForm.pass);
      let config = {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      };
      var _this = this
      axios.post('http://localhost:5000/api/login/',formData, config)
          .then(function (response)  {
              if (response.data.message!='fail') {
                  _this.wronglog.wl = false;
                  _this.rightlog.rl = true;
                  localStorage.setItem('token',_this.loginForm.userName);
                  localStorage.setItem('userid', response.data.id);
                  console.log("用户登录" + localStorage.getItem("userid"));
                  // _this.$router.push('/');

                  
                  // _this.$router.go(0)
              }else {
                  _this.wronglog.wl=true;
                  _this.rightlog.rl=false;
              }
          })
          .catch(function () {
             _this.errormessage("未知错误，请稍后再试")
          });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>




<style>
#login-page-title{
  font-family:  "YouYuan";
}
.demo-loginForm{
  margin-left: 400px;
  margin-right:400px;
}

</style>