import VueRouter from 'vue-router'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Products from '@/components/Products'

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/signup',
            component: SignUp
        },
        {
            path: '/products',
            component: Products
        }
    ]
})