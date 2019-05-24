<template>
  <div>
    <el-select v-model="value" placeholder="请选择维修员">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <div id="main" style="width: 500px;height: 500px;"></div>
  </div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/line')
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
        options: [{
          value: '选项1',
          label: '薇薇'
        }, {
          value: '选项2',
          label: '海涛'
        }, {
          value: '选项3',
          label: '张伟'
        }, {
          value: '选项4',
          label: '李四'
        }, {
          value: '选项5',
          label: '王五'
        }],

      }
    },
    mounted() {
      this.dayin()
    },
    methods:{
      dayin(){
        let myChart = echarts.init(document.getElementById('main'));
        myChart.setOption({
          xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [20, 32, 31, 34, 10, 13],
            type: 'line'
          }]
        })
      }
    },
    created(){

    }
  }
</script>

<style scoped>

</style>
