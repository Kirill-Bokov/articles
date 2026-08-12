import './assets/main.css';
import store from './store/index.ts';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');