/* eslint-disable indent */
import request from '@/utils/request'

const apiName = '/rabbit/classroom/course'

export default {
    // 条件分页课程查询的方法
    // eslint-disable-next-line space-before-function-paren
    pageCourse(coursePage) {
        return request({
            url: `${apiName}/page`,
            method: 'get',
            params: coursePage
        })
    },
    // 课程详情的方法
    // eslint-disable-next-line space-before-function-paren
    courseDetails(id) {
        return request({
            url: `${apiName}/${id}`,
            method: 'get'
        })
    },
    // eslint-disable-next-line space-before-function-paren
    list8HotCourse() {
        return request({
            url: `${apiName}/hot-list`,
            method: 'get'
        })
    },
    // eslint-disable-next-line space-before-function-paren
    gainCourseOutline(id) {
        return request({
            url: `${apiName}/outline/${id}`,
            method: 'get'
        })
    },
    // eslint-disable-next-line space-before-function-paren
    gainIfBuy(id) {
        return request({
            url: `${apiName}/bought/${id}`,
            method: 'get'
        })
    },
    // eslint-disable-next-line space-before-function-paren
    listCourseByTeacherId(id) {
        return request({
            url: `${apiName}/teacher/${id}`,
            method: 'get'
        })
    }
    // eslint-disable-next-line eol-last
}