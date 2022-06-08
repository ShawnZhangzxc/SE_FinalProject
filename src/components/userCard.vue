<template>
    <div>
        <el-popover
        placement="bottom"
        title=""
        width="500"
        trigger="hover">
         <!-- <el-button slot="reference" >{{username}}</el-button> -->
         <el-avatar slot="reference"> {{username}} </el-avatar>
         <userInfo v-bind:userName="username"></userInfo>
        </el-popover>
    
    </div>
</template>

<script>
import userInfo from '../components/userInfo';

const axios = require('axios');

export default {
  name: 'userCard',
  components:{
      userInfo,
  },
  props: {
    username: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'user'
    }
  },

  data() {
    return {
      
    };
  },
  mounted(){
    if(this.username!=localStorage.getItem('token')){
      this.sayh=true;
    }
  },
  methods: {
    successmsg(message) {
      this.$message.success(message);
    },
    gotoUserInfo() {
      this.$router.push('/userInfo/'+this.username);
    },
  }
};
</script>