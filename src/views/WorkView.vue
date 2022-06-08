<template>
  <div class="main">
  <div class="workview-top">

         <el-col :span="12" style="float:left;margin-bottom:0px;">
        <span style="float:left;margin-top:0px;">本地使用</span>
          </el-col>





          <el-col :span="12" style="margin-bottom:0px;">


          <el-breadcrumb separator="/" style="float:right;margin-bottom:5px;">
              <el-breadcrumb-item>
                <el-button type="text"  size="medium" @click="getPdf()">导出为PDF</el-button>
              </el-breadcrumb-item>
              <el-breadcrumb-item>
                <el-button type="text"  size="medium"@click="exportWord()">导出为Word</el-button>
              </el-breadcrumb-item>
          </el-breadcrumb>


          </el-col>
  </div>

            <mavon-editor
              v-model="content"
              ref="md"
              @change="change"
              style="min-height: 660px; z-index:1"
              :editable="modify_right"
              @save="getPdf()"
            />


  </div>
</template>

<script src="jszip/jszip.min.js"></script>
<script src="jszip/FileSaver.js"></script>
<script  type="text/javascript" charset="utf-8"  src="js/html2canvas.js"></script>
<script  type="text/javascript" charset="utf-8" src="js/jsPdf.debug.js"></script>
<script  type="text/javascript" charset="utf-8" src="js/canvas2image.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/jspdf/1.3.4/jspdf.debug.js"></script>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import moment from "moment";
import "@/utils/htmlToPdf.js";
import docxtemplater from 'docxtemplater';
import JSZip from "jszip";
import JSZipUtils from 'jszip-utils';
import {saveAs} from 'file-saver';


function myrefresh() {
  window.location.reload();
}

export default {
  name: "doc",
  components: {
    mavonEditor,
  },
  data() {
    return {
      htmlTitle: "导出文件",
      //定时刷新正在编辑的用户列表
      timer:'',
      userList:[],
      fav:2,
      visible:false,
      inviteuser:"",
      inviteColumns,
      invitedata:[],
      html: "",
      configs: {},
      collapsed: false,
      moment,
      keyword: "",
      form: {
        content: "",
        username: "",
        title: ""
      },
      content: "",
      sendjson:{
        content:"",
        username:"",
      },
    };
  },
  methods: {
    exportReport(){
      exportReportTemplet()
    },
    //刷新正在编辑的用户列表的方法
    exportWord: function() {
      let _this = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent('/template.docx', function(error, content) {
        // input.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
        // 抛出异常
        if (error) {
          console.log(error)
          throw error;
        }

        // 创建一个JSZip实例，内容为模板的内容
        let zip = new JSZip(content);
        // 创建并加载docxtemplater实例对象
        let doc = new docxtemplater().loadZip(zip);
        // 设置模板变量的值
        doc.setData({
          content: _this.content,
        });

        try {
          // 用模板变量的值替换所有模板变量
          doc.render();
        } catch (error) {
          // 抛出异常
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          };
          console.log(JSON.stringify({ error: e }));
          throw error;
        }

        // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        let out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        // 将目标文件对象保存为目标类型的文件，并命名
        saveAs(out, "Docs.docx");
      });
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
    successmsg(message) {
      this.$message.success(message);
    },
    errormsg(message) {
      this.$message.error(message);
    },
    warningmsg(message) {
      this.$message.warning(message);
    },
    //加载用户权限

    callback() {},


  destroyed() {
    clearInterval(this.timer);
    this.websock.close(); //离开路由之后断开websocket连接
  },
}
}
</script>



<style>

</style>
