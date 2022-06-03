<template>

<div style="width: 100%">
  <div id="register-page-title">
    <h1>欢迎一起阿巴阿巴</h1>
  </div>

  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" >
    <el-form-item label="用户名" prop="userName" >
      <el-input v-model="ruleForm.userName" autocomplete="off" class="input" ></el-input>
    </el-form-item>

    <el-form-item
    prop="email"
    label="邮箱"
    :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
    >
    <el-input v-model="ruleForm.email"></el-input>
  </el-form-item>

    <el-form-item label="密码" prop="pass" >
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off" class="input" ></el-input>
    </el-form-item>

    <el-form-item label="确认密码" prop="checkPass">
     <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
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

      var validateemail=(rule,value,callback)=>{
        if(value==''){
        callback(new Error('请输入邮箱'));
        }else{
          callback();
         }
      };

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          userName: '',
          email: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' },
            {
               required: true
            }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' },
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
          ],
          email:[
            {
              validator:validateemail,trigger:'blur'
            },
            {
               required: true
            }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          let formData = new FormData();
          formData.append('username', this.ruleForm.userName);
          formData.append('password', this.ruleForm.pass);
          formData.append('email', this.ruleForm.email);
          let config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          };
          var _this = this
          axios.post('http://localhost:5000/api/regist/',formData,config)
              .then(function (response) {
                  if (response.data.message=="success"){
                    _this.successmessage("注册成功");
                    setTimeout(() => {
                      myrefresh();
                    }, 2000);
                  }
                  else if(response.data.message=="fail"){
                    _this.errormessage("用户名或者邮箱已存在");
                  }
                  else {
                    _this.errormessage("未知错误，请稍后再试")
                  }
              })
              .catch(function () {
                _this.errormessage("未知错误，请稍后再试")
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>




<style>
#register-page-title{
  font-family:  "YouYuan";
}
.demo-ruleForm{
  margin-left: 400px;
  margin-right:400px;
}

</style>