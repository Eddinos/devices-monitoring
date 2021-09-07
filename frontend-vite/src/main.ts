import { createApp } from 'vue'
import routes from './router'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

createApp(App).use(router).mount('#app')    