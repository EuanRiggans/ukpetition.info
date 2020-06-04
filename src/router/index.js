import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ViewInfo from "../views/ViewInfo";
import ContactPage from "../views/ContactPage";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/view-info/:petition_id',
        name: 'ViewInfo',
        component: ViewInfo,
        props: true
    },
    {
        path: '/contact/',
        name: 'ContactPage',
        component: ContactPage,
        props: true
    },
]

const router = new VueRouter({
    routes
})

export default router
