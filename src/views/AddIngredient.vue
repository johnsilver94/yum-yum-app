<template>
  <v-content>
    <v-container fill-height fluid grid-list-xl>
      <v-layout justify-center wrap>
        <v-flex xs12 md8>
          <material-card color="green" title="Ingredient" text="Add new ingredient to database.">
            <v-form ref="ingredientsForm" lazy-validation>
              <v-container py-0>
                <v-layout wrap>
                  <v-flex xs12 md8>
                    <v-text-field
                      v-model="newIngredient.name"
                      :rules="ingredientRules.name"
                      label="Name"
                      class="purple-input"
                    />
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
                      @click="saveIngredient"
                    >Save Ingredient</v-btn>
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
    newIngredient: {
      name: "",
      image: "",
      selected: false
    },
    ingredientRules: {
      name: [v => !!v || "Ingredient name is required"],
      image: [v => !!v || "Ingredient image is required"]
    },
    //Notification
    color: "info",
    text: "",
    bottom: true,
    right: true,
    notificationbar: false,
    timeout: 600
  }),
  computed: {},
  methods: {
    showNotification(notification) {
      this.color = notification.color;
      this.text = notification.text;

      this.notificationbar = true;
    },
    saveIngredient() {
      const payload = { ingredient: null, file: null };
      payload.ingredient = this.newIngredient;
      payload.file = this.selectedFile;

      this.$store.dispatch("saveIngredient", payload);

      const notification = {
        color: "success",
        text: "Ingredient succesfuly added."
      };

      this.newIngredient = {
        name: "",
        image: "",
        selected: false
      };

      this.$refs.ingredientsForm.reset();
      this.$refs.file.value = "";

      this.showNotification(notification);
    },
    onfileSelected(event) {
      this.selectedFile = event.target.files[0];
    }
  }
};
</script>