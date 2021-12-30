<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">全部讲师</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll" title="全部" href="#" @click="searchAll()">全部</a>
        </section>
      </header>
      <section style="margin:10px">
        <div>
          <el-form :inline="true" size="mini" class="demo-form-inline" @submit.native.prevent>
            <el-form-item>
              <el-input v-model="teacherPage.teacherName" clearable placeholder="请输入讲师关键字" @keyup.enter.native="gotoPage()" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="gotoPage(1)">
                查询
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </section>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section v-if="data.total==0" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">好像还没有老师愿意来这里...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="i-teacher-list">
            <ul class="of">
              <li v-for="teacher in data.rows" :key="teacher.id">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a :href="'/teacher/'+teacher.id" :title="teacher.name" target="_blank">
                      <img :src="teacher.avatar" :alt="teacher.name">
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a :href="'/teacher/'+teacher.id" :title="teacher.name" target="_blank" class="fsize18 c-666">{{ teacher.name }}</a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{ teacher.intro }}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">
                      {{ teacher.career }}
                    </p>
                  </div>
                </section>
              </li>
            </ul>
            <div class="clear" />
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <el-pagination
          :current-page="teacherPage.page"
          :page-size="teacherPage.pageSize"
          :total="total"
          style="padding: 30px 0; text-align: center"
          layout="total, prev, pager, next, jumper"
          @current-change="gotoPage"
        />
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /讲师列表 结束 -->
  </div>
</template>
<script>
import teacherApi from '@/api/teacher'

export default {
  data () {
    return {
      data: {},
      total: 0,
      teacherPage: {
        page: 1,
        pageSize: 8
      }
    }
  },
  created () {
    this.gotoPage()
  },
  methods: {
    // 分页切换的方法
    // 参数是页码数
    gotoPage (page = 1) {
      this.teacherPage.page = page
      teacherApi.pageTeacher(this.teacherPage)
        .then((response) => {
          this.data = response.data
          this.total = response.data.total
        })
    },
    searchAll () {
      this.teacherPage.teacherName = ''
      this.gotoPage()
    }
  }

}
</script>
