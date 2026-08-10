import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import VueIcon from './components/VueIcon.vue'

const app = createApp(App)
app.component('VueIcon', VueIcon)
app.use(createPinia())
app.use(router)
app.mount('#app')
