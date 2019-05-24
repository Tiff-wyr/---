<template>
  <div>
    <el-date-picker
      v-model="value4"
      style="margin-bottom: 20px"
      type="month"
      @change="dayin"
      :picker-options="pickerOptions"
      placeholder="选择月">
    </el-date-picker>
    <div id="main" style="width: 500px;height: 500px;"></div>
  </div>
</template>

<script>
  import {getType} from "../../api/chat";
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入
  require('echarts/lib/chart/pie')
  // 引入提饼状图组件示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  require('echarts/lib/component/legend')
    export default {
      name: "index",
      data(){
        return {
          pickerOptions: {
            disabledDate(time) {
              return time.getTime() > Date.now();
            },
            shortcuts: [{
              text: '全部',
              onClick(picker) {
                picker.$emit('pick', 0);
              }
            }]
          },
          value4: 0,
          series:[],
          legend:[]
        }
      },
      computed: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      mounted() {
        this.dayin()
      },
      methods :{
        dayin(){
          let time = new Date(this.value4)
          getType({month:time.getTime()}).then(res=>{
            this.series=res.data.seriesData
            this.legend=res.data.legendData
            this.drawLine();
          })
        },
        drawLine(){
          let myChart = echarts.init(document.getElementById('main'));
          // 绘制图表
          myChart.setOption({
            title : {
              text: '报修类型统计',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: this.legend
            },
            series : [
              {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:this.series,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          });
        }
      },
    }
</script>

<style scoped>

</style>
