<template>
  <div class="PersonalInfo" style="width:1000px;margin:0px auto;">


<el-descriptions class="margin-top" title="个人信息" :column="3"  border>
    <template slot="extra">
      <el-button type="primary" size="small" @click="ask_parents_to_dispaly_change()">修改</el-button> 
      <!-- @click="ask_parents_to_dispaly_change()" -->
    </template>
    <el-descriptions-item>
      <template slot="label">
         用户名
      </template>
      {{userObj.username}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
         邮箱
      </template>
      {{userObj.email}}
    </el-descriptions-item>
    
    <el-descriptions-item>
      <template slot="label">
        简介
      </template>
      {{userObj.description}}
    </el-descriptions-item>

  </el-descriptions>
  
  </div>
</template>

<style>


</style>



<script>

const axios = require('axios');


export default {
  name:'DisplayPersonalInfo',

  data(){
    return{
    //   loading:false,
    //   disabled:false,

      userObj: {
        username: '',
        email: '',
        description: '',
      },
    };
  },
  methods:{
      ask_parents_to_dispaly_change(){
          this.$parent.to_dispaly_change();
      }
  },
  mounted(){
    let formData=new FormData();
    formData.append('username',localStorage.getItem("token"));
    console.log(this.$route.params.username);
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    var _this=this;
    axios.post('http://localhost:8080/api/api/get_user',formData,config)
      .then(function(response) {
        if(response) {
          _this.userObj=response.data;
        }
      }).catch(error=> {
        console.log('error',error);
      })
  }
}
</script>