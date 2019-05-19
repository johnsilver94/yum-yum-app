import Vue from 'vue';
import Router from 'vue-router';
import Ingredients from './views/Ingredients.vue';
import Recipes from './views/Recipes.vue';
import Home from './views/Home.vue';
import Signin from './views/Signin.vue';
import Signup from './views/Signup.vue';
import NotFound from './views/NotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signin',
      name: 'Sign In',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Sign Up',
      component: Signup
    },
    {
      path: '/ingredients',
      name: 'Ingredients',
      component: Ingredients
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: Recipes
    },
    {
      path: '*',
      name: 'Not Found',
      component: NotFound
    }
  ]
});
