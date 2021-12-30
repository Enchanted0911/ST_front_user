/* eslint-disable indent */
import request from '@/utils/request'

const apiName = '/rabbit/classroom/teacher'

export default {
    // eslint-disable-next-line space-before-function-paren
    list4HotTeacher() {
        return request({
            url: `${apiName}/hot-list`,
            method: 'get'
        })
    },
    // 分页讲师查询的方法
    // eslint-disable-next-line space-before-function-paren
    pageTeacher(teacherPage) {
        return request({
            url: `${apiName}/page`,
            method: 'get',
            params: teacherPage
        })
    },
    // 讲师详情的方法
    // eslint-disable-next-line space-before-function-paren
    teacherDetails(id) {
        return request({
            url: `${apiName}/${id}`,
            method: 'get'
        })
    }

    // eslint-disable-next-line eol-last
}