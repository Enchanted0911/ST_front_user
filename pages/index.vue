/* eslint-disable vue/no-unused-components */
/* eslint-disable vue/no-unused-components */
/* eslint-disable no-undef */
<template>
  <div>
    <!-- 幻灯片 开始 -->
    <swiper ref="Swiper" :options="swiperOptions">
      <swiper-slide v-for="banner in bannerList" :key="banner.id">
        <a target="_blank" :href="banner.linkUrl">
          <img :src="banner.imageUrl" :alt="banner.title">
        </a>
      </swiper-slide>
      <div slot="pagination" class="swiper-pagination" />
      <div slot="button-prev" class="swiper-button-prev swiper-button-white" />
      <div slot="button-next" class="swiper-button-next swiper-button-white" />
    </swiper>

    <div id="aCoursesList">
      <!-- 网校课程 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门课程</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul id="bna" class="of">
                <li v-for="course in eduList" :key="course.id">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        :src="course.cover"
                        class="img-responsive"
                        :alt="course.title"
                      >
                      <div class="cc-mask">
                        <a
                          :href="'/course/'+course.id"
                          :title="courseImgTitle"
                          class="comm-btn c-btn-1"
                        >开始学习</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a
                        href="#"
                        :title="course.title"
                        class="course-title fsize18 c-333"
                      >{{ course.title }}</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span
                        v-if="Number(course.price) === 0"
                        class="fr jgTag bg-green"
                      >
                        <i class="c-fff fsize12 f-fA">免费</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">9634人学习</i>
                        |
                        <i class="c-999 f-fA">9634评论</i>
                      </span>
                    </section>
                  </div>
                </li>
              </ul>
              <div class="clear" />
            </article>
            <section class="tac pt20">
              <a :href="'/course'" title="全部课程" class="comm-btn c-btn-2">全部课程</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校课程 结束 -->
      <!-- 网校名师 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">名师大咖</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="teacher in teacherList" :key="teacher.id">
                  <section class="i-teach-wrap">
                    <div class="i-teach-pic">
                      <a :href="'/teacher/'+teacher.id" :title="teacher.name">
                        <img :alt="teacher.name" :src="teacher.avatar">
                      </a>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                      <a
                        :href="'/teacher/'+teacher.id"
                        :title="teacher.name"
                        class="fsize18 c-666"
                      >{{ teacher.name }}</a>
                    </div>
                    <div class="hLh30 txtOf tac">
                      <span class="fsize14 c-999">{{ teacher.career }}</span>
                    </div>
                    <div class="mt15 i-q-txt">
                      <p class="c-999 f-fA">
                        {{ teacher.intro }}
                      </p>
                    </div>
                  </section>
                </li>
              </ul>
              <div class="clear" />
            </article>
            <section class="tac pt20">
              <a :href="'/teacher'" title="全部讲师" class="comm-btn c-btn-2">全部讲师</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校名师 结束 -->
    </div>
  </div>
</template>

<script>
import bannerApi from '@/api/banner'
import courseApi from '@/api/course'
import teacherApi from '@/api/teacher'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
SwiperCore.use([Navigation, Pagination, Autoplay])
// eslint-disable-next-line no-undef
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Swiper,
    // eslint-disable-next-line vue/no-unused-components
    SwiperSlide
  },
  data () {
    return {
      courseImgTitle: '开始学习',
      swiperOptions: {
        autoplay: {
          delay: 3000, // 3秒切换一次
          disableOnInteraction: false // 鼠标拖动后继续自动轮播
        },
        // 配置分页
        loop: true,
        pagination: {
          el: '.swiper-pagination', // 分页的dom节点
          clickable: true
        },
        // 配置导航
        navigation: {
          nextEl: '.swiper-button-next', // 下一页dom节点
          prevEl: '.swiper-button-prev' // 前一页dom节点
        }
      },
      // banner数组
      bannerList: [],
      eduList: [],
      teacherList: []
    }
  },
  created () {
    // 调用查询banner的方法
    this.getBannerList()
    // 调用查询热门课程和名师的方法
    this.getHotCourseTeacher()
  },
  methods: {
    // 查询热门课程和名师
    getHotCourseTeacher () {
      courseApi.list8HotCourse().then((response) => {
        this.eduList = response.data
      })
      teacherApi.list4HotTeacher().then((response) => {
        this.teacherList = response.data
      })
    },
    // 查询banner数据
    getBannerList () {
      bannerApi.gainAllBanner().then((response) => {
        this.bannerList = response.data
      })
    }
  }
}
</script>
