import {SAVEUSERINFO,USERINFO} from './mutation_type'

export default {
    [SAVEUSERINFO](state,data){
        state.token = data.token
    },
    [USERINFO](state,data){
        state.userInfo = data
    }
}