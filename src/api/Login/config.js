import { loading, success, clear } from '../../utils/Toast'
export default {
    api: {
        login: {
            url: '/login/cellphone',
            query: true,
            method: 'post'
        },
        banner: {
            url: '/banner',
            method: 'get',
            hooks: {
                beforeReq() {
                    loading()
                },
                receiveRes() {
                    clear()
                },
            }
        },
    },
}
