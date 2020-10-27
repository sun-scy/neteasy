



import vue from 'vue'
import vueRouter from 'vue-router'
import routes from '../routes'
vue.use(vueRouter)
const originalPush = vueRouter.prototype.push
vueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new vueRouter({
    mode: 'history',
    routes
})