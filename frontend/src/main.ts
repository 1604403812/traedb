import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import { useThemeStore } from './stores/theme'
import './assets/styles/variables.css'
import 'ant-design-vue/dist/reset.css'
import './assets/styles/global.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Antd)

const themeStore = useThemeStore(pinia)
themeStore.initTheme()

app.mount('#app')
