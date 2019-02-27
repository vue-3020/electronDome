<template>
    <div>
        <el-row>
            <el-button>默认按钮</el-button>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="info">信息按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
        </el-row>
        <div class="a">
            这是sass的内容
            <div class="b">

            </div>
        </div>
        
        <br>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="名称">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item label="活动形式">
                <el-input v-model="formLabelAlign.type"></el-input>
            </el-form-item>
            </el-form>
        <el-button type="danger" @click="btn">危险按钮</el-button>
        <br>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in lists" :key="o" class="text item">
                {{ o.name }} -- {{ o.region }}--{{ o.type }} --
                <el-button type="danger"  @click="updateData(o.name)">修改</el-button>--
                <el-button type="danger"  @click="deleteData(o.region)">删除</el-button>
            </div>
        </el-card>
        <br>
        <p>修改信息</p>
        <el-input v-model="formipnut"></el-input>
        <br>

    </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "right",
      formipnut: "",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
      lists: []
    };
  },
  methods: {
    btn() {
      var dataName = this.formLabelAlign;
      //   console.log(dataName);

      this.$db.insert(
        //增
        { name: dataName.name, region: dataName.region, type: dataName.type },
        (err, docs) => {
          if (err) {
            console.log(err);
            return;
          }
          //   console.log(docs);
          this.list = docs;
        }
      );
    },
    findData() {
      //查询
      this.$db.find({}, (err, docs) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log(docs);

        this.lists = docs;
      });
    },
    deleteData(item) {
      //查询
      console.log(item);
      this.$db.remove({ "region": item }, {}, function(err, data) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(data);
      });
    },
    updateData(item) {
      this.$db.update(
        { name: item },
        { $set: { name: this.formipnut } },
        function(err, data) {
          if (err) {
            console.log(err);
            return;
          }
          console.log(data);
        }
      );
    }
  },
  created() {
    this.findData();
  }
};
</script>
<style lang="scss">
.a {
  color: blue($color: #000000);
  border: 1px solid pink;
  margin-top: 10px;
  .b {
    width: 100px;
    height: 100px;
    background: red;
  }
}
</style>

