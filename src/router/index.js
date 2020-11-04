



import vue from 'vue'
import router from 'vue-router'
import routes from '../routes'
import { getToken } from '../utils/auth_serve'
vue.use(router)
const originalPush = router.prototype.push
router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const vueRouter = new router({
  mode: 'history',
  routes
})
vueRouter.beforeEach((to, from, next) => {

  if (getToken()) {
    if (to.path == '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default vueRouter