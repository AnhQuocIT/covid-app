<template>
    <v-data-table
        :headers="data.headers"
        :items="data.items"
        :items-per-page="10"
        class="elevation-1 pa-6"
        :loading="false"
        loading-text="Please wait..."
        @click:row="showDetails($event.CountryCode)"
    >
        <template v-slot:item.CountryCode="{ item }">
            <img :src="'https://www.countryflags.io/' + item.CountryCode + '/shiny/32.png'" />
        </template>
        <template v-slot:item.Favorite="{ item }">
            <v-simple-checkbox @click="addToFavorite(item)" v-model="item.isFavorite"></v-simple-checkbox>
        </template>
    </v-data-table>
</template>

<script>
import LocalStorageService from "../service/localstorage-service";
export default {
    props: ["data"],
    data: () => ({
        service: LocalStorageService,
    }),
    methods: {
        showDetails(countryID) {
            console.log(countryID);
        },
        addToFavorite(item) {
            this.service.updateDataToStorage(item.CountryCode);
        }
    },
};
</script>

<style></style>
