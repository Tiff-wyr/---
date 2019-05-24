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
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">
          {{ scope.row._id }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>

      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          {{scope.row.sex === 0 ? '女' : '男' }}
        </template>
      </el-table-column>
      <el-table-column label="类别" align="center">
        <template slot-scope="scope">
          {{ scope.row.address }}
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
        <el-form-item label="姓名" required >
          <el-input v-model="memberForm.name" placeholder="维修员姓名" />
        </el-form-item>
        <el-form-item label="联系电话" required>
          <el-input v-model="memberForm.phone" placeholder="维修员联系电话" />
        </el-form-item>
        <el-form-item label="住址" required>
          <el-input v-model="memberForm.address" placeholder="维修员住址" />
        </el-form-item>
        <el-form-item label="性别" required>
          <el-select v-model="memberForm.sex" placeholder="维修员性别" >
            <el-option :value="1" label="男"/>
            <el-option :value="0" label="女"/>
          </el-select>
        </el-form-item>

      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="dialogTitle === 'create'" type="primary" @click="create">添 加</el-button>
        <el-button v-if="dialogTitle === 'update'" type="primary" @click="update">修 改</el-button>
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
  import { add, update, getAll, delRepair } from "../../api/repairPerson";


  export default {
    data() {
      return {
        page:1,
        size:6,
        count:0,
        memberForm: {
          id: '',
          name: '',
          phone:'',
          sex:'',
          address:''
        },
        memberFormRules: {
          name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
          phone: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
          address: [{ required: true, message: '地址不能为空', trigger: 'blur' }],
          sex: [{ required: true, message: '性别不能为空', trigger: 'blur' }],
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
      },
      create() {
        this.$refs.memberForm.validate(valid => {
          if (valid) {
            add({name: this.memberForm.name,phone: this.memberForm.phone,address:this.memberForm.address,sex:this.memberForm.sex}).then(res => {
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
          delRepair({_id: row._id}).then(res => {
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
          phone:'',
          sex:'',
          address:''
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

