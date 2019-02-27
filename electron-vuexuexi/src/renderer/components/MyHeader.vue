<template>
     <div id="myHeader">
        <div class="titlebtn">
            <div class="min"  @click="min"> <img src="../assets/min.png" alt=""></div>
            <div class="max"><button  @click="max"> [] </button></div>
            <div class="close"><button @click="close"> X </button></div>     
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    min() {
      //广播给主进程 到主进程
      this.$electron.ipcRenderer.send("window-min");
    },
    max() {
      this.$electron.ipcRenderer.send("window-max");
    },
    close() {
      this.$electron.ipcRenderer.send("window-close");
    }
  }
};
</script>


<style lang="scss">
#myHeader {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background-color: rgb(198, 47, 47);
  -webkit-app-region: drag;
}

.titlebtn {
  position: relative;
  width: 200px;
  height: 30px;
  line-height: 30px;
  float: right;
//自定义拖拽
  -webkit-app-region: drag;

  .min {
    position: absolute;
    background: "green";
    right: 100px;
    width: 20px;

    img {
      width: 100%;

      margin-top: 6px;
    }
  }
  .max {
    position: absolute;
    background: "yellow";
    right: 60px;
    width: 20px;
  }
  .close {
    position: absolute;
    background: "black";
    right: 20px;
    width: 20px;
  }
}
</style>
