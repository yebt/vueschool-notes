import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import AppLink from './components/shared/AppLink.vue'

createApp(App)
  .component('AppLink', AppLink) // NOTE: global component
  .use(router)
  .mount('#app')
