<template>
  <div>
    <el-date-picker
      v-model="value"
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
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/bar')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  require('echarts/lib/component/legend')

  export default {
    name: "index",
    data(){
      return {
        value:'',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
      }
    },
    mounted() {
      this.dayin()
    },
    methods:{
      dayin(){
        let myChart = echarts.init(document.getElementById('main'));
        myChart.setOption({
          color: ['#9998DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['薇薇', '海涛', '张伟', '李四', '王五'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
            }
          ],
          series : [
            {
              name:'满意度百分比',
              type:'bar',
              barWidth: '30%',
              data:[18, 90, 20, 34, 39]
            }
          ]
        })
      }
    },
    created(){

    }
  }
</script>

<style scoped>

</style>
