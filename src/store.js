import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: false,
    user: null,
    error: null,
    loading: false,
    ingredients: [],
    recipes: [],
    ingredientNames: [],
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
      const newArrayDataOfOjbect = Object.values(payload);
      this.state.ingredients = newArrayDataOfOjbect;
      newArrayDataOfOjbect.forEach(ingredient => {
        this.state.ingredientNames.push(ingredient.name);
      });
    },
    setRecipes(state, payload) {
      const newArrayDataOfOjbect = Object.values(payload);

      const selectedIngredients = [];

      if (this.state.ingredients.length > 0 && this.state.search) {
        this.state.ingredients.forEach(ingredient => {
          if (ingredient.selected) {
            selectedIngredients.push(ingredient.name);
          }
        });
        const recipes = newArrayDataOfOjbect.filter(recipe => {
          if (
            recipe.ingredients.some(ingredient => {
              if (selectedIngredients.indexOf(ingredient) > -1) return true;
              return false;
            })
          ) {
            return true;
          }
          return false;
        });
        this.state.recipes = recipes;
      } else {
        this.state.recipes = newArrayDataOfOjbect;
      }
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
    },
    getRecipes({ commit }) {
      return firebase
        .database()
        .ref('recipes')
        .on('value', snapshot => {
          commit('setRecipes', snapshot.val());
        });
    },
    // eslint-disable-next-line no-unused-vars
    saveIngredient({ state }, payload) {
      const storageRef = firebase.storage().ref(payload.file.name);
      const uploadTask = storageRef.put(payload.file);

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress} % done`);
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING:
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        error => {
          console.log(error.toString());
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('File available at', downloadURL);

            // eslint-disable-next-line no-param-reassign
            payload.ingredient.image = downloadURL;
            firebase
              .database()
              .ref('ingredients')
              .push(payload.ingredient);
          });
        }
      );
    },
    // eslint-disable-next-line no-unused-vars
    saveRecipe({ state }, payload) {
      const storageRef = firebase.storage().ref(`recipes/${payload.file.name}`);
      const uploadTask = storageRef.put(payload.file);

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress} % done`);
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING:
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        error => {
          console.log(error.toString());
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('File available at', downloadURL);

            // eslint-disable-next-line no-param-reassign
            payload.recipe.image = downloadURL;
            firebase
              .database()
              .ref('recipes')
              .push(payload.recipe);
          });
        }
      );
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
    }
  }
});
