<template>
    <DataTable :data="tableData" />
</template>

<script>
import DataTable from "../components/Table";
import CovidInforService from "../service/covid-info-service";
import LocalStorageService from "../service/localstorage-service";
export default {
    components: {
        DataTable,
    },
    data: () => ({
        service: {
            CovidInforService,
            LocalStorageService,
        },
        tableData: {
            search: '',
            isLoading: false,
            headers: [
                {
                    text: "",
                    align: "start",
                    sortable: false,
                    value: "CountryCode",
                },
                {
                    text: "Country",
                    sortable: false,
                    value: "Country",
                },
                { text: "Total Confirmed", value: "TotalConfirmed" },
                { text: "Total Deaths", value: "TotalDeaths" },
                { text: "Total Recovered", value: "TotalRecovered" },
                { text: "Favorite", value: "Favorite" },
            ],
            items: [],
        },
    }),
    created() {
        this.tableData.isLoading = true;
        
        if (this.service.LocalStorageService.getDataFromStorage() == null || this.service.LocalStorageService.getDataFromStorage().length == 0) {
            this.tableData.isLoading = false;
            return;
        }
        this.timmer = setInterval(() => {
            if (this.tableData.items.length != 0) {
                this.tableData.isLoading = false;
                return;
            }
            this.tableData.items = this.service.CovidInforService.getFavorite();
        }, 800);
    },
    destroyed() {
        clearInterval(this.timmer);
    },
};
</script>

<style></style>
