import { createRouter, createWebHistory } from 'vue-router'
import SingletonDemo from '../examples/singleton/SingletonDemo.vue'
import FactoryMethodDemo from "@/examples/factory-method/Factory-MethodDemo.vue";
import AdapterDemo from "@/examples/adapter/AdapterDemo.vue";
import DecoratorDemo from "@/examples/decorator/DecoratorDemo.vue";
import ObserverDemo from "@/examples/observer/ObserverDemo.vue";
import VisitorDemo from "@/examples/visitor/VisitorDemo.vue";
import BuilderDemo from "@/examples2/builder/BuilderDemo.vue";
import ProxyDemo from "@/examples2/proxy/ProxyDemo.vue";
import StrategyDemo from "@/examples2/strategy/StrategyDemo.vue";
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../components/HelloWorld.vue')
    },
    {
        path: '/singleton',
        name: 'Singleton',
        component: SingletonDemo
    },
    {
        path: '/factory-method',  // 추가
        name: 'Factory-Method',
        component: FactoryMethodDemo
    },
    {
        path: '/adapter',
        name: 'Adapter',
        component: AdapterDemo
    },
    {
        path: '/decorator',
        name: 'Decorator',
        component: DecoratorDemo
    },
    {
        path: '/observer',
        name: 'Observer',
        component: ObserverDemo
    },
    {
        path: '/visitor',
        name: 'Visitor',
        component: VisitorDemo
    },
    {
        path: '/builder',
        name: 'Builder',
        component: BuilderDemo
    },
    {
        path: '/proxy',
        name: 'Proxy',
        component: ProxyDemo
    },
    {
        path: '/strategy',
        name: 'Strategy',
        component: StrategyDemo
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router