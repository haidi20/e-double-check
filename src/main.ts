import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/style.css'
import '@/core/styles/livinTheme.css'
import '@/core/styles/featureScreens.css'
import App from '@/App.vue'
import { router } from '@/core/router'

const app = createApp(App).use(createPinia()).use(router)

void router.isReady().then(() => {
  app.mount('#app')
})
