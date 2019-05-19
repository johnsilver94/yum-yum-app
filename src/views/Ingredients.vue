<template>
  <v-content>
    <Navbar></Navbar>
    <v-container fluid>
      <v-layout justify-center row wrap>
        <v-flex xs12 md8 justify-center>
          <v-card>
            <v-toolbar flat color="info">
              <v-toolbar-title class="white--text">Ingredients</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-toolbar>
            <v-data-table
              :headers="ingredientsHeaders"
              :items="ingredients"
              :pagination.sync="pagination"
              :search="search"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td>
                  <v-checkbox align-center v-model="props.item.selected" color="green"></v-checkbox>
                </td>
                <td>
                  <v-img :src="props.item.image" height="32px" width="32px"></v-img>
                </td>
                <td>{{ props.item.name }}</td>
              </template>
            </v-data-table>
          </v-card>
          <div class="text-xs-center pt-2">
            <v-btn color="primary" @click="searchRecipes">Search Recipes</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar
  },
  data: () => ({
    pagination: {
      rowsPerPage: 10
    },
    search: "",
    ingredientsHeaders: [
      { text: "Select", align: "left", value: "pk", sortable: false },
      {
        text: "Ingredient image",
        align: "left",
        value: "image",
        sortable: false
      },
      {
        text: "Ingredient name",
        align: "left",
        value: "name",
        sortable: true
      }
    ]
  }),
  computed: {
    ingredients() {
      return this.$store.state.ingredients;
    }
  },
  created: function() {
    this.$store.dispatch("getIngredients");
  },
  methods: {
    searchRecipes() {
      this.$router.push({ path: "/recipes" });
    }
  }
};
</script>