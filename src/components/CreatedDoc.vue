<template>
    <div> 
    <div class="title">
      <p>我创建的文档</p>
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
   name: 'createddoc',
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
      .post("http://localhost:8080/api/api/my_created_docs", formData, config)
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
</style>