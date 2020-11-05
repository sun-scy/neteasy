
const Login = [
    {
        path: '/login',
        component: () => import('../../pages/Login/Login.vue')
    },
    {
        path: '/start',
        component: () => import('../../components/start/start.vue')
    }
]
export default Login