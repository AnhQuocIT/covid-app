<template>
    <v-app id="inspire">
      <Header :header="header" />
      <Menu :menu="menu"/>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import Header from "./components/Header";
import Menu from "./components/Menu";
export default {
    components: {
        Header,
        Menu,
    },
    data: () => ({
        header: {
            img: {
                scr: "https://picsum.photos/1920/1080?random",
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
            items: [
                { title: "Country List", icon: "mdi-view-dashboard", to: "/" },
                { title: "Favorite", icon: "mdi-star-box", to: "/favorite" },
            ],
            right: null,
        },
    }),
};
</script>
