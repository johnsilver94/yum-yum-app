<template>
  <v-content>
    <v-container fill-height fluid grid-list-xl>
      <v-layout justify-center wrap>
        <v-flex xs12 md8>
          <material-card color="green" title="Recipe" text="Add new recipe to database.">
            <v-form ref="recipeForm" lazy-validation>
              <v-container py-0>
                <v-layout wrap>
                  <v-flex xs12 md8>
                    <v-text-field
                      v-model="newRecipe.name"
                      :rules="recipeRules.name"
                      label="Name"
                      class="purple-input"
                    />
                  </v-flex>
                  <v-flex xs12 md8>
                    <v-textarea
                      v-model="newRecipe.description"
                      :rules="recipeRules.description"
                      label="Description"
                      class="purple-input"
                    />
                  </v-flex>
                  <v-flex xs12 md8>
                    <v-combobox
                      v-model="newRecipe.ingredients"
                      :rules="recipeRules.ingredients"
                      :items="ingredientsNames"
                      label="Select used Ingredients"
                      class="purple-input"
                      multiple
                    ></v-combobox>
                  </v-flex>
                  <v-flex xs12 md8>
                    <input
                      type="file"
                      ref="file"
                      label="Image"
                      class="purple-input"
                      @change="onfileSelected"
                    >
                  </v-flex>

                  <v-flex xs12 text-xs-right>
                    <v-btn
                      class="mx-0 font-weight-light"
                      color="success"
                      @click="saveRecipe"
                    >Save Recipe</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </material-card>
        </v-flex>
      </v-layout>
      <v-snackbar
        v-model="notificationbar"
        :timeout="timeout"
        :color="color"
        :bottom="bottom"
        :right="right"
        dark
      >
        <v-icon :color="color" class="mr-3">mdi-bell-plus</v-icon>
        <div>{{text}}</div>
        <v-icon size="16" @click="notificationbar = false">mdi-close-circle</v-icon>
      </v-snackbar>
    </v-container>
  </v-content>
</template>


<script>
export default {
  data: () => ({
    selectedFile: null,
    newRecipe: {
      name: "",
      description: "",
      descriptionLines: [],
      image: "",
      ingredients: []
    },
    recipeRules: {
      name: [v => !!v || "Recipe name is required"],
      image: [v => !!v || "Recipe image is required"],
      description: [v => !!v || "Recipe description is required"],
      ingredients: [v => !!v || "Ingredients tags are required"]
    },
    //Notification
    color: "info",
    text: "",
    bottom: true,
    right: true,
    notificationbar: false,
    timeout: 600
  }),
  created: function() {
    this.$store.dispatch("getIngredients");
  },
  computed: {
    ingredientsNames() {
      return this.$store.state.ingredientNames;
    }
  },
  methods: {
    showNotification(notification) {
      this.color = notification.color;
      this.text = notification.text;

      this.notificationbar = true;
    },
    saveRecipe() {
      const payload = { ingredient: null, file: null };

      this.newRecipe.descriptionLines = this.newRecipe.description.split("\n");
      payload.recipe = this.newRecipe;
      payload.file = this.selectedFile;

      this.$store.dispatch("saveRecipe", payload);

      const notification = {
        color: "success",
        text: "Recipe succesfuly added."
      };

      this.newRecipe = {
        name: "",
        description: "",
        image: "",
        ingredients: []
      };

      this.$refs.recipeForm.reset();
      this.$refs.file.value = "";

      this.showNotification(notification);
    },
    onfileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile.name);
    }
  }
};
</script>