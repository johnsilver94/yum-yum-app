<template>
  <v-content>
    <v-container fluid>
      <Navbar></Navbar>
      <v-layout justify-center row>
        <v-flex xs12 class="text-xs-center display-1 font-weight-black my-5">Available Meals</v-flex>
      </v-layout>
      <meal-recipes></meal-recipes>
    </v-container>
  </v-content>
</template>

<script>
import MealRecipes from "@/components/MealRecipes";
import Navbar from "@/components/Navbar";

export default {
  components: {
    MealRecipes,
    Navbar
  },
  data: () => ({}),
  computed: {},
  methods: {}
};
</script>