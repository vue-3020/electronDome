import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: require('@/components/Home').default
        },
        {
            path: '/alarm',
            name: 'alarm',
            component: require('@/components/Alarm').default
        },
        {
            path: '/keywords',
            name: 'keywords',
            component: require('@/components/Keywords').default
        },
        {
            path: '/report',
            name: 'report',
            component: require('@/components/Report').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})