<template>
    <v-app id="inspire">
        <Header :header="header" @toogle="onToogleMenu" />
        <Menu :menu="menu" :drawer="drawer"/>
        <v-main>
            <router-view></router-view>
        </v-main>
        <LoadingMark
            class="global-loading-mark"
            v-model="globalLoading.isLoading"
        />
    </v-app>
</template>

<script>
import Header from "./components/Header";
import Menu from "./components/Menu";
import { system } from "./conf/config";
import LoadingMark from "./components/LoadingMark";
export default {
    components: {
        Header,
        Menu,
        LoadingMark
    },
    data: () => ({
        drawer: false,
        header: {
            title: system.app.header.name,
            img: {
                scr: system.app.header.imgScr,
                gradientStyle:
                    "to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)",
            },
            icon: {
                rightIcon: "mdi-shield-star",
            },
            color: {
                mainColor: "#fcb69f",
            },
        },
        menu: {
            title: system.app.header.subtitle,
            items: [
                { title: "Country List", icon: "mdi-view-dashboard", to: "/" },
                { title: "Favorite", icon: "mdi-star-box", to: "/favorite" },
            ],
            right: null,
        },
        globalLoading: {
            isLoading: false,
        },
    }),
    mounted() {
        this.globalLoading.isLoading = true;
        setTimeout(() => {
            this.globalLoading.isLoading = false;
        }, 1000);
    },
    methods: {
        onToogleMenu() {
            this.drawer = !this.drawer;
        }
    }
};
</script>

<style scoped>
.global-loading-mark {
    z-index: 888;
    background-color: rgba(0,0,0,0.5);
}
</style>