/* eslint-disable space-before-function-paren */
/* eslint-disable eol-last */
/* eslint-disable indent */
import request from '@/utils/request'

const apiName = '/rabbit/classroom/article-comment'

export default {
    pageArticleComment(articleCommentPage) {
        return request({
            url: `${apiName}/page`,
            method: 'get',
            params: articleCommentPage
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