<template>
    <DataTable :data="tableData" />
</template>

<script>
import DataTable from "../components/Table";
import CovidInforService from "../service/covid-info-service";
export default {
    components: {
        DataTable,
    },
    data: () => ({
        service: CovidInforService,
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
        this.timmer = setInterval(() => {
            if (this.tableData.items.length != 0) {
                this.tableData.isLoading = false;
                return;
            }
            this.tableData.items = this.service.getFavorite();
        }, 800);
    },
    destroyed() {
        clearInterval(this.timmer);
    },
};
</script>

<style></style>
