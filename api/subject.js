/* eslint-disable indent */
import request from '@/utils/request'

const apiName = '/rabbit/classroom/subject'

export default {
    // 查询所有分类的方法
    // eslint-disable-next-line space-before-function-paren
    gainSubject() {
        return request({
            url: `${apiName}`,
            method: 'get'
        })
    }
    // eslint-disable-next-line eol-last
}