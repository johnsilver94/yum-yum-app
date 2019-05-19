import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    loading: false,
    ingredients: [],
    apiUrl: 'https://api.edamam.com/search'
  },
  mutations: {
    setUser(state, payload) {
      this.state.user = payload;
    },
    setError(state, payload) {
      this.state.error = payload;
    },
    setLoading(state, payload) {
      this.state.loading = payload;
    },
    setIngredients(state, payload) {
      this.state.ingredients = payload;
    }
  },
  actions: {
    userSignUp({ commit }, payload) {
      commit('setLoading', true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', { email: firebaseUser.user.email });
          commit('setLoading', false);
          router.push('/ingredients');
        })
        .catch(error => {
          commit('setError', error.message);
          commit('setLoading', false);
        });
    },
    userSignIn({ commit }, payload) {
      commit('setLoading', true);
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', { email: firebaseUser.user.email });
          commit('setLoading', false);
          commit('setError', null);
          router.push('/ingredients');
        })
        .catch(error => {
          commit('setError', error.message);
          commit('setLoading', false);
        });
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', { email: payload.email });
    },
    userSignOut({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
      router.push('/');
    },
    getIngredients({ commit }) {
      return firebase
        .database()
        .ref('ingredients')
        .on('value', snapshot => {
          commit('setIngredients', snapshot.val());
        });
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
    }
  }
});
