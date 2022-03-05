/* eslint-disable space-before-function-paren */
/* eslint-disable eol-last */
/* eslint-disable indent */
import request from '@/utils/request'

const apiName = '/rabbit/classroom/article-content'

export default {
    articleContentDetails(id) {
        return request({
            url: `${apiName}/${id}`,
            method: 'get'
        })
    }
}