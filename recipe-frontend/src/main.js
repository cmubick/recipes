import { DefaultApolloClient } from '@vue/apollo-composable'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import 'primevue/resources/primevue.min.css'
// import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/themes/vela-blue/theme.css'
import { createApp, h, provide } from 'vue'
import { apolloClient } from './apolloclient'
import App from './App.vue'

import Button from 'primevue/button'

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(PrimeVue, { ripple: true })

app.component('Button', Button)

app.mount('#app')
