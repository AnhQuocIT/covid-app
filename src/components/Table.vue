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
        service: {
            LocalStorageService,
            CountryService,
            CovidService
        },
        loadingDialog: false,
        dialog: {
            isShowDialog: false,
            chart: {
                numberRecords: 30,
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
            this.service.LocalStorageService.updateDataToStorage(item.CountryCode);
        },
        onCloseDetailDialog() {
            this.dialog.isShowDialog = false;
        },
        loadCoutryData(countryID) {
            return this.service.CountryService.getCountryInfo(countryID).then((res) => {
                this.dialog.countryData = res.data;
            });
        },
        loadCoutryCovidInfo(countryCode) {
            this.dialog.chart.chartdata.labels = [];
            this.dialog.chart.chartdata.datasets = [];
            this.loadingDialog = true;
            return this.service.CovidService
                .getCovidOfCountry(countryCode)
                .then((res) => {
                    this.prepareChartData(res.data);

                    this.dialog.chart.loaded = true;
                    this.loadingDialog = false;
                    this.dialog.isShowDialog = true;
                });
        },
        prepareChartData(data) {
            let arrayDate = [];
            let arrayConfirmed = [];
            let arrayDeath = [];
            let arrayRecovered = [];
            data.forEach(country => {
                if (this.isMobileView()) {
                    this.dialog.chart.numberRecords = 10;
                }
                const conditionDate = this.formartDate(new Date(new Date().setDate(new Date().getDate() - this.dialog.chart.numberRecords)));
                const date = this.formartDate(country.Date);
                if (date >= conditionDate) {
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
        formartDate(date) {
            return moment(date, "YYYYMMDD").format("YYYY/MM/DD");
        },
        isMobileView(){
            let check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        }
    },
};
</script>

<style></style>
