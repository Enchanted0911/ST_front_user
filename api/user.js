/* eslint-disable space-before-function-paren */
/* eslint-disable eol-last */
/* eslint-disable indent */
import request from '@/utils/request'

const apiName = '/rabbit/classroom/user'

export default {
    updateUserInfo(userInfo) {
        return request({
            url: `${apiName}`,
            method: 'put',
            data: userInfo
        })
    },
    updatePassword(passwordInfo) {
        return request({
            url: `${apiName}/pwd`,
            method: 'put',
            data: passwordInfo
        })
    },
    login(userLogin) {
        return request({
            url: `${apiName}/login`,
            method: 'post',
            data: userLogin
        })
    },
    register(userRegister) {
        return request({
            url: `${apiName}/register`,
            method: 'post',
            data: userRegister
        })
    },
    gainUserInfoByToken() {
        return request({
            url: `${apiName}`,
            method: 'get'
        })
    },
    gainUserInfoById(id) {
        return request({
            url: `${apiName}/${id}`,
            method: 'get'
        })
    }
}