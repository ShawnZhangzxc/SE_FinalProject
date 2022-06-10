<template>
  <div>
    <p>用户名：{{userObj.username}}</p>
    <p>邮箱：{{userObj.email}}</p>
    <p>个人简介：{{userObj.description}}</p>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'userInfo',

  props: {
    userName: {
      type: String,
      required: true,
      // default:'123',
    },
  },
  
  data(){
    return{
      userObj: {
        username: '',
        email: '',
        description: '',
      },
    };
  },

  mounted(){
    var _this=this;
    let formData=new FormData();
    formData.append('username',_this.userName);
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    axios.post('http://localhost:8080/api/api/get_user',formData,config)
      .then(function(response) {
        if(response) {
          _this.userObj=response.data;
        }
      }).catch(error=> {
        console.log('error',error);
      })
  },
  // watch:{
  //   userName:{
  //     handler(newVal){
  //       var _this=this;
  //       let formData=new FormData();
  //       formData.append('username',newVal);
  //       let config = {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   };
  //   axios.post('http://localhost:8080/api/api/get_user',formData,config)
  //     .then(function(response) {
  //       if(response) {
  //         _this.userObj=response.data;
  //       }
  //     }).catch(error=> {
  //       console.log('error',error);
  //     })
  //     }
  //   }
  // }
}
</script>