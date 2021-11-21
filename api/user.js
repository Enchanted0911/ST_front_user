/* eslint-disable space-before-function-paren */
/* eslint-disable eol-last */
/* eslint-disable indent */
import request from '@/utils/request'

export default {
    updateUserInfo(userInfo) {
        return request({
            url: '/eduUserCenter/member',
            method: 'put',
            data: userInfo
        })
    },
    updatePassword(passwordInfo) {
        return request({
            url: '/eduUserCenter/member/password',
            method: 'put',
            data: passwordInfo
        })
    }
}