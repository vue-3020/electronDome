<template>
  <div id="app">

    

<el-container :style="{'height':winHeight+'px'}">
  <el-aside :style="{'height':winHeight+'px'}">
      <el-menu :default-openeds="['1','2', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-location-outline"></i>起始页面</template>
          <el-menu-item index="2-4-1"><router-link to='home'>欢迎页面</router-link></el-menu-item>

        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>舆情报告</template>           
        
          <el-menu-item index="2-4-1"><router-link to='report'>全部舆情</router-link></el-menu-item>

          <el-menu-item index="2-4-1"><router-link to='report?id=1'>正面舆情</router-link></el-menu-item>
          
          <el-menu-item index="2-4-1"><router-link to='report?id=2'>负面舆情</router-link></el-menu-item>
          
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>舆情设置</template>            
          
            <el-menu-item index="3-1">
              <router-link to='keywords'>舆情关键字设置</router-link>
            </el-menu-item>

            <el-menu-item index="3-2">
                <router-link to='alarm'>舆情报警设置</router-link>
            
            </el-menu-item>          
          
        </el-submenu>
      </el-menu>
    </el-aside>
  
  <el-container class="main" :style="{'height':winHeight+'px'}">
     <router-view></router-view>
  </el-container>
</el-container>

    <!-- <router-link to="/">首页</router-link>
    <router-link to="/report">舆情报表</router-link>
    <router-link to="/keywords">舆情关键词设置</router-link>
    <router-link to="/alarm">舆情报警设置</router-link> -->
   
  </div>
</template>

<script>
export default {
  name: "electronproject",

  data() {
    return {
      winHeight: document.documentElement.clientHeight
    };
  },
  mounted() {
    window.onresize = () => {
      this.winHeight = document.documentElement.clientHeight;
    };
  }
};
</script>

<style lang="scss">
* {
  margin: 0px;
  padding: 0px;
}

.el-aside {
  width: 200px !important;
  background: #eee;
  a {
    color: #333;
    display: block;
    text-decoration: none;
  }
  .el-menu {
    background: #eee;
  }
}
.main {
  overflow-y: auto; /*溢出  出现滚动条*/
  // overflow-x: hidden;

  padding: 10px;

  width: 100%;
}

.content {
  width: 100%;
}


//全局表格

.electron-table{

  border-collapse: collapse;     //给表格设置合并边框模型

  width: 100%;
  

}
.electron-table tr td,.electron-table tr th{

  height: 30px;
  line-height: 30px;

  border:1px solid #eee;

  text-align: center;

  font-size: 14px;

  padding:5px;
}
</style>
