<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm6 md6 lg4 v-for="(item, idx) in recipes" :key="idx">
        <v-card data-cy="recipeEntry">
          <v-responsive>
            <v-img :src="item.image"></v-img>
          </v-responsive>

          <v-card-text>
            <div class="title my-5">{{item.name}}</div>

            <div class="subheading">Ingredients:</div>
            <!-- <div>{{item.description}}</div> -->
            <ul>
              <li v-for="(line, i) in item.descriptionLines" :key="i">{{line}}</li>
            </ul>
          </v-card-text>

          <v-card-actions>
            <v-btn color="green" dark @click="videoRecipe(item.name)">Video recipes</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
  created: function() {
    this.$store.dispatch("getRecipes");
    this.$store.state.search = false;
  },
  computed: {
    recipes() {
      return this.$store.state.recipes;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    videoRecipe(name) {
      window.open(`https://www.youtube.com/results?search_query=${name}`);
    }
  }
};
</script>

<style scoped>
</style>
