<template>
    <div>
    <div class="title" >
      <!-- <p>团队:{{this.teamName}}</p> -->
      <p>团队文档：</p>
    </div>
        <li v-for="item in data">
            <docCard :docObj="item" :fav="0"></docCard>
        </li>
    </div>
</template>

<script type="text/ecmascript-6">
import docCard from './docCard';
const axios = require('axios');
const data = [

];
export default {
   name: 'teamdoc',
  props: {
    teamid: {
      type: Number
    },
    teamName:{
      type:String
    }
  },

  components: {
    docCard,
  },
  data(){
    return {
      data,
    }
  },

  mounted() {
    var _this = this;
    let formData = new FormData();
    formData.append("groupid", _this.teamid);
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:8080/api/api/get_group_docs", formData, config)
      .then(function (response) {
        if (response) {
          _this.data = response.data;
          console.log(response.data);
        } else {
          alert("请先登录！");
        }
      })
      .catch(function (error) {
        console.log("wrong", error);
      });
  },
}
</script>
<style>

  .titleimg{
    float: left;
    display: inline;
    margin-top: 17px;
    margin-left: 10px;
  }
  .title{
    float: left;
    display: inline;
    margin-top: 20;
    margin-left: 10px;
  }
  .createbutton{
    float: right;
    display: inline;
    margin-top: 5px;
    margin-right: 30px;
  }
</style>
