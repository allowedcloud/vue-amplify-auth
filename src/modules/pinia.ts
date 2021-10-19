import { createPinia } from 'pinia'
import { UserModule } from '~/types'
import { useStore } from '../stores/auth'

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = ({ isClient, initialState, app, router }) => {
  const pinia = createPinia()
  app.use(pinia)

  const store = useStore()
  router.beforeEach((to) => {
    if (to.meta.auth && !store.isAuthenticated) {
      return {
        path: '/login'
      }
    }
  })
}