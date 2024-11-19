import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#42d29f",
        secondary: "#efefef",
        accent: "#42d29f",
        error: "#fa5e55",
        info: "#c8dafc",
        success: "#30ba78",
        warning: "#ffb184",
        anchor: "#81aefc",
      },
    },
  },
});

export default vuetify;
