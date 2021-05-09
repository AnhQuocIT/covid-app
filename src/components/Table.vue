<template>
    <v-container>
        <v-data-table
            :headers="data.headers"
            :items="data.items"
            :items-per-page="10"
            class="elevation-1"
            item-key="name"
            :search="data.search"
            :loading="data.isLoading"
            loading-text="Please wait..."
            @click:row="showDetails($event.CountryCode)"
        >
            <template v-slot:top>
                <v-text-field
                    v-model="data.search"
                    label="Search"
                    class="mx-4"
                ></v-text-field>
            </template>
            <template v-slot:item.CountryCode="{ item }">
                <img
                    :src="
                        'https://www.countryflags.io/' +
                        item.CountryCode +
                        '/shiny/32.png'
                    "
                />
            </template>
            <template v-slot:item.Favorite="{ item }">
                <v-simple-checkbox
                    @click="addToFavorite(item)"
                    :ripple="false"
                    v-model="item.isFavorite"
                ></v-simple-checkbox>
            </template>
        </v-data-table>
        <DetailDialog :dialog="dialog" @close="onCloseDetailDialog" />
        <LoadingDialog :dialog="loadingDialog" />
    </v-container>
</template>

<script>
import LocalStorageService from "../service/localstorage-service";
import DetailDialog from "../views/dialog/Detail";
import CovidService from "../service/covid-info-service";
import LoadingDialog from "../components/LoadingDialog";
import CountryService from "../service/country-service";
import moment from "moment";
export default {
    props: ["data"],
    components: {
        DetailDialog,
        LoadingDialog,
    },
    data: () => ({
        localStorageService: LocalStorageService,
        countryService: CountryService,
        covidService: CovidService,
        loadingDialog: false,
        dialog: {
            isShowDialog: false,
            chart: {
                loaded: false,
                chartdata: {
                    labels: [],
                    datasets: [],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                },
            },
            countryData: {},
        },
    }),
    methods: {
        showDetails(countryID) {
            this.loadCoutryData(countryID);
            this.loadCoutryCovidInfo(countryID);
        },
        addToFavorite(item) {
            this.localStorageService.updateDataToStorage(item.CountryCode);
        },
        onCloseDetailDialog() {
            this.dialog.isShowDialog = false;
        },
        loadCoutryData(countryID) {
            return this.countryService.getCountryInfo(countryID).then((res) => {
                this.dialog.countryData = res.data;
            });
        },
        loadCoutryCovidInfo(countryCode) {
            this.dialog.chart.chartdata.labels = [];
            this.dialog.chart.chartdata.datasets = [];
            this.loadingDialog = true;
            return this.covidService
                .getCovidOfCountry(countryCode)
                .then((res) => {
                    this.prepareData(res.data);

                    this.dialog.chart.loaded = true;
                    this.loadingDialog = false;
                    this.dialog.isShowDialog = true;
                });
        },
        prepareData(data) {
            let arrayDate = [];
            let arrayConfirmed = [];
            let arrayDeath = [];
            let arrayRecovered = [];
            data.forEach(country => {
                var temp = moment(new Date(new Date().setDate(new Date().getDate() - 30)), "YYYYMMDD").format("YYYY/MM/DD");
                const date = moment(country.Date, "YYYYMMDD").format("YYYY/MM/DD");
                if (date >= temp) {
                    arrayDate.push(date);
                    arrayConfirmed.push(country.Confirmed);
                    arrayDeath.push(country.Deaths);
                    arrayRecovered.push(country.Recovered)
                }
            })
            this.dialog.chart.chartdata.labels = arrayDate;
            let confirmedCase = {
                label: "Confirmed",
                backgroundColor: "#2A49BD",
                data: arrayConfirmed,
            };
            let deathCase = {
                label: "Deaths",
                backgroundColor: "#D60D14",
                data: arrayDeath,
            };
            let recoveredCase = {
                label: "Recovered",
                backgroundColor: "#0DD61A",
                data: arrayRecovered,
            };
            this.dialog.chart.chartdata.datasets.push(confirmedCase, deathCase, recoveredCase);
        },
    },
};
</script>

<style></style>
