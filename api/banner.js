/* eslint-disable space-before-function-paren */
/* eslint-disable eol-last */
/* eslint-disable indent */
import request from '@/utils/request'

export default {
    gainAllBanner() {
        return request({
            url: '/rabbit/extracurricular/banner',
            method: 'get'
        })
    }
}