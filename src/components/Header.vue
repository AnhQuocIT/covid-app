<template>
    <v-app-bar app :color="header.color.mainColor" dark :src="header.img.scr">
        <template v-slot:img="{ props }">
            <v-img v-bind="props" :gradient="header.img.gradientStyle"></v-img>
        </template>

        <v-app-bar-nav-icon @click="onToogleMenu"></v-app-bar-nav-icon>

        <v-toolbar-title>{{header.title}}</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>{{ header.icon.rightIcon }}</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    props: ["header","drawer"],
    methods: {
        onToogleMenu() {
            this.$emit("toogle");
        },
    }
}
</script>

<style></style>
