<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#" @click="searchAll()">全部</a>
                </li>
                <li
                  v-for="(item, index) in subjectNestedList"
                  :key="index"
                  :class="{ active: oneIndex == index }"
                >
                  <a
                    :title="item.title"
                    href="#"
                    @click="searchOne(item.id, index)"
                  >{{ item.title }}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14" />
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li
                  v-for="(item, index) in subSubjectList"
                  :key="index"
                  :class="{ active: twoIndex == index }"
                >
                  <a
                    :title="item.title"
                    href="#"
                    @click="searchTwo(item.id, index)"
                  >{{ item.title }}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear" />
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{ 'current bg-orange': buyCountSort != '' }">
                <a
                  title="销量"
                  href="javascript:void(0);"
                  @click="searchBuyCount()"
                >销量
                  <span :class="{ hide: buyCountSort == '' }">↓</span>
                </a>
              </li>
              <li :class="{ 'current bg-orange': createTimeSort != '' }">
                <a
                  title="最新"
                  href="javascript:void(0);"
                  @click="searchGmtCreate()"
                >最新
                  <span :class="{ hide: createTimeSort == '' }">↓</span>
                </a>
              </li>
              <li :class="{ 'current bg-orange': priceSort != '' }">
                <a
                  title="价格"
                  href="javascript:void(0);"
                  @click="searchPrice()"
                >价格&nbsp;
                  <span :class="{ hide: priceSort == '' }">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <section style="margin: 10px">
          <div>
            <el-form
              :inline="true"
              size="mini"
              class="demo-form-inline"
              @submit.native.prevent
            >
              <el-form-item>
                <el-input
                  v-model="courseName"
                  clearable
                  placeholder="请输入课程关键字"
                  @keyup.enter.native="searchCourse()"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchCourse()">
                  查询
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </section>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section v-if="data.total == 0" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span
              class="c-666 fsize14 ml10 vam"
            >没有相关数据，请联系管理员发布，说不定下次就有了呢...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list">
            <ul id="bna" class="of">
              <li v-for="item in data.rows" :key="item.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img
                      :src="item.cover"
                      class="img-responsive"
                      :alt="item.title"
                    >
                    <div class="cc-mask">
                      <a
                        :href="'/course/' + item.id"
                        title="开始学习"
                        class="comm-btn c-btn-1"
                      >开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a
                      :href="'/course/' + item.id"
                      :title="item.title"
                      class="course-title fsize18 c-333"
                    >{{ item.title }}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span
                      v-if="Number(item.price) === 0"
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
        </div>
        <!-- 公共分页 开始 -->
        <el-pagination
          :current-page="coursePage.page"
          :page-size="coursePage.pageSize"
          :total="total"
          style="padding: 30px 0; text-align: center"
          layout="total, prev, pager, next, jumper"
          @current-change="gotoPage"
        />
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import courseApi from '@/api/course'
import subjectApi from '@/api/subject'

export default {
  data () {
    return {
      data: {}, // 课程列表
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表
      total: 0,
      coursePage: {
        page: 1,
        pageSize: 8
      }, // 查询表单对象

      oneIndex: -1,
      twoIndex: -1,
      buyCountSort: '',
      createTimeSort: '',
      priceSort: '',
      courseName: ''
    }
  },
  created () {
    // 课程第一次查询
    this.initCourseFirst()
    // 一级分类显示
    this.initSubject()
  },
  methods: {
    searchCourse () {
      this.coursePage.courseName = this.courseName
      this.gotoPage()
    },
    searchAll () {
      this.oneIndex = -1
      this.courseName = ''
      this.coursePage = { page: 1, pageSize: 10 }
      this.initCourseFirst()
      this.subSubjectList = []
    },

    // 1 查询第一页数据
    initCourseFirst () {
      this.gotoPage()
    },

    // 2 查询所有一级分类
    initSubject () {
      subjectApi.gainSubject().then((response) => {
        this.subjectNestedList = response.data
      })
    },

    // 3 分页切换的方法
    gotoPage (page = 1) {
      this.coursePage.page = page
      courseApi.pageCourse(this.coursePage).then((response) => {
        this.data = response.data
        this.total = response.data.total
      })
    },

    // 4 点击某个一级分类，查询对应二级分类
    searchOne (subjectParentId, index) {
      // 把传递index值赋值给oneIndex,为了active样式生效
      this.oneIndex = index

      this.twoIndex = -1
      this.coursePage.subjectId = ''
      this.subSubjectList = []

      // 把一级分类点击id值，赋值给coursePage
      this.coursePage.subjectParentId = subjectParentId
      // 点击某个一级分类进行条件查询
      this.gotoPage()

      // 拿着点击一级分类id 和 所有一级分类id进行比较，
      // 如果id相同，从一级分类里面获取对应的二级分类
      for (let i = 0; i < this.subjectNestedList.length; i++) {
        // 获取每个一级分类
        const oneSubject = this.subjectNestedList[i]
        // 比较id是否相同
        if (subjectParentId === oneSubject.id) {
          // 从一级分类里面获取对应的二级分类
          this.subSubjectList = oneSubject.subjectTwoResList
        }
      }
    },

    // 5 点击某个二级分类实现查询
    searchTwo (subjectId, index) {
      // 把index赋值,为了样式生效
      this.twoIndex = index
      // 把二级分类点击id值，赋值给coursePage
      this.coursePage.subjectId = subjectId
      // 点击某个二级分类进行条件查询
      this.gotoPage()
    },

    // 6 根据销量排序
    searchBuyCount () {
      // 设置对应变量值，为了样式生效
      this.buyCountSort = '1'
      this.createTimeSort = ''
      this.priceSort = ''

      // 把值赋值到coursePage
      this.coursePage.buyCountSort = this.buyCountSort
      this.coursePage.createTimeSort = this.createTimeSort
      this.coursePage.priceSort = this.priceSort

      // 调用方法查询
      this.gotoPage()
    },

    // 7 最新排序
    searchGmtCreate () {
      // 设置对应变量值，为了样式生效
      this.buyCountSort = ''
      this.createTimeSort = '1'
      this.priceSort = ''

      // 把值赋值到coursePage
      this.coursePage.buyCountSort = this.buyCountSort
      this.coursePage.createTimeSort = this.createTimeSort
      this.coursePage.priceSort = this.priceSort

      // 调用方法查询
      this.gotoPage()
    },

    // 8 价格排序
    searchPrice () {
      // 设置对应变量值，为了样式生效
      this.buyCountSort = ''
      this.createTimeSort = ''
      this.priceSort = '1'

      // 把值赋值到coursePage
      this.coursePage.buyCountSort = this.buyCountSort
      this.coursePage.createTimeSort = this.createTimeSort
      this.coursePage.priceSort = this.priceSort

      // 调用方法查询
      this.gotoPage()
    }
  }
}
</script>
<style scoped>
.active {
  background: #bdbdbd;
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>
