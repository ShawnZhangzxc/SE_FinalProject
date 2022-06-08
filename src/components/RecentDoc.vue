<template>
    <div> 
    <div class="title">
      <p>最近浏览的文档</p>
    </div>

    <div class="titleimg">
      <i class="el-icon-s-order"></i>
    </div>

    <div class="createbutton">
      <createDoc></createDoc>
    </div>

        <li v-for="item in data">
            <docCard :docObj="item" :fav="0"></docCard>
        </li>
    </div>
</template>



<script type="text/ecmascript-6">
import docCard from './docCard';
import createDoc from './CreateDoc';
const axios = require('axios');
const data = [
   
];
export default {
   name: 'recentdoc',
  components: {
    docCard,
    createDoc,
  },
  data(){
    return {
      data,
    }
  },

  mounted() {
    var _this = this;
    let formData = new FormData();
    formData.append("username", localStorage.getItem("token"));
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:8080/api/api/show_recent_doc", formData, config)
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