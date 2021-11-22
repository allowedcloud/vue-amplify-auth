import { createPinia } from "pinia";
import { useStore } from "../stores/auth";
import { UserModule } from "~/types";

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = ({ app, router, routes }) => {
  const pinia = createPinia();
  app.use(pinia);

  const store = useStore();
  router.beforeEach((to) => {
    // routes.forEach((route) => {
    //   if (route.path === "/users/:username")
    //     route.meta = {
    //       auth: true
    //     };
    // });

    if (to.params.username)
      to.meta = {
        auth: true
      };

    if (to.meta.auth && !store.isAuthenticated) {
      router.push("/login");
    }

    if (store.isAuthenticated && to.path === "/login")
      router.push(`/users/${store.cognitoUser.username}`);
  });
};
