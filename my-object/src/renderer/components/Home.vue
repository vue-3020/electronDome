<template>
  <div id="home">
       

      <highcharts :options="areaOptions"></highcharts>



        <highcharts :options="columnOption"></highcharts>

		<el-dialog title="登陆" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="用户名" >
					<el-input v-model="form.name" ></el-input>
				</el-form-item>
				<el-form-item label="密码" >
					<el-input v-model="form.password" ></el-input>
				</el-form-item>
				 <div  class="dialog-footer">
						<el-button type="primary" @click="doLogin">确 定</el-button>
					</div>
			</el-form>
		</el-dialog>
  </div>
</template>

<script>
var areaOptions = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
    backgroundColor: "#eeeeee"
  },
  credits: {
    enabled: false // 禁用版权信息
  },
  title: {
    text: "全国人口分布图"
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.percentage:.1f} %"
        // style: {
        // 		color: (this.$Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
        // }
      }
    }
  },
  series: [
    {
      name: "分布比例",
      colorByPoint: true,
      data: [
        {
          name: "深圳",
          y: 614111,
          sliced: true,
          selected: true
        },
        {
          name: "北京",
          y: 213111
        },
        {
          name: "上海",
          y: 213111
        },
        {
          name: "武汉",
          y: 613111
        },
        {
          name: "广州",
          y: 813111
        }
      ]
    }
  ]
};

//柱状图

var columnOption = {
  chart: {
    type: "column"
  },
  title: {
    text: "舆情数量统计"
  },
  subtitle: {
    text: "数据来源: itying.com"
  },
  xAxis: {
    categories: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月"
    ],
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: "舆情数量"
    }
  },
  tooltip: {
    // head + 每个 point + footer 拼接成完整的 table
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
    footerFormat: "</table>",
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: {
      borderWidth: 0
    }
  },
  series: [
    {
      name: "正面",
      data: [
        49.9,
        71.5,
        106.4,
        129.2,
        144.0,
        176.0,
        135.6,
        148.5,
        216.4,
        194.1,
        95.6,
        54.4
      ],

      color: "blue"
    },
    {
      name: "负面",
      data: [
        83.6,
        78.8,
        98.5,
        93.4,
        106.0,
        84.5,
        105.0,
        104.3,
        91.2,
        83.5,
        106.6,
        92.3
      ],
      color: "red"
    }
  ]
};

export default {
  name: "home",

  data() {
    return {
      areaOptions: areaOptions,
      columnOption: columnOption,
      dialogFormVisible: false,
      form: {
        name: "",
        password: ""
      },
      formLabelWidth: "100px"
    };
  },
  //页面加载判断是否登陆过
  beforeMount() {
    var userInfo = localStorage.getItem("userinfo");
    if (userInfo) {
      this.dialogFormVisible = false;
    } else {
      this.dialogFormVisible = true;
    }
  },
  methods: {
    doLogin(link) {
	  console.log(this.form)
	  
	  //请求api接口
	//   this.$http.post()
    }
  }
};
</script>

<style lang="scss">
</style>
