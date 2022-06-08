<template>
    <div> 
    <div class="title">
      <p>文档回收站</p>
    </div>

    <div class="titleimg">
      <i class="el-icon-s-order"></i>
    </div>



        <li v-for="item in data">
            <docCard :docObj="item" :fav="4"></docCard>
        </li>
    </div>
</template>
<script type="text/ecmascript-6">
import axios from "axios";
import docCard from './docCard';

const data = [
];
export default {
   name: 'dustbindoc',
  components: {
    docCard,
  },
  data() {
    return {
      data,
    };
  },
  methods: {
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
      .post("http://localhost:8080/api/api/my_deleted_docs", formData, config)
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
};
</script>
<style>
</style>
