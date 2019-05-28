<template>
  <div>
    <el-card class="card-wrap-table">
      <div slot="header" class="title-wrap clearfix">
        <div class="title fll">
          报修记录
        </div>
        <el-date-picker
          class="flr"
          style="margin-left: 20px"
          v-model="month"
          @change="getMonth"
          :picker-options="pickerOptions"
          type="month"
          placeholder="选择月">
        </el-date-picker>
        <el-select v-model="status" placeholder="请选择"
        class="flr" @change="getMonth">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list.slice((page - 1) * size, page*size)"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row>
        <el-table-column label="报修类型" align="center">
          <template slot-scope="scope">
            {{ scope.row.type.name ? scope.row.type.name : '无数据'}}
          </template>
        </el-table-column>
        <el-table-column label="报修人" align="center">
          <template slot-scope="scope">
            {{ scope.row.user.name ? scope.row.user.name : '无数据'}}
          </template>
        </el-table-column>
        <el-table-column label="报修时间" align="center" prop="createTime">
        </el-table-column>
        <el-table-column label="报修地址" align="center">
          <template slot-scope="scope">
            {{ scope.row.address}}
          </template>
        </el-table-column>
        <el-table-column label="报修备注" align="center">
          <template slot-scope="scope">
            {{ scope.row.remark}}
          </template>
        </el-table-column>
        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === 1 ? 'primary' : (scope.row.status === 0 ? 'danger' : 'success')"
              disable-transitions>
              {{ scope.row.status === 1 ? '未审核' : (scope.row.status === 0 ? '已驳回': (scope.row.status === 2 ? '已通过':
              '已接单'))}}
            </el-tag>

          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="mini"
                       v-if="scope.row.status === 1"
                       @click="handlePass(scope.row._id)">
              通过
            </el-button>
            <el-button
              v-if="scope.row.status === 1"
              type="danger" size="mini"
              @click="handleReject(scope.row._id,'1')"
            >
              驳回
            </el-button>
            <el-button
              size="mini"
              @click="showDetail(scope.row)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialogVisible" width="40%">
        <el-form ref="memberForm" :model="memberForm" label-position="left" label-width="150px">
          <el-form-item label="报修人姓名">
            <span>{{memberForm.user.name ? memberForm.user.name : '无数据'}}</span>
          </el-form-item>
          <el-form-item label="报修人电话">
            <span>{{memberForm.user.phone}}</span>
          </el-form-item>
          <el-form-item label="报修类型">
            <span>{{memberForm.type.name ? memberForm.type.name : '无数据'}}</span>
          </el-form-item>
          <el-form-item label="报修图片">
            <img :src="item" class="pic" v-for="(item,index) in  memberForm.images.split(',')" :key="index" @click="imgMax">
          </el-form-item>
          <el-form-item label="报修地址">
            <span>{{memberForm.address}}</span>
          </el-form-item>
          <el-form-item label="报修备注">
            <span>{{memberForm.remark}}</span>
          </el-form-item>
          <el-form-item label="驳回理由" v-if="memberForm.status === 0">
            <span>{{memberForm.rejectMsg}}</span>
          </el-form-item>
          <el-form-item label="驳回理由" v-if="isShowing">
           <el-input v-model="memberForm.rejectMsg"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button v-if="memberForm.status === 1" type="danger" @click="handleReject(memberForm._id,'2')" size="mini">驳 回</el-button>
        <el-button v-if="memberForm.status === 1" type="primary" @click="handlePass(memberForm._id)"
                   size="mini">通 过</el-button>
      </span>
        <div v-if="isMax" class="imgMax clearfix" @click="imgMin">
          <img :src="item" v-for="(item,index) in  memberForm.images.split(',')" :key="index">
        </div>
      </el-dialog>
    </el-card>
    <el-pagination
      :page-size="size"
      :current-page="page"
      @current-change="handleCurrentChange"
      class="flr"
      style="margin-top: 20px"
      layout="prev, pager, next"
      :total="count">
    </el-pagination>

  </div>
</template>

<script>
  import {update, get} from "../../api/repairCheck";
  import uploadAvatar from '@/components/upload-avatar'

  export default {
    data() {
      return {
        page:1,
        size: 6,
        count:0,
        list: [],
        listLoading: false,
        dialogVisible: false,
        month:'',
        status:'',
        memberForm: {
          user: {},
          type: {},
          images: ''
        },
        isShowing:false,
        options:[
          {
            value: '',
            label: '全部'
          },
          {
            value: '1',
            label: '未审核'
          },
          {
            value: '0',
            label: '已驳回'
          },
          {
            value: '2',
            label: '已通过'
          }
        ],
        isMax:false,
        pickerOptions:{
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        }

      }
    },
    components: {
      uploadAvatar
    },
    methods: {
      handleCurrentChange(val){
        this.page=val
      },
      getMonth(){
        this.getData()
      },

      imgMax(){
        this.isMax=true
      },
      imgMin(){
        this.isMax=false
      },
      getData() { // 获取所有报修记录
        // this.listLoading = true
        let data={}
        data.status=this.status
        if(this.month !==''){
          let time = new Date(this.month)
          data.month=time.getTime()
        }

        console.log(data);
        get(data).then(res => {
          if (res.code === 200) {
            // this.listLoading = false
            this.list = res.data.map((item)=>{
              return {
                ...item,
               createTime: item.createdTime.split('T')[0],
              }
            })
            this.count=this.list.length

          }
        })
      },
      showDetail(row) {
        this.dialogVisible = true
        this.isShowing = false
        this.memberForm = Object.assign({}, row)
      },

      handlePass(id) {
        //通过
        update({_id: id, status: 2}).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.getData()
          }
        })

      },
      handleReject(id,code) {
        //驳回
        if (code == '1') {
          this.$prompt('请输入驳回理由', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({value}) => {
            this.updateM(id,value)


          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });

        } else {
         this.isShowing=true
          if(this.memberForm.rejectMsg){
           this.updateM(id,this.memberForm.rejectMsg)
            this.dialogVisible=false
          }
        }

      },

      updateM(id,value) {
        update({_id: id, status: 0,rejectMsg:value}).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.getData()
          }
        })
      },

    },

    created() {
      this.getData()
    },

  }
</script>

<style scoped lang="scss">
  .title-wrap {
    .title {
      margin-top: 12px;
    }
  }

  .pic {
    width: 80px;
    height: auto;
    margin-right: 20px;
  }
  .imgMax{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 600px;
    background-color: #ccc;
    margin: 70px auto;
    z-index: 900;

    img{
      width:300px;
      height: auto;
      float: left;
    }
  }

  .el-form-item {
    margin-bottom: 0;
  }
</style>
