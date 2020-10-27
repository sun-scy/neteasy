import Login from './Login'

const routes =  [
    ...Login,
    {
      path:'/',
      redirect:'/login'
    }
]

export default routes
