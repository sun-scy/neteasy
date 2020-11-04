import { SAVEUSERINFO, USERINFO, AUTOLOGIN } from './mutation_type'
import http from '../api'
import router from '../router'
import { Toast } from 'vant'
console.log(http)
const OK = 200
const ERROR = 401
export default {
    async [SAVEUSERINFO]({ commit }, data) {
        let body = await http.Login.login(data)
        if (body.code == OK) {
            Toast('登录成功')
            router.push('/personal')
        } else {
            Toast(body.msg)
        }
        commit(SAVEUSERINFO, body)
        commit(USERINFO, body.profile)
    },

    async [AUTOLOGIN]({ commit }) {
        try {
            const body = await http.login.autoLogin();
            if (body.code === OK) {
                //正常的自动登录; 应该去覆盖user
                commit(AUTOLOGIN, body.data)
            } else if (body.code === NOTOKEN) {
                //没有携带token 先给一个提示 应该跳转到登录页

                alert(body.msg);
                router.replace("/Login");

                // 这边不能使用Toast 会被模块内部的Toast覆盖掉
                // Toast.fail({
                //     message:body.msg,
                //     duration:3000,
                //     onClose(){
                //         router.replace("/Login");
                //     }
                // })

            }
        } catch (e) {
            //代表token过期 先给一个提示 应该跳转到登录页
            alert(e.response.data.message);
            router.replace("/Login");
        }
    }
}