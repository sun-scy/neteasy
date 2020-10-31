import {SAVEUSERINFO,USERINFO} from './mutation_type'
import http from '../api'
import router from '../router'
import {Toast} from 'vant'
console.log(http)
const OK = 200
const ERROR = 401
    export default {
        async [SAVEUSERINFO]  ({commit},data) {
        let body =  await http.Login.login(data)
        if(body.code == OK){
            Toast('登录成功')
            router.push('/personal')
        }else{
            Toast(body.msg)
        }
            commit(SAVEUSERINFO,body)
            commit(USERINFO,body.profile)
        }
    }