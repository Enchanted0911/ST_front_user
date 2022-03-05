<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /文章详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="#" title class="c-999 fsize14">{{ articleDetails.teacherName }}</a>
        \
        <a href="#" title class="c-999 fsize14">{{
          articleDetails.subjectParentName
        }}</a>
        \
        <span class="c-333 fsize14">{{ articleDetails.subjectName }}</span>
        \
        <a href="#" title class="c-999 fsize14">{{
          articleDetails.createdTime
        }}</a>
      </section>
      <div>
        <div class="clear" />
      </div>
    </section>
    <section class="container">
      <div>
        <h1 style="text-align: center; font-size: 50px">
          {{ articleDetails.title }}
        </h1>
      </div>
      <div class="course-txt-body-wrap">
        <section class="course-txt-body">
          <p style="font-size: 20px" v-html="content">
            {{ content }}
          </p>
        </section>
      </div>
    </section>
    <!-- /文章详情 结束 -->
    <!-- 文章评论 -->
    <section class="container">
      <div class="mt50 commentHtml">
        <div>
          <h6 id="i-art-comment" class="c-c-content c-infor-title">
            <span class="commentTitle">评论</span>
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
            @current-change="pageComment"
          />
        <!-- 公共分页 结束 -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import commentApi from '@/api/articleComment'
import articleApi from '@/api/article'
import articleContentApi from '@/api/articleContent'
export default {
  asyncData ({ params, error }) {
    return {
      articleId: params.id
    }
  },
  data () {
    return {
      content: '',
      comment: {},
      total: 0,
      commentList: [],
      commentPage: {
        page: 1,
        pageSize: 10,
        articleId: ''
      },
      articleDetails: {}
    }
  },
  created () {
    this.fetchArticleContent()
    this.fetchArticleDetails()
    this.initComment()
  },
  methods: {
    initComment () {
      this.pageComment()
    },
    addComment () {
      this.comment.articleId = this.articleId
      commentApi.saveComment(this.comment).then((response) => {
        this.comment.content = ''
        this.initComment()
      })
    },
    fetchArticleDetails () {
      articleApi.articleDetails(this.articleId).then((response) => {
        this.articleDetails = response.data
      })
    },
    fetchArticleContent () {
      articleContentApi.articleContentDetails(this.articleId).then((response) => {
        this.content = response.data.content
      })
    },
    pageComment (page = 1) {
      this.commentPage.page = page
      this.commentPage.articleId = this.articleId
      commentApi.pageArticleComment(this.commentPage).then((response) => {
        this.commentList = response.data.rows
        this.total = response.data.total
      })
    }
  }
}
</script>
