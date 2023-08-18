import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast, { POSITION } from 'vue-toastification'

import '@/assets/css/tailwind.css'
import '@/assets/css/fonts.css'
import 'animate.css'
import 'vue-toastification/dist/index.css'

createApp(App)
  .use(router)
  .use(Toast, { position: POSITION.TOP_RIGHT })
  .mount('#app')
