<template>
  <el-container>
    <el-header style="background-color: white">
      <p style="font-style: italic; font-size: 30px; text-align: center">
        个人信息
      </p>
    </el-header>
    <el-main>
      <client-only>
        <el-form ref="form" :model="userInfo" label-width="80px">
          <el-form-item label="头像">
            <el-avatar :src="userInfo.avatar" :size="130" />
            <el-upload
              class="avatar-uploader"
              :action="BASE_API + '/eduOss/fileOss/member'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <el-button
                type="primary"
                icon="el-icon-upload"
                @click="show = true"
              >
                更换头像
              </el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="userInfo.nickname" maxlength="10" show-word-limit clearable class="myinput" />
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="userInfo.sex" placeholder="请选择性别" clearable>
              <el-option label="男" value="1" />
              <el-option label="女" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="userInfo.mobile" maxlength="11" show-word-limit clearable class="myinput" />
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
              v-model="userInfo.birthday"
              type="date"
              clearable
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="签名" class="myinput">
            <!-- <el-input v-model="userInfo.sign" /> -->
            <el-input
              v-model="userInfo.sign"
              maxlength="100"
              show-word-limit
              autosize
              type="textarea"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">
              保存
            </el-button>
            <el-button @click="reset">
              取消
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
    return {
      BASE_API: 'http://120.77.81.245:8222',
      show: false,
      userInfo: {},
      userInfoInit: {},
      userInfoReq: {}
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
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.userInfo.avatar = res.data.url
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 8

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 8MB!')
      }
      return isJPG && isLt2M
    },
    onSubmit () {
      this.userInfoReq.id = this.userInfo.id
      this.userInfoReq.avatar = this.userInfo.avatar
      this.userInfoReq.nickname = this.userInfo.nickname
      this.userInfoReq.sex = this.userInfo.sex
      this.userInfoReq.birthday = this.userInfo.birthday
      this.userInfoReq.sign = this.userInfo.sign
      userApi.updateUserInfo(this.userInfoReq).then((response) => {
        if (response.data.code !== 20000) {
          return false
        }
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      })
      cookie.set('junyao_ucenter', this.userInfo, { domain: '.junyao.icu' })
      this.$emit('childChangeUserInfo', this.userInfo)
    },
    reset () {
      this.userInfo = JSON.parse(JSON.stringify(this.userInfoInit))
    }
  }
}
</script>
<style>
.myinput {
  width: 50%;
}
</style>
