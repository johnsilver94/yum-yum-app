/* eslint-disable arrow-parens */
import '@babel/polyfill';
import Vue from 'vue';
// Components
import './components';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from './firebase/index';

Vue.config.productionTip = false;

/* eslint-disable no-new */
const unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created() {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser);
      }
    }
  });
  unsubscribe();
});
