<template>

  <el-popover
    placement="bottom"
    title="新建文档"
    width="500"
    trigger="click">
    <el-button slot="reference">创建一个新的文档</el-button>

    <el-form ref="form" :model="newdocform" label-width="80px">
         <el-form-item label="文档标题">
         <el-input v-model="newdocform.title"></el-input>
         </el-form-item>

        <el-form-item label="选择模板">
            <el-select v-model="templateValue" placeholder="请选择模板" style="width: 100%;">
            <el-option label="模板一（空白模板）" value="1"></el-option>
            <el-option label="模板二" value="2"></el-option>
            <el-option label="模板三" value="3"></el-option>
            </el-select>
         </el-form-item>

        <el-form-item >
            
            <el-button type="primary" @click="createdoc()" style="margin-left:30%;">创建</el-button>
           
        </el-form-item>
        </el-form>

</el-popover>


</template>


<script type="text/ecmascript-6">

const axios = require('axios');
const data = [];
function myrefresh() {
  window.location.reload();
}

export default {
name: 'createDoc',
  components: {
  },
  data() {
    return {
      templateValue:"",
      data,
      top: 0,
      visible: false,
      DocumentID: {
        type: Number,
      },
      newdocform:{
        title:"",
        modify_right:1,
        share_right:1,
        discuss_right:1,
        content:""
      },
      content2:"# 欢迎使用 阿巴阿巴文档模版1\n"+
        " ------\n"+
        "为了更好的使用文档,**AbaAba Markdown** 提供了两套模版系统 \n"+
        "> * 整理知识，学习笔记\n"+
        "> * 发布日记，杂文，所见所想\n"+
        "> * 撰写发布技术文稿（代码支持）\n"+
        "> * 撰写发布学术论文\n"+
        "![cmd-markdown-logo](https://www.zybuluo.com/static/img/logo.png)\n",
      content3:
        "# 欢迎使用 阿巴阿巴文档模版2\n"+
        " ------\n"+
        "为了更好的使用文档,**AbaAba Markdown** 提供了两套模版系统 \n"+
        "以下是markdown简要使用说明\n"+
        "# Title1\n"+
        "## Title2\n"+
        "### Title3\n"+
        "content\n"+
        "==\n"+
        "content2\n"+
        "--\n"+
        "content3\n"+
        "--\n"+
        "* name\n"+
        "- name\n"+
        "+ name\n"+
        "* [I'm an inline-style link](https://www.google.com)\n"+
        "* Inline `code` has `back-ticks around` it.\n"+
        "```javascript\n"+
        "var s = \"JavaScript syntax highlighting\";\n"+
        "alert(s);\n"+
        "```"  
    };
  },
  methods: {
    successmsg(message) {
      this.$message.success(message);
    },
    errormsg(message) {
      this.$message.error(message);
    },
  
    createdoc(){
      if (this.newdocform.title == ""){
              this.errormsg("标题不能为空");
              return;
            }
      switch(this.templateValue){

        case 1:
          break;
        case 2:
          this.newdocform.content=this.content2;
          break;
        case 3:
          this.newdocform.content=this.content3;
          break;
        default:
            break;
      }
      this.newdoc();
    },
    newdoc() {
      var _this=this;
      let formData = new FormData();
      formData.append("username", localStorage.getItem("token"));
      formData.append("title", _this.newdocform.title);
      formData.append("modify_right", _this.newdocform.modify_right);
      formData.append("share_right", _this.newdocform.share_right);
      formData.append("discuss_right", _this.newdocform.discuss_right);
      formData.append("content", _this.newdocform.content);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios.post("http://localhost:8080/api/api/create_personal_doc", formData, config)
        .then(function (response) {
          if (response.data.message == "success") {
            _this.successmsg("创建成功");
            setTimeout(() => {
              myrefresh();
            }, 2000);
          } 
          else {
            _this.errormsg("创建失败，请尝试刷新后再次创建1");
          }
        })
        .catch(function (error) {
          console.log(error)
          _this.errormsg("创建失败，请尝试刷新后再次创建2");
        });
    },
  },
  
};
</script>
<style>
</style>
