<template>
  <v-content>
    <v-container fluid>
      <core-navbar></core-navbar>
      <v-layout justify-center row>
        <v-flex xs12 class="text-xs-center display-1 font-weight-black my-5">Available Meals</v-flex>
      </v-layout>
      <meal-recipes></meal-recipes>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data: () => ({}),
  computed: {},
  methods: {}
};
</script>