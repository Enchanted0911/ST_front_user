/* eslint-disable no-console */
<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="#" title="春雷课堂">
            <img src="~/assets/img/logo.png" width="100%" alt="春雷课堂">
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            <router-link to="/course" tag="li" active-class="current">
              <a>课程</a>
            </router-link>
            <router-link to="/teacher" tag="li" active-class="current">
              <a>名师</a>
            </router-link>
            <router-link to="/article" tag="li" active-class="current">
              <a>文章</a>
            </router-link>
            <router-link to="#" tag="li" active-class="current">
              <a>问答</a>
            </router-link>
          </ul>
          <!-- / nav -->
          <ul class="h-r-login">
            <li v-show="!loginInfo.id" id="no-login">
              <a href="/login" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a>
              |
              <a href="/register" title="注册">
                <span class="vam ml5">注册</span>
              </a>
            </li>
            <li v-show="loginInfo.id" id="is-login-one" class="mr10">
              <a id="headerMsgCountId" href="#" title="消息">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point" style="display: none">&nbsp;</q>
            </li>
            <li v-show="loginInfo.id" id="is-login-two" class="h-r-user">
              <no-ssr>
                <img
                  :src="loginInfo.avatar"
                  width="30"
                  height="30"
                  class="vam picImg"
                >
              </no-ssr>
              <a href="/ucenter/info" title>
                <span id="userName" class="vam disIb">{{ loginInfo.nickname }}</span>
              </a>
              <a href="javascript:void(0);" title="退出" class="ml5" @click="logout()">退出</a>
            </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon" />
        </aside>
        <div class="clear" />
      </section>
    </header>
    <!-- /公共头引入 -->

    <nuxt />

    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a
                href="http://junyao.icu/"
                title="均瑶"
                target="_blank"
              >均瑶</a>
            </li>
          </ul>
          <div class="clear" />
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我</a>|
                <a href="#" title="联系我们" target="_blank">联系我</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
                <span>联系电话 保密</span>
                <span>Email：wjssazpjya@gmail.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>©2021.JunYaoEdu</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt>
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt>
              </span>
            </section>
          </aside>
          <div class="clear" />
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>
<script>
import '~/assets/css/reset.css'
import '~/assets/css/theme.css'
import '~/assets/css/global.css'
import '~/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import '~/assets/css/pages-weixinpay.css'

import cookie from 'js-cookie'
import userApi from '@/api/user'

export default {
  data () {
    return {
      token: '',
      loginInfo: {
        id: '',
        age: '',
        avatar: '',
        mobile: '',
        nickname: '',
        sex: ''
      }
    }
  },
  created () {
    // 获取路径里面token值
    this.token = this.$route.query.token
    if (this.token) { // 判断路径是否有token值
      this.wxLogin()
    }

    this.showInfo()
  },
  methods: {
    // 微信登录显示的方法
    wxLogin () {
      // console.log('************'+this.token)
      // 把token值放到cookie里面
      cookie.set('Authorization', this.token, { domain: 'localhost' })
      cookie.set('junyao_ucenter', '', { domain: 'localhost' })
      // 调用接口，根据token值获取用户信息
      userApi.gainUserInfoByToken()
        .then((response) => {
          // console.log('################'+response.data.data.userInfo)
          this.loginInfo = response.data
          cookie.set('junyao_ucenter', this.loginInfo, { domain: 'localhost' })
        })
    },
    // 创建方法，从cookie获取用户信息
    showInfo () {
      // 从cookie获取用户信息
      const userStr = cookie.get('junyao_ucenter', { domain: 'localhost' })
      // 把字符串转换json对象(js对象)
      if (userStr) {
        this.loginInfo = JSON.parse(userStr)
      }
    },

    // 退出
    logout () {
      // 清空cookie值
      cookie.set('Authorization', '', { domain: 'localhost' })
      cookie.set('junyao_ucenter', '', { domain: 'localhost' })
      // 回到首页面
      window.location.href = '/'
    }

  }
}
</script>
