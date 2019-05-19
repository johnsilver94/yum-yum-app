<template>
  <v-content>
    <v-img :src="image" class="background-image">
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-card-text>
                <v-layout row wrap align-center>
                  <v-flex xs12 text-xs-center mt-5>
                    <h1>Welcome to Yum Yum</h1>
                  </v-flex>
                  <v-flex xs6 sm6 offset-sm3 mt-3>
                    <blockquote class="blockquote text-xs-center">
                      It's a simple application that will
                      <br>help you to prepare your meal
                    </blockquote>
                  </v-flex>
                  <v-flex xs6 sm6 offset-sm3 mt-3 class="text-xs-center" mt-5>
                    <v-btn color="primary" to="/signup">Sign Up</v-btn>
                    <v-btn to="/signin">Sign In</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
  </v-content>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    image() {
      const random = Math.floor(Math.random() * 5 + 1);
      return `./food-${random}.jpg`;
    }
  },
  methods: {}
};
</script>

<style lang="scss">
.background-image {
  max-width: 100%;
  max-height: 940px;
}
.elevation-12 {
  opacity: 0.9;
  border-radius: 5px;
}
</style>
