<template>
  <div >
    <!-- 这是我加入的团队 页面 -->
    <div id="group-show">
      <div v-if="judge === 'join'" class="head-line">我加入的团队</div>
      <div v-if="judge === 'create'" class="head-line">我创建的团队</div>
      <group-infobox group-name="软工小队" grouper="Shake" group-id="" user-i-d="" :judge="judge"></group-infobox>
      <group-infobox group-name="建模小队" grouper="Wu" group-id="" user-i-d="" :judge="judge"></group-infobox>
      <group-infobox v-for="item in message"
                     :user-i-d="item.userId"
                     :group-id="item.groupId"
                     :grouper="item.grouper"
                     :group-name="item.groupName"
      :judge="judge">
      </group-infobox>
    </div>
  </div>
</template>

<script>
import GroupInfobox from "@/components/GroupInfobox";
export default {
  name:"GroupDisplay",
  components: {GroupInfobox},
  props:{
    judge: {
      type:String,
      required:true
    }
  },
  data(){
    return{
      userId:"",
      message: [
        {
          userId:"1234",
          groupId:"200001",
          grouper:"徐悲鸿",
          groupName:"马到成功"
        },
        {
          userId:"5678",
          groupId:"200002",
          grouper:"齐白石",
          groupName:"虾米"
        },
      ]
    }
  },
  methods:{
    load_userId(){
      this.userId = localStorage.getItem("token");
    }
  },
  mounted() {
    this.load_userId();
    var _this = this;
    let formData = new FormData();
    formData.append('userId',this.userId)
    formData.append("username", localStorage.getItem("token"));
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    };
    axios.post("http://localhost:5000/api/joined_group/", formData, config)
        .then(function (response) {
          _this.data().message = response.data();
        })
        .catch(function () {
          _this.errormsg("退出失败，请尝试刷新后重试");
        });
  }
}
</script>

<style>
#group-show{
  padding-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.7);
  border-radius:10px;
  background-color: #ebebeb;
  width: 700px;
  margin:0 auto;
}
.head-line{
  font-size: 30px;
  height: 60px;
  line-height: 50px;
}


</style>
