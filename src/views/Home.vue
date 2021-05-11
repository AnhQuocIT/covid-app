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
        this.loadData();
    },
    methods: {
        loadData() {
            this.tableData.isLoading = true;
            return this.service.getInfo().then((res) => {
                if (res.data.Countries) {
                    this.tableData.isLoading = false;
                    this.tableData.items = this.service.mapDataWithStorage(res.data.Countries);
                }
            });
        },
    },
};
</script>
