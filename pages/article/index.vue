<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /文章列表 开始 -->
    <section class="container">
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">文章类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#" @click="searchAll()">全部</a>
                </li>
                <li
                  v-for="(item, index) in subjectOneList"
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
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li
                  v-for="(item, index) in subjectTwoList"
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
        </section>
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
                  v-model="articlePage.title"
                  clearable
                  placeholder="请输入文章标题关键字"
                  @keyup.enter.native="getList()"
                />
              </el-form-item>
              <el-form-item>
                <el-select
                  v-model="articlePage.teacherId"
                  clearable
                  filterable
                  placeholder="发布者"
                >
                  <el-option
                    v-for="item in teacherList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="getList()">
                  查询
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </section>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section v-if="total == 0" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span
              class="c-666 fsize14 ml10 vam"
            >没有相关数据，请联系管理员发布，说不定下次就有了呢...</span>
          </section>
          <!-- /无数据提示 结束-->
          <ul id="bna" class="of">
            <li v-for="item in list" :key="item.id" class="news-list">
              <div class="news-list-item">
                <div class="author-time">
                  <span>{{ item.teacherName }}</span>
                  <span>{{ item.createdTime }}</span>
                </div>
                <div class="news-des">
                  <h3 class="news-title">
                    <i /><a :href="'/article/' + item.id">{{ item.title }}</a>
                  </h3>
                </div>
                <div class="subject">
                  <span>{{ item.subjectParentName }}</span>
                  <span>{{ item.subjectName }}</span>
                </div>
              </div>
            </li>
          </ul>
          <div class="clear" />
        </div>
        <!-- 公共分页 开始 -->
        <el-pagination
          :current-page="articlePage.page"
          :page-size="articlePage.pageSize"
          :total="total"
          style="padding: 30px 0; text-align: center"
          layout="total, prev, pager, next, jumper"
          @current-change="getList()"
        />
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /文章列表 结束 -->
  </div>
</template>
<script>
import articleApi from '@/api/article'
import subjectApi from '@/api/subject'
import teacherApi from '@/api/teacher'

export default {
  // 写核心代码位置
  data () {
    // 定义变量和初始值
    return {
      oneIndex: -1,
      twoIndex: -1,
      subjectOneList: [], // 一级分类
      subjectTwoList: [], // 二级分类
      list: [], // 查询之后接口返回集合
      total: 0, // 总记录数
      articlePage: {
        page: 1,
        pageSize: 10,
        title: '',
        subjectParentId: '',
        subjectId: '',
        teacherId: ''
      },
      teacherList: []
    }
  },
  created () {
    // 页面渲染之前执行，一般调用methods定义的方法
    // 调用
    this.getList()
    this.getSubjectInfo()
    this.getTeacherList()
  },
  methods: {
    searchAll () {
      this.oneIndex = -1
      this.articlePage = { page: 1, pageSize: 10 }
      this.getList()
      this.subjectTwoList = []
    },
    getTeacherList () {
      teacherApi.listTeacher().then((response) => {
        // 2 获取所有一级分类
        this.teacherList = response.data
      })
    },
    getSubjectInfo () {
      subjectApi.gainSubject().then((response) => {
        // 2 获取所有一级分类
        this.subjectOneList = response.data
      })
    },
    getList (page = 1) {
      this.articlePage.page = page
      articleApi.pageArticle(this.articlePage).then((response) => {
        // 请求成功
        this.list = response.data.rows
        this.total = response.data.total
      })
    },
    // 4 点击某个一级分类，查询对应二级分类
    searchOne (subjectParentId, index) {
      // 把传递index值赋值给oneIndex,为了active样式生效
      this.oneIndex = index

      this.twoIndex = -1
      this.articlePage.subjectId = ''
      this.subjectTwoList = []

      // 把一级分类点击id值，赋值给coursePage
      this.articlePage.subjectParentId = subjectParentId
      // 点击某个一级分类进行条件查询
      this.getList()

      // 拿着点击一级分类id 和 所有一级分类id进行比较，
      // 如果id相同，从一级分类里面获取对应的二级分类
      for (let i = 0; i < this.subjectOneList.length; i++) {
        // 获取每个一级分类
        const oneSubject = this.subjectOneList[i]
        // 比较id是否相同
        if (subjectParentId === oneSubject.id) {
          // 从一级分类里面获取对应的二级分类
          this.subjectTwoList = oneSubject.subjectTwoResList
        }
      }
    },

    // 5 点击某个二级分类实现查询
    searchTwo (subjectId, index) {
      // 把index赋值,为了样式生效
      this.twoIndex = index
      // 把二级分类点击id值，赋值给coursePage
      this.articlePage.subjectId = subjectId
      // 点击某个二级分类进行条件查询
      this.getList()
    },
    resetData () {
      // 清空的方法
      // 表单输入项数据清空
      this.articlePage = { page: 1, pageSize: 10 }
      // 查询所有文章数据
      this.getList()
    }
  }
}
</script>
<style scoped>
.news-list-item {
  padding: 0px 0px;
}
.author-time {
  font-size: 18px;
}
.subject {
  font-size: 18px;
  text-align-last: start;
}
.news-des {
  padding: 20px;
  border-bottom: 2px solid #ccc;
}
.active {
  background: #bdbdbd;
}
.hide {
  display: none;
}
.show {
  display: block;
}
.news-title {
  font-size: 23px;
}
.news-title i {
  display: inline-block;
  width: 47px;
  height: 43px;
  margin-right: 10px;
  vertical-align: middle;
}
.news-title a {
  color: green;
}
.news-title a:hover {
  text-decoration: underline;
}

.news-list {
  margin: 10px 0;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 30px 20px;

  min-height: 100px;
}
.news-list:hover {
  box-shadow: 0 0 5px 3px #ccc;
}
</style>
