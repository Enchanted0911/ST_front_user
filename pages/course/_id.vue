<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="#" title class="c-999 fsize14">首页</a>
        \
        <a href="#" title class="c-999 fsize14">{{
          courseDetails.subjectParentName
        }}</a>
        \
        <span class="c-333 fsize14">{{ courseDetails.subjectName }}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px">
          <section id="videoPlay" class="p-h-video-box">
            <img
              height="357px"
              :src="courseDetails.cover"
              :alt="courseDetails.title"
              class="dis c-v-pic"
            >
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ courseDetails.title }}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b
                class="c-yellow"
                style="font-size: 24px"
              >￥{{ courseDetails.price }}</b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span
                class="c-fff fsize14"
              >主讲： {{ courseDetails.teacherName }}&nbsp;&nbsp;&nbsp;</span>
            </section>
            <section class="c-attr-mt of">
              <span class="ml10 vam">
                <em class="icon18 scIcon" />
                <a class="c-fff vam" title="收藏" href="#">收藏</a>
              </span>
            </section>
            <section v-if="ifBuy || Number(courseDetails.price) === 0" class="c-attr-mt">
              <a href="#" title="立即观看" class="comm-btn c-btn-3">立即观看</a>
            </section>
            <section v-else class="c-attr-mt">
              <a href="#" title="立即购买" class="comm-btn c-btn-3" @click="createOrders()">立即购买</a>
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br>
                <h6 class="c-fff f-fM mt10">
                  {{ courseDetails.buyCount }}
                </h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br>
                <h6 class="c-fff f-fM mt10">
                  20
                </h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br>
                <h6 class="c-fff f-fM mt10">
                  501
                </h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear" />
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p v-html="courseDetails.description">
                        {{ courseDetails.description }}
                      </p>
                    </section>
                  </div>
                </div>
                <!-- /课程介绍 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 文件目录 -->
                          <li
                            v-for="chapter in chapterVideoList"
                            :key="chapter.id"
                            class="lh-menu-stair"
                          >
                            <a
                              href="javascript: void(0)"
                              :title="chapter.title"
                              class="current-1"
                            >
                              <em class="lh-menu-i-1 icon18 mr10" />{{
                                chapter.title
                              }}
                            </a>

                            <ol class="lh-menu-ol" style="display: block">
                              <li
                                v-for="video in chapter.courseSubsectionResList"
                                :key="video.id"
                                class="lh-menu-second ml30"
                              >
                                <a
                                  v-if="video.videoSourceId != null"
                                  :href="'/player/' + video.videoSourceId"
                                  target="_blank"
                                >
                                  <span class="fr">
                                    <i class="free-icon vam mr10">开始观看</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{ video.title }}
                                </a>
                                <a
                                  v-else
                                  href="#"
                                >
                                  <span class="fr">
                                    <i class="free-icon vam mr10">该小节未上传视频</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{ video.title }}
                                </a>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto">
                  <li>
                    <div class="u-face">
                      <a href="#">
                        <img
                          :src="courseDetails.teacherAvatar"
                          width="50"
                          height="50"
                          alt
                        >
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a class="c-333 fsize16 fl" :href="'/teacher/' + courseDetails.teacherId">{{
                        courseDetails.teacherName
                      }}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{ courseDetails.teacherIntro }}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
        <div class="clear" />
      </div>
    </section>
    <!-- /课程详情 结束 -->
    <!-- 课程评论 -->
    <section class="container">
      <div class="mt50 commentHtml">
        <div>
          <h6 id="i-art-comment" class="c-c-content c-infor-title">
            <span class="commentTitle">课程评论</span>
          </h6>
          <section class="lh-bj-list pr mt20 replyhtml">
            <ul>
              <li class="unBr">
                <aside class="noter-pic">
                  <img
                    width="50"
                    height="50"
                    class="picImg"
                    src="~/assets/img/avatar-boy.gif"
                  >
                </aside>
                <div class="of">
                  <section class="n-reply-wrap">
                    <fieldset>
                      <textarea
                        id="commentContent"
                        v-model="comment.content"
                        name=""
                        placeholder="输入您要评论的文字"
                      />
                    </fieldset>
                    <p class="of mt5 tar pl10 pr10">
                      <span
                        class="fl"
                      ><tt
                        class="c-red commentContentmeg"
                        style="display: none"
                      /></span>
                      <input
                        type="button"
                        value="回复"
                        class="lh-reply-btn"
                        @click="addComment()"
                      >
                    </p>
                  </section>
                </div>
              </li>
            </ul>
          </section>
          <section class="">
            <section class="question-list lh-bj-list pr">
              <ul class="pr10">
                <li v-for="(comment, index) in commentList" :key="index">
                  <aside class="noter-pic">
                    <img
                      width="50"
                      height="50"
                      class="picImg"
                      :src="comment.avatar"
                    >
                  </aside>
                  <div class="of">
                    <span class="fl">
                      <font class="fsize12 c-blue"> {{ comment.nickname }}</font>
                      <font class="fsize12 c-999 ml5">评论：</font></span>
                  </div>
                  <div class="noter-txt mt5">
                    <p>{{ comment.content }}</p>
                  </div>
                  <div class="of mt5">
                    <span
                      class="fr"
                    ><font class="fsize12 c-999 ml5">{{
                      comment.createdTime
                    }}</font></span>
                  </div>
                </li>
              </ul>
            </section>
          </section>
          <!-- 公共分页 开始 -->
          <el-pagination
            :current-page="commentPage.page"
            :page-size="commentPage.pageSize"
            :total="total"
            style="padding: 30px 0; text-align: center"
            layout="total, prev, pager, next, jumper"
            @current-change="gotoPage"
          />
        <!-- 公共分页 结束 -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import courseApi from '@/api/course'
import commentApi from '@/api/comment'
export default {
  asyncData ({ params, error }) {
    return {
      courseId: params.id
    }
  },
  data () {
    return {
      commentList: [],
      total: 0,
      comment: {
        content: '',
        courseId: ''
      },
      commentPage: {
        page: 1,
        pageSize: 10,
        courseId: ''
      },
      courseDetails: {},
      chapterVideoList: [],
      ifBuy: false
    }
  },
  created () {
    this.initComment()
    this.initCourseInfo()
  },
  methods: {
    // 查询课程详情信息
    initCourseInfo () {
      courseApi.courseDetails(this.courseId)
        .then((response) => {
          this.courseDetails = response.data
        })
      courseApi.gainCourseOutline(this.courseId)
        .then((response) => {
          this.chapterVideoList = response.data
        })
      courseApi.gainIfBuy(this.courseId)
        .then((response) => {
          this.ifBuy = response.data
        })
    },
    initComment () {
      this.gotoPage()
    },
    addComment () {
      this.comment.courseId = this.courseId
      this.comment.teacherId = this.courseDetails.teacherId
      commentApi.saveComment(this.comment).then((response) => {
        this.comment.content = ''
        this.initComment()
      })
    },
    gotoPage (page = 1) {
      this.commentPage.page = page
      this.commentPage.courseId = this.courseId
      commentApi.pageComment(this.commentPage).then((response) => {
        this.commentList = response.data.rows
        this.total = response.data.total
      })
    },
    createOrders () {
      this.$message.success('全部免费不需要购买哦!')
      // ordersApi.createOrders(this.courseId)
      //   .then((response) => {
      //     // 获取返回订单号
      //     // 生成订单之后，跳转订单显示页面
      //     this.$router.push({ path: '/orders/' + response.data.data.orderId })
      //   })
    }
  }
}
</script>
