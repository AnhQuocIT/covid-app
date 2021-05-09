<template>
    <v-app-bar app :color="header.color.mainColor" dark :src="header.img.scr">
        <template v-slot:img="{ props }">
            <v-img v-bind="props" :gradient="header.img.gradientStyle"></v-img>
        </template>

        <v-app-bar-nav-icon @click="onToogleMenu"></v-app-bar-nav-icon>

        <v-toolbar-title>{{header.title}}</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn icon @click="onOpenDialog">
            <v-icon>{{ header.icon.rightIcon }}</v-icon>
        </v-btn>
        <AboutDialog :dialog="isShowAboutDialog" @onClose="onCloseDialog" />
    </v-app-bar>
</template>

<script>
import AboutDialog from "../views/dialog/About"
export default {
    props: ["header","drawer"],
    components: {
        AboutDialog
    },
    data: () => ({
        isShowAboutDialog: false,
    }),
    methods: {
        onToogleMenu() {
            this.$emit("toogle");
        },
        onOpenDialog(){
            this.isShowAboutDialog = true;
        },
        onCloseDialog() {
            this.isShowAboutDialog = false;
        }
    }
}
</script>

<style></style>
