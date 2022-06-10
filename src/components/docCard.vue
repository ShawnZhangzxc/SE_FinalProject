<template>
  <div>

<el-card class="box-card"  style="width: 100%">
  <div slot="header" class="clearfix">
    <span>{{docObj.title}}</span>


<el-dropdown style="float: right; padding: 3px 0">
  <span class="el-dropdown-link">
    操作文档<i class="el-icon-arrow-down el-icon--right"></i>
  </span>

  <el-dropdown-menu slot="dropdown" >
    <el-dropdown-item v-if="fav<4">
        <i class="el-icon-edit" @click="toDocs(docObj.id)">编辑文档</i>
    </el-dropdown-item>
    <el-dropdown-item v-if="fav<4">
        <i class="el-icon-edit"  @click="showModal()">修改标题</i>
    </el-dropdown-item>
    <el-dropdown-item v-if="fav!=1&&fav<4">
        <i class="el-icon-star-off"  @click="addFavorDocs()">收藏文档</i>
    </el-dropdown-item>
    <el-dropdown-item v-if="fav==1">
        <i class="el-icon-star-on"  @click="delFavorDocs()">取消收藏</i>
    </el-dropdown-item>
    <el-dropdown-item v-if="fav<4">
        <i class="el-icon-delete" @click="confirmDelete(1)">删除文档</i>
    </el-dropdown-item>
    <el-dropdown-item v-if="fav==4">
        <i class="el-icon-refresh-left" @click="revoverDoc(docObj.id)">恢复文档</i>
    </el-dropdown-item>
    <el-dropdown-item v-if="fav==4">
        <i class="el-icon-delete-solid" @click="confirmDelete(2)" >彻底删除</i>
    </el-dropdown-item>
 </el-dropdown-menu>


</el-dropdown>


<el-dialog
  title="请输入新标题"
  :visible.sync="visible"
  width="30%"
  :before-close="handleClose">
  <span>
  
  <el-input v-model="form.title" ></el-input>

  </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleCancel()">取 消</el-button>
    <el-button type="primary" @click="handleOk()">确 定</el-button>
  </span>
</el-dialog>





  </div>
  <div  class="text item">
      <span> 创建者: {{ this.username }}</span>
      <br/><br/>
      <span> 创建日期 : {{ moment(docObj.created_time).format("YYYY-MM-DD") }}</span>
  </div>
</el-card>





  </div>
</template>

<script>

const axios = require('axios');
import moment from "moment";

function myrefresh() {
  window.location.reload();
}
export default {
  name: 'docCard',

  props: {
    docObj: {
      id: {type: Number,dafault: 0},
      title: {type: String,default: ''},
      created_time: {type: String, default: ''}
    },
    fav: {
      type: Number
    }
  },

  data(){
    return{
      form: {
        DocumentID: "",
        title: "",
        fav: "",
        creator_id: ""
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      visible: false,
      creator_id: "",
      group_id: "",
      moment,
      username: "",
    }
    
  },

  watch: {
    docObj: {
      handler(newVal) {
        this.form.DocumentID=newVal.id;
        this.form.title=newVal.title;
        this.form.creator_id = newVal.creator_id;  // 文档的创建者
        this.form.group_id = newVal.group_id   // 文档所属的组
        this.group_id = newVal.group_id
        var _this = this;
        let formData = new FormData();
        formData.append("userid", this.form.creator_id);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        axios.post("http://localhost:8080/api/api/get_user_byid", formData, config)
          .then(function (response) {
            if (response) {
                _this.username = response.data.username
            } else {
              _this.errormsg("恢复失败，请稍后重试");
            }
          })
          .catch(function () {
            _this.errormsg("恢复失败，请稍后重试");
          });
      },
      deep: true,
      immediate: true
    },
    fav: {
      handler(newVal) {
        this.form.fav = newVal.fav;
      },
      deep: true,
      immediate: true
    }
  },
  mounted: function() {
    
  },

  methods: {
    successmsg(message) {
      this.$message.success(message);
    },
    errormsg(message) {
      this.$message.error(message);
    },
    toDocs(id) {
      //这边判断是否能看，比如occupied
      this.$router.push("/doc/" + id);
    },

    deleteDocs(flag,self) {
      console.log("删除该项" + self.form.DocumentID);
      let formData = new FormData();
      formData.append("documentID", self.form.DocumentID);
      formData.append("username", localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      if(flag == 1) {
          axios.post("http://localhost:8080/api/api/recycle_doc", formData, config)
        .then(function (response) {
          console.log(response.data.message);
          if (response.data.message == "success") {
            self.successmsg("删除成功");
            setTimeout(() => {
              myrefresh();
            }, 1500);
          } else {
            self.errormsg("删除失败，请尝试刷新后重试");
          }
        })
        .catch(function () {
          self.errormsg("删除失败，请尝试刷新后重试");
        });
      }
      else {
        axios.post("http://localhost:8080/api/api/del_doc", formData, config)
          .then(function (response) {
            console.log(response.data.message);
            if (response.data.message == "success") {
              self.successmsg("彻底删除成功");
              setTimeout(() => {
                myrefresh();
              }, 1500);
            } else {
              self.errormsg("彻底删除失败，请尝试刷新后重试");
            }
          })
          .catch(function () {
            self.errormsg("彻底删除失败，请尝试刷新后重试");
          });
      }
      
    },

    confirmDelete(x) {
      var _this = this
      console.log("文档创建者id" + this.form.creator_id)
      console.log("登录id " + localStorage.getItem("userid"))
      if(this.form.creator_id != localStorage.getItem("userid")) {
        this.errormsg("您没有权限");
        return;
      }
      this.$confirm('确认删除',{
        confirmButtonText: '是',
         cancelButtonText: '否', //相当于 取消按钮
         type: 'warning'
         }).then(() =>{
           _this.$options.methods.deleteDocs(x, _this);
         })
      // this.$confirm({
      //   title: <div style="font-weight:bold">确认删除？</div>,
      //   content: (x==1)?<div style="color:red;">文件将被移入回收站</div>:<div style="color:red;">文件将<span style="font-weight:bold"> 永 远 消 失 ！</span></div>,
      //   okText: '删除',
      //   okType: 'danger',
      //   cancelText: '取消',
      //   onOk() {
      //     console.log('OK');
      //     _this.$options.methods.deleteDocs(x, _this);
      //   },
      //   onCancel() {
      //     console.log('Cancel');
      //   },
      // });
    },

    addFavorDocs() {
      console.log("收藏该项" + this.form.DocumentID);
      var _this=this;
      let formData = new FormData();
      formData.append("documentID", this.form.DocumentID);
      console.log(this.form)
      formData.append("username", localStorage.getItem("token"));
      console.log(localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post("http://localhost:8080/api/api/favor_doc", formData, config)
        .then(function (response) {
          console.log(response.data.message);
          if (response.data.message == "success") {
            _this.successmsg("收藏成功");
          } else {
            _this.errormsg("您已经收藏过改文档了哦");
          }
        })
        .catch(function () {
          _this.errormsg("收藏失败，请尝试刷新后重试");
        });
    },
    delFavorDocs() {
      console.log("取消收藏该项" + this.form.DocumentID);
      var _this=this;
      let formData = new FormData();
      formData.append("documentID", this.form.DocumentID);
      console.log(this.form)
      formData.append("username", localStorage.getItem("token"));
      console.log(localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios.post("http://localhost:8080/api/api/cancel_favor_doc", formData, config)
        .then(function (response) {
          console.log(response.data.message);
          if (response.data.message == "success") {
            _this.successmsg("取消收藏成功");
            setTimeout(() => {
              myrefresh();
            }, 1500);
          } else {
            _this.errormsg("取消收藏失败，请尝试刷新后重试");
          }
        })
        .catch(function () {
          _this.errormsg("取消收藏失败，请尝试刷新后重试");
        });
    },
    revoverDoc(id) {
      var _this = this;
      let formData = new FormData();
      formData.append("documentID", id);
      console.log("documentId " + id)
      formData.append("username", localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios.post("http://localhost:8080/api/api/recover_doc", formData, config)
        .then(function (response) {
          if (response.data.message == "success") {
            _this.successmsg("恢复成功");
            setTimeout(() => {
              myrefresh();
            }, 1500);
          } else {
            _this.errormsg("恢复失败，请稍后重试");
          }
        })
        .catch(function () {
           _this.errormsg("恢复失败，请稍后重试");
        });
    },
    showModal() {
      if(this.form.creator_id != localStorage.getItem("userid")) {
        this.errormsg("您没有权限")
        return;
      } 
      this.form.title = this.docObj.title;
      this.form.DocumentID = this.docObj.id;
      this.visible = true;
    },
    handleOk() {
      if(this.form.creator_id != localStorage.getItem("userid")){
        this.errormsg("你不是创建者，不能修改")
        return;
      }
      var _this = this;
      let formData = new FormData();
      formData.append("documentID", this.form.DocumentID);
      formData.append("title", this.form.title);
      formData.append("username", localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios.post("http://localhost:8080/api/api/modify_doc_basic", formData, config)
        .then(function (response) {
          if (response.data.message == "success") {
            _this.successmsg("修改成功！");
            setTimeout(() => {
              myrefresh();
            }, 1500);
          } else {
            _this.errormsg("修改失败，您不是文档的创建者！");
          }
        })
        .catch(function () {
          _this.errormsg("修改失败，请尝试刷新后再次修改！");
        });
    },
    handleCancel() {
      this.visible = false;
    },
    handleClose(){
      console.log("okay的")
    }
  },
}
</script>


<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100px;
  }

    .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>