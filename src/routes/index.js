import Login from './Login'
import personal from './personal'
const routes =  [
    ...Login,
    ...personal,
    {
      path:'/',
      redirect:'/login'
    }
]

export default routes
