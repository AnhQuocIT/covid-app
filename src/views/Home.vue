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
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            return this.service.getInfo().then((res) => {
                if (res.data.Countries) {
                    this.tableData.items = res.data.Countries;
                }
            });
        },
    },
};
</script>
