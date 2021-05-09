<template>
    <v-dialog
        v-model="dialog"
        @keydown.esc="onClose"
        @click:outside="onClose"
        width="500"
    >
        <v-card>
            <v-card-title class="headline primary lighten-2 justify-center">
                About
            </v-card-title>

            <v-card-text class="dialog-content">
                <h3>Thank you for visiting my website.</h3>
                <h3>This website is still in development.</h3>
                <h3>Technologies used in this website:</h3>
                <div>- Framework: <a href="https://vuejs.org/">VueJS</a></div>
                <div>
                    - Material Design Framework:
                    <a href="https://vuetifyjs.com/en/">Vuetify</a>
                </div>
                <div>
                    - Chart: <a href="https://vue-chartjs.org/">Vue-Chartjs</a>
                </div>
                <h3>Contact me: quocnguyenn0206@gmail.com</h3>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="onClose"> Close </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ["dialog"],
    methods: {
        onClose() {
            this.$emit("onClose");
        },
    },
};
</script>

<style scoped>
.dialog-content > div,
h3 {
    padding-top: 10px;
}
</style>
