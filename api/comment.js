/* eslint-disable space-before-function-paren */
/* eslint-disable eol-last */
/* eslint-disable indent */
import request from '@/utils/request'

const apiName = '/rabbit/classroom/course-comment'

export default {

    pageComment(commentPage) {
        return request({
            url: `${apiName}/page`,
            method: 'get',
            params: { commentPage }

        })
    },

    saveComment(comment) {
        return request({
            url: `${apiName}`,
            method: 'post',
            data: comment
        })
    }

}