<template>

<div style="width: 100%">
  <div id="changeinfo-page-title">
    <h1>填写新的个人信息</h1>
  </div>


  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" >
    <el-form-item label="用户名" prop="userName" >
      <el-input v-model="ruleForm.username" autocomplete="off" class="input" ></el-input>
    </el-form-item>

    <el-form-item
    prop="email"
    label="邮箱"
    >
    <el-input v-model="ruleForm.email"></el-input>
  </el-form-item>

    <el-form-item label="新密码" prop="pass" >
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off" class="input" ></el-input>
    </el-form-item>

    <el-form-item label="确认新密码" prop="checkPass">
     <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="简介" prop="description" >
      <el-input v-model="ruleForm.description" autocomplete="off" class="input" ></el-input>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="changeInfo('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </el-form-item>
  </el-form>

</div>

</template>

<script>
const axios = require('axios');
 
function myrefresh() {
  window.location.reload();
}
export default {
  name: 'ChangePersonalInfo',

  data() {
      let validateusername=(rule,value,callback)=>{
      if(value==''){
        callback(new Error('用户名不能为空！'));
      }else {
        callback();
      }
    };

    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码！'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码！'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入的密码不匹配！"));
      } else {
        callback();
      }
    };

    let validateemail=(rule,value,callback)=>{
      if(value==''){
        callback(new Error('邮箱不能为空！'));
      }else{
        callback();
      }
    }
    return {
      PreUsername:'',
      ruleForm: {
        pass: '',
        checkPass: '',
        email:'',
        username:'',
        description:'',
      },

      rules: {
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        username:[{ validator: validateusername, trigger: 'change' }],
        email:[{ validator: validateemail, trigger: 'change' }],
      },
     
    };
  },

  methods: {
    ask_parents_to_dispaly_info(){
          this.$parent.to_display_info();
     },
    successmsg(message) {
      this.$message.success(message);
    },
    errormsg(message) {
      this.$message.error(message);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.username=this.data.username;
      this.ruleForm.checkPass=this.data.password;
      this.ruleForm.pass=this.data.password;
      this.ruleForm.email=this.data.email;
      this.ruleForm.description=this.data.description;
      this.ask_parents_to_dispaly_info(); 
    },
    changeInfo(formName) {
      var _this=this;
      if(this.ruleForm.description.length >12){
        _this.errormsg("简介太长啦")
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formData = new FormData();
          formData.append('new_username', this.ruleForm.username);
          formData.append('new_password1', this.ruleForm.pass);
          formData.append('new_email', this.ruleForm.email);
          formData.append('username',this.PreUsername);
          formData.append('new_description',this.ruleForm.description);
          let config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          };
          axios.post('http://localhost:8080/api/api/modify_user_info',formData,config)
              .then(function (response) {
                  if (response.data.message=="success"){
                    localStorage.setItem('token',_this.ruleForm.username);
                    _this.successmsg("修改成功");
                    setTimeout(() => {
                      myrefresh();
                    }, 2000);
                  }else {
                    _this.errormsg("用户名或邮箱已存在");
                  }
              })
              .catch(function () {
                  _this.errormsg("未知错误，请稍后重试");
              });
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    var _this=this;
    let formData = new FormData();
    this.PreUsername=localStorage.getItem('token');
    formData.append('username', this.PreUsername);
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    axios.post('http://localhost:8080/api/api/get_user',formData,config)
      .then(function(response) {
        if(response) {
          _this.ruleForm.username=response.data.username;
          _this.ruleForm.email=response.data.email;
          _this.ruleForm.pass=response.data.password;
          _this.ruleForm.checkPass=response.data.password;
          _this.ruleForm.description=response.data.description;
          _this.data=response.data;
        }else {
          _this.errormsg("请先登录")
        }
    }).catch(function() {
      _this.errormsg(" 未知错误，请稍后重试")
    });
  }
}

</script>




<style>
#changeinfo-page-title{
  font-family:  "YouYuan";
}
.demo-ruleForm{
  margin-left: 300px;
  margin-right:300px;
}

</style>