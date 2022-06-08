<template>
  <div>
    <div>
      <div id="group-introduce">团队名</div>
      <hr/>
    </div>
    <el-row>
      <el-col :span=2>
        <el-button @click="historyReturn" icon="el-icon-back" >返回</el-button>
      </el-col>
    </el-row>
    <div id="word-display">
      <div class="word">文档</div>
      <div class="word">文档</div>
      <div class="word">文档</div>
      <div class="word">文档</div>
      <div class="word">文档</div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: "GroupHome",
  data(){
    return{
      historyData:'return'
    }
  },
  methods:{
    historyReturn(){
      this.$emit('isClick',this.historyData);
    }
  }
}
</script>

<style scoped>
*{

}
#return-button{
  border-radius: 5px;
  background-color: grey;
  color: black
}
#group-introduce{
  font-family: "华文行楷";
  padding-left: 70px;
  line-height: 25px;
  text-align: left;
  font-size:35px;
  border-radius: 5px;
  background-color: #fcfcfd;
  width:auto;
  height:75px;
}
#word-display{
  margin:0 auto;
  width: 1300px;
  border-radius: 7px;
  background-color: #fcfcfd;
  padding: 20px 15px;
}
.word{
  line-height: 70px;
  background-color: #efefef;
  border-radius: 5px;
  height: 70px;
  width: auto;
}
.word:hover{
  background-color: #fefefe;
}
</style>
