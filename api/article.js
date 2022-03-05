/* eslint-disable space-before-function-paren */
/* eslint-disable eol-last */
/* eslint-disable indent */
import request from '@/utils/request'

const apiName = '/rabbit/classroom/article'

export default {
    pageArticle(articlePage) {
        return request({
            url: `${apiName}/page`,
            method: 'get',
            params: { articlePage }
        })
    },
    articleDetails(id) {
        return request({
            url: `${apiName}/${id}`,
            method: 'get'
        })
    }
}