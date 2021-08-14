import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import PrimeVue from 'primevue/config'
import 'primevue/resources/primevue.min.css'
// Light theme
import 'primevue/resources/themes/saga-blue/theme.css'
// Dark theme
// import 'primevue/resources/themes/vela-blue/theme.css'
import { createApp, h, provide } from 'vue'
import { apolloClient } from './apolloclient'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Divider from 'primevue/divider'
import Menubar from 'primevue/menubar'
import Card from 'primevue/card'

import { router } from './router'

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.use(router)
app.use(PrimeVue, { ripple: true })

app.component('Button', Button)
app.component('InputText', InputText)
app.component('Password', Password)
app.component('Divider', Divider)
app.component('Menubar', Menubar)
app.component('Card', Card)

app.mount('#app')
