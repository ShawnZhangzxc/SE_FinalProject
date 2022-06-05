<template>
  <div>
    <el-col :span="6" :offset="18">
      <el-popover
          placement="top-start"
          width="200"
          trigger="hover"
          content="点我创建一个新团队
          o(*￣▽￣*)ブ">
        <el-button type="primary" slot="reference" @click="showTeamForm" round>+</el-button>
      </el-popover>
    </el-col>

    <div id="TeamForm">
    <el-form v-if="newTeamFormVisible" ref="newTeamForm" :model="newTeamForm" label-width="100px">

      <el-form-item
        prop="groupName"
        label="团队名称"
        :rules="[{required: true, message: '团队名不能为空！',trigger: 'change'}]"
      >
        <el-input v-model="newTeamForm.groupName"></el-input>
      </el-form-item>
      <el-form-item
        prop="description"
        label="团队简介"
      >
        <el-input type="textarea" v-model="newTeamForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createTeam('newTeamForm')" :disabled="!creatable">立即创建</el-button>
        <el-button @click="resetForm('newTeamForm')">重置</el-button>
        <el-button type="info" @click="cancelCreate('newTeamForm')">取消</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
function myrefresh() {
  window.location.reload();
}
export default {
  name:"BuildingGroup",
  data(){
    return{
      creatable: false,
      userId:"",
      newTeamFormVisible:false,
      //新建团队信息表单
      newTeamForm:{
        groupName:"",
        description:"",
      }
    }
  },
  watch:{"newTeamForm.groupName":{
      immediate:true,
      handler(){
        this.creatable = this.newTeamForm.groupName !== '';
      }
    }},
  methods:{
    successmsg(message) {
      this.$message.success(message);
    },
    errormsg(message) {
      this.$message.error(message);
    },
    load_userId(){
      this.userId = localStorage.getItem("token");
    },
    showTeamForm(){
      this.newTeamFormVisible = true
    },
    createTeam(){
        alert('新建团队')
        var _this = this;
        let formData = new FormData();
        formData.append("username", localStorage.getItem("token"));
        formData.append("groupname", this.newTeamForm.groupName);
        formData.append("description", this.newTeamForm.description);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        axios
            .post(
                "http://localhost:5000/api/creategroup/",
                formData,
                config
            )
            .then(function (response) {
              if (response.data.message === "success") {
                _this.successmsg("创建成功");
                setTimeout(() => {
                  myrefresh();
                }, 2000);
              } else {
                _this.errormsg("创建失败，请尝试刷新后再次创建");
              }
            })
            .catch(function () {
              _this.errormsg("创建失败，请尝试刷新后再次创建");
            });

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancelCreate(formName){
      //alert('团队名称为'+this.newTeamForm.groupName)
      this.resetForm(formName)
      this.newTeamFormVisible = false
    }
  },
  mounted() {
    this.load_userId();
  }
}

</script>


<style>
#TeamForm{
  width: 500px;
  margin-left: 300px;
}

</style>

