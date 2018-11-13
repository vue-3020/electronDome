import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'landing-page',
            component: require('@/components/LandingPage').default
        },
        {
            path: '/news',
            name: 'news',
            component: require('@/components/news').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})