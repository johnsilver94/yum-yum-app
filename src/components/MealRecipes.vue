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

            <div class="subheading">Ingredients</div>
            <ul>
              <li v-for="(ingredient, i) in item.ingredients" :key="i">{{ingredient}}</li>
            </ul>
          </v-card-text>

          <v-card-actions>
            <v-btn color="green" dark>Video recipes</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    recipes: [
      {
        name: "Keto Chocolate Smoothie recipes",
        image:
          "https://www.edamam.com/web-img/083/0834f93ea42c9df7e2faf4125f2b13c1",
        ingredients: [
          "1 can full fat coconut milk (375 grams)",
          "¼ cup egg-white protein powder (20 grams)",
          "2 tablespoons ground chia seeds (20 grams)",
          "½ teaspoon vanilla stevia",
          "&frac13; cup chopped 85% dark chocolate (50 grams)",
          "2-3 cups ice"
        ]
      }
    ]
  }),
  computed: {
    // recipes() {
    //   return this.$store.state.recipes;
    // },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {}
};
</script>

<style scoped>
</style>
