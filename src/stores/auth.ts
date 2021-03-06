import { defineStore } from "pinia";
import { Auth } from "aws-amplify";
import router from "~/router";

export const useStore = defineStore("auth", {
  state: () => {
    return {
      isAuthenticated: false,
      cognitoUser: {},
      error: ""
    };
  },
  getters: {
    getUser(state) {
      return state.cognitoUser;
    }
  },
  actions: {
    async load() {
      try {
        const cognitoUser = await Auth.currentAuthenticatedUser();

        // console.log('Loading User with data', cognitoUser)

        this.cognitoUser = cognitoUser;
        this.isAuthenticated = true;

        return Promise.resolve(cognitoUser);
      } catch (error) {
        this.cognitoUser = {};
        console.warn(error);
        return Promise.resolve(null);
      }
    },

    async signIn(userData: any) {
      try {
        const cognitoUser = await Auth.signIn(userData);
        this.cognitoUser = cognitoUser;
        this.isAuthenticated = true;
        return Promise.resolve(cognitoUser);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async signUp(userData: any) {
      try {
        const cognitoUser = await Auth.signUp({
          username: userData.username,
          password: userData.password,
          attributes: {
            email: userData.email
          }
        });
        return Promise.resolve(cognitoUser);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async confirmSignUp(userData: any) {
      try {
        const cognitoUser = await Auth.confirmSignUp(
          userData.username,
          userData.code
        );
        return Promise.resolve(cognitoUser);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async signOut() {
      try {
        await Auth.signOut();
        this.isAuthenticated = false;
        this.cognitoUser = {};
      } catch (error) {
        console.log("Error signing out: ", error);
      }
    },

    async forgotPassword(username: string) {
      return await Auth.forgotPassword(username)
        .then((data) => {
          return Promise.resolve(data);
        })
        .catch((error) => {
          this.error = error.message;
          return Promise.reject(error);
        });
    },

    async forgotPasswordSubmit(
      username: string,
      code: string,
      password: string
    ) {
      return await Auth.forgotPasswordSubmit(username, code, password)
        .then((data) => {
          return Promise.resolve(data);
        })
        .catch((error) => {
          this.error = error.message;
          return Promise.reject(error);
        });
    }
  }
});
