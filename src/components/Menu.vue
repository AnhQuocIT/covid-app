<template>
    <v-navigation-drawer :value="toogleMenu" app>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title"> {{menu.title}} </v-list-item-title>
                <v-list-item-subtitle> Data Visualization </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
            <v-list-item
                v-for="item in menu.items"
                :key="item.title"
                :to="item.to"
                link
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    props: ["menu","drawer"],
    computed: {
        toogleMenu() {
            return this.drawer;
        }
    }
};
</script>

<style></style>
