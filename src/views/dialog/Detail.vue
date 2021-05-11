<template>
    <v-dialog
        v-model="dialog.isShowDialog"
        v-if="dialog.isShowDialog"
        transition="dialog-top-transition"
        max-width="80vw"
        @keydown.esc="onClose"
        @click:outside="onClose"
        loader-height="5"
    >
        <v-card>
            <v-toolbar class="dialog-title" color="primary" dark
                >View detail {{ dialog.countryData.name }}</v-toolbar
            >
            <v-row no-gutters>
                <v-col class="pa-2">
                    <v-card class="pa-2">
                        <v-row>
                            <v-col class="title"> Country Name: </v-col>
                            <v-col>
                                {{ dialog.countryData.name }}
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col class="pa-2">
                    <v-card class="pa-2">
                        <v-row>
                            <v-col class="title"> Flag: </v-col>
                            <v-col>
                                <v-img
                                    :src="dialog.countryData.flag"
                                    max-height="36"
                                    max-width="48"
                                />
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col class="pa-2">
                    <v-card class="pa-2">
                        <v-row>
                            <v-col class="title"> Population: </v-col>
                            <v-col>
                                {{
                                    dialog.countryData.population.toLocaleString()
                                }}
                                people
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col class="pa-2">
                    <v-card class="pa-2">
                        <v-row>
                            <v-col class="title"> Capital: </v-col>
                            <v-col> {{ dialog.countryData.capital }} </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="mb-2" no-gutters>
                <v-col class="pa-2">
                    <v-card class="pa-2">
                        <v-row>
                            <v-col class="title"> Region: </v-col>
                            <v-col> {{ dialog.countryData.region }} </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col class="pa-2">
                    <v-card class="pa-2">
                        <v-row>
                            <v-col class="title"> Sub Region: </v-col>
                            <v-col> {{ dialog.countryData.subregion }} </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row no-gutters>
                <v-col class="sub-title">COVID-19 Data Visualization in {{this.dialog.chart.numberRecords}} Days</v-col>
            </v-row>
            <v-divider></v-divider>
            <bar-chart
                v-if="dialog.chart.loaded"
                :styles="chartStyles"
                :data="dialog.chart.chartdata"
                :options="dialog.chart.options"
            ></bar-chart>
            <v-divider></v-divider>
            <v-card-actions class="justify-end">
                <v-btn text @click="onClose">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import BarChart from "../../components/Chart/BarChart";

export default {
    props: ["dialog"],
    components: {
        BarChart,
    },
    data: () => ({
        chart: {
            style: {
                height: 300,
            },
        },
    }),
    computed: {
        chartStyles() {
            return {
                height: `${this.chart.style.height}px`,
                position: "relative",
            };
        },
    },
    mounted() {},
    methods: {
        onClose() {
            this.$emit("close");
        },
    },
};
</script>

<style scoped>
.v-dialog {
    overflow: hidden !important;
}

.v-dialog .dialog-title {
    font-weight: bold;
    font-size: 22px;
}

.v-dialog .row {
    height: 60px;
    align-items: center;
}


.v-dialog .title {
    font-weight: bold;
}

.sub-title {
    font-weight: bold;
    text-align: center;
    font-size: 22px;
}

@media (max-width: 600px) {
    .v-dialog .row {
        height: 120px;
    }

    .v-dialog .title {
        font-weight: initial;
        font-size: 16px !important;
    }
}
</style>
