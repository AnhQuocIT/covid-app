<template>
    <v-dialog v-model="dialog" persistent width="400" height="300">
        <v-card color="primary" dark>
            <v-card-text>
                Please wait...
                <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                    buffer-value="300"
                ></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ["dialog"],
    watch: {
        dialog(val) {
            if (!val) {
                this.dialog = false;
            };
        },
    },
};
</script>

<style></style>
