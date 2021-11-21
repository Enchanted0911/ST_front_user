<template>
  <client-only>
    <el-container
      style="position: absolute; height: 100%; width: 100%; border: 1px solid #eee"
    >
      <el-aside width="200px" style="background-color: Transparent">
        <div style="text-align: center">
          <el-avatar
            :size="180"
            :src="userInfo.avatar"
          />
        </div>
        <el-menu router>
          <el-menu-item index="/ucenter/info">
            <i class="el-icon-user" />个人信息
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-star-off" />我的收藏
            </template>
            <el-menu-item-group>
              <el-menu-item index="/ucenter/favoriteCourse">
                课程
              </el-menu-item>
              <el-menu-item index="/ucenter/favoriteTeacher">
                教师
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/ucenter/alreadyBuy">
            <i class="el-icon-goods" />已购买
          </el-menu-item>
          <el-menu-item index="/ucenter/security">
            <i class="el-icon-lock" />安全
          </el-menu-item>
          <el-menu-item index="/">
            <i class="el-icon-back" />返回首页
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container style="position: relative">
        <nuxt-child :login-info="userInfo" @childChangeUserInfo="changeUserInfo" />
      </el-container>
    </el-container>
  </client-only>
</template>

<script>
import cookie from 'js-cookie'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.showInfo()
  },
  methods: {
    // 创建方法，从cookie获取用户信息
    showInfo () {
      // 从cookie获取用户信息
      const userStr = cookie.get('junyao_ucenter', { domain: '.junyao.icu' })
      // 把字符串转换json对象(js对象)
      if (userStr) {
        this.userInfo = JSON.parse(userStr)
      }
    },
    changeUserInfo (userInfo) {
      this.userInfo = userInfo
    }
  }
}
</script>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
</style>
