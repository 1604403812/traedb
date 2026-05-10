import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { ConfigProvider } from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import { morandiTheme } from '@/theme';
import '@/assets/styles/global.css';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(ConfigProvider, {
  theme: morandiTheme,
});

app.mount('#app');
