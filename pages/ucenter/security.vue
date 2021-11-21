<template>
  <el-container>
    <el-header style="background-color: white">
      <p style="font-style: italic; font-size: 30px; text-align: center">
        修改密码
      </p>
    </el-header>
    <el-main>
      <client-only>
        <el-form
          ref="passwordInfo"
          :model="passwordInfo"
          status-icon
          :rules="rules"
          label-width="100px"
          class="demo-passwordInfo"
        >
          <el-form-item label="原密码" prop="oldPassword" class="myinput">
            <el-input
              v-model="passwordInfo.oldPassword"
              type="text"
              autocomplete="off"
              maxlength="18"
              show-word-limit
              clearable
            />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword" class="myinput">
            <el-input
              v-model="passwordInfo.newPassword"
              type="password"
              autocomplete="off"
              maxlength="18"
              show-word-limit
              clearable
            />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword" class="myinput">
            <el-input
              v-model="passwordInfo.checkPassword"
              type="password"
              autocomplete="off"
              maxlength="18"
              show-word-limit
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('passwordInfo')">
              提交
            </el-button>
            <el-button @click="resetForm('passwordInfo')">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </client-only>
    </el-main>
  </el-container>
</template>

<script>
import userApi from '@/api/user'
import cookie from 'js-cookie'
export default {
  layout: 'ucenter',
  props: ['loginInfo'],
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.passwordInfo.checkPassword !== '') {
          this.$refs.passwordInfo.validateField('checkPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.passwordInfo.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        newPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      userInfo: {},
      userInfoInit: {},
      passwordInfo: {
        oldPassword: '',
        newPassword: '',
        checkPassword: '',
        id: ''
      }
    }
  },
  watch: {
    loginInfo (newData, oldData) {
      this.userInfo = newData
    }
  },
  created () {
    this.userInfoInit = this.loginInfo
    this.userInfo = JSON.parse(JSON.stringify(this.userInfoInit))
    this.passwordInfo.id = this.userInfo.id
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userApi.updatePassword(this.passwordInfo).then((response) => {
            if (response.data.success) {
              this.$message({
                type: 'success',
                message: '修改密码成功! 请重新登陆'
              })
              cookie.set('junyao_token', '', { domain: '.junyao.icu' })
              cookie.set('junyao_ucenter', '', { domain: '.junyao.icu' })
              // 回到首页面
              window.location.href = '/'
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '两次输入密码不一致, 请重新修改!'
          })
          this.passwordInfo.newPassword = ''
          this.passwordInfo.checkPassword = ''
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style>
.myinput {
  width: 50%;
}
</style>
