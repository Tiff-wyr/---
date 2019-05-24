<template>
<div>
  <el-card>
    <el-button type="primary" size="mini" class="filter-item" @click="handleCreate">添 加</el-button>
    <el-table
      v-loading="listLoading"
      :data="list.slice((page-1)*size,page*size)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="报修类别" align="center">
        <template slot-scope="scope">
          {{ scope.row.category }}
        </template>
      </el-table-column>
      <el-table-column label="报修类型图片" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.img" alt="" class="avatar-item">
        </template>
      </el-table-column>
      <el-table-column label="报修类型名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>



      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogStatus[dialogTitle]" :visible.sync="dialogVisible" width="40%">
      <el-form ref="memberForm" :rules="memberFormRules" :model="memberForm" label-position="right" label-width="160px">
        <el-form-item label="报修类别" prop="name">
          <el-input v-model="memberForm.category" placeholder="name"/>
        </el-form-item>
        <el-form-item label="报修类型图片" prop="img">
          <uploadAvatar v-model="memberForm.img"></uploadAvatar>
        </el-form-item>
        <el-form-item label="报修类型名称" prop="name">
          <el-input v-model="memberForm.name" placeholder="name"/>
        </el-form-item>

      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="dialogTitle === 'create'" type="primary" @click="create">添 加</el-button>
        <el-button v-if="dialogTitle === 'update'" type="primary" @click="update()">修 改</el-button>
      </span>
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
  import { Message } from 'element-ui'
  import uploadAvatar from '@/components/upload-avatar'
  import { add, update, getAll, deleteRepair } from "../../api/repairType";


  export default {
    data() {
      return {
        page:1,
        size:6,
        count:0,
        memberForm: {
          id: '',
          name: '',
          img:'',
          category:''
        },
        memberFormRules: {
          name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
          img: [{ required: true, message: '图片不能为空', trigger: 'blur' }],
        },
        dialogTitle: 'create',
        dialogStatus: {
          create: '添加',
          update: '修改'
        },

        list: [],
        listLoading: false,
        dialogVisible: false
      }
    },
    components:{
      uploadAvatar
    },
    created() {
      this.getList()
    },
    methods: {
      handleCurrentChange(val){
        this.page=val
      },
      getList() {
        this.listLoading = true
        getAll().then(res => {
          this.listLoading = false
          this.list = res.data
          this.count=this.list.length
        })
      },

      handleCreate() {
        this.resetForm()
        this.dialogVisible = true
        this.dialogTitle = 'create'

      },
      handleUpdate(row) {
        this.resetForm()
        this.dialogVisible = true
        this.dialogTitle = 'update'
        this.memberForm = Object.assign({}, row)
        console.log(this.memberForm)
      },
      create() {
        this.$refs.memberForm.validate(valid => {
          if (valid) {
            add({img: this.memberForm.img,name: this.memberForm.name,category:this.memberForm.category}).then(res => {
              if (res.code === 200) {
                Message.success('添加成功')
              } else {
                Message.error(res.msg)
              }
              this.dialogVisible = false
              this.getList()
            })
          } else {
            return false
          }
        })
      },
      update() {
        this.$refs.memberForm.validate(valid => {
          if (valid) {
            update(this.memberForm).then(res => {
              if (res.code === 200) {
                Message.success('修改成功')
              } else {
                Message.error(res.msg)
              }
              this.dialogVisible = false
              this.getList()
            })
          } else {
            return false
          }
        })
      },
      handleDelete(row) {
        this.$confirm('是否删除此条数据？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRepair({_id: row._id}).then(res => {
            if (res.code === 200) {
              Message.success('删除成功')
            } else {
              Message.error(res.msg)
            }
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      resetForm() {
        this.memberForm = {
          name: '',
          img:''
        }
      }
    }
  }
</script>
<style scoped>
  .filter-item{
    margin-bottom: 30px;
  }

</style>

