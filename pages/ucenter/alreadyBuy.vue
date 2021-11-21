<template>
  <el-container>
    <el-header style="background-color: white">
      <p style="font-style: italic; font-size: 30px; text-align: center">
        已购买
      </p>
    </el-header>
    <el-main>
      加班开发中...
    </el-main>
  </el-container>
</template>

<script>
export default {
  layout: 'ucenter',
  props: ['loginInfo'],
  data () {
    return {
      userInfo: {},
      userInfoInit: {}
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
  }
}
</script>
