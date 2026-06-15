import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import './app/assets/scss/tokens.scss'
import './app/assets/scss/global.scss'

createApp(App).use(router).mount('#app')
