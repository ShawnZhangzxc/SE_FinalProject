<template>
  <div id="app">
  <el-container>

    <el-header>
    <el-col :span="1">
    <img src="../public/symbol.jpg" alt="Hi!" style="width:50px;height:50px">
    </el-col>
    <el-col :span="11">
      <h2 id="docname">阿巴阿巴文档</h2>
    </el-col>
    <el-col :span="12">
      <nav>
      <router-link to="/register">注册</router-link> |
      <router-link to="/login">登录</router-link> |
      <router-link to="/work">使用</router-link> |
      <router-link to="/about">帮助</router-link>  
      </nav>
    </el-col>
    </el-header>

    <el-container>
       <el-aside width="150px">

      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      style=" background-color: #FFFFFF"
      @open="handleOpen"
      @close="handleClose">
      
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>个人中心</span>
        </template>
        <el-menu-item>
            <router-link to="/personalinfo">个人信息</router-link>
        </el-menu-item>
        <el-menu-item>
           <router-link to="/keptdoc">我的收藏</router-link>
        </el-menu-item>
        <el-menu-item>
            <router-link to="/recent">最近浏览</router-link>
        </el-menu-item>
      </el-submenu>
      
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>我的团队</span>
        </template>
        <el-menu-item>
            <router-link to="/joinedgroup">我加入的团队</router-link>
        </el-menu-item>
        <el-menu-item>
            <router-link to="/createdgroup">我创建的团队</router-link>
        </el-menu-item>
        <!-- <el-menu-item>
            <router-link to="/buildinggroup">新建团队</router-link>
        </el-menu-item> -->
      </el-submenu>
      
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>我的文档</span>
        </template>
        <el-menu-item>
            <router-link to="/personaldoc">个人文档</router-link>
        </el-menu-item>
        <el-menu-item>
            <router-link to="/groupdoc">团队文档</router-link>
        </el-menu-item>
        <el-menu-item>
           <router-link to="/trashbin">文档回收站</router-link>
        </el-menu-item>
      </el-submenu>

      
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>消息通知</span>
        </template>
        <el-menu-item>
             <router-link to="/systemnews">所有通知</router-link>
        </el-menu-item>
        <!-- <el-menu-item>
            <router-link to="/groupnews">团队通知</router-link>
        </el-menu-item> -->

      </el-submenu>

      </el-menu>
      </el-aside>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>

  </el-container>


  </div>
</template>

<style> 
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav a{
  text-decoration: none;
  padding-top: 20px;
  color:#000000;
}
nav {
  padding:20px;
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
}
#docname {
   text-align: left;
   font-family:  "YouYuan";
}

nav a.router-link-exact-active {
  color:#0080ff;
}

.el-header {
    background-color: #FFFFFF;
    color: #333;
    text-align: right;
    line-height: 15px;
    border-bottom: solid 1px;
  }

.el-main {
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
    line-height: 20px;
    min-height:640px;
  }

.el-aside {
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
    line-height: 200px;
    border-right: solid 1px;
  }

</style>
