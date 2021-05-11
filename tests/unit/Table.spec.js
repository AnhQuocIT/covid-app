import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Table from "@/components/Table";

describe("Table.vue", () => {
    let component = shallowMount(Table, {
        propsData: {
            data: true,
        },
    });
    it("Should props data successfully", () => {
        expect(component.props().data).to.be.true;
    });
    it("Should call another function when call showDetails()", () => {
        const backUploadCoutryData = component.vm.loadCoutryData;
        const backUploadCoutryCovidInfo = component.vm.loadCoutryCovidInfo;
        let isCallloadCoutryData = false;
        let loadCoutryDataData = '';
        component.vm.loadCoutryData = (id) => {
            isCallloadCoutryData = true;
            loadCoutryDataData = id;
        }
        let isCallloadCoutryCovidInfo = false;
        let loadCoutryCovidInfoData = '';
        component.vm.loadCoutryCovidInfo = (id) => {
            isCallloadCoutryCovidInfo = true;
            loadCoutryCovidInfoData = id;
        }
        component.vm.showDetails("VN");
        expect(component.props().data).to.be.true;
        expect(isCallloadCoutryData).to.be.true;
        expect(loadCoutryDataData).to.be.equal("VN");
        expect(isCallloadCoutryCovidInfo).to.be.true;
        expect(loadCoutryCovidInfoData).to.be.equal("VN");
        component.vm.loadCoutryData = backUploadCoutryData;
        component.vm.loadCoutryCovidInfo = backUploadCoutryCovidInfo;
    });
    it("Should call function of service when call addToFavorite()", () => {
        const backUp = component.vm.service;
        let isCallupdateDataToStorage = false;
        let dataID = null;
        component.vm.service = {
            LocalStorageService: {
                updateDataToStorage: function (id) {
                    isCallupdateDataToStorage = true;
                    dataID = id;
                }
            }
        }
        component.vm.addToFavorite({CountryCode: "VN"});
        expect(isCallupdateDataToStorage).to.be.true;
        expect(dataID).to.be.equal("VN");
        component.vm.service = backUp;
    });
    it("Should return new data 'FALSE' when call addToFavorite()", () => {
        component.vm.dialog = {
            isShowDialog: true,
        };
        component.vm.onCloseDetailDialog();
        expect(component.vm.dialog.isShowDialog).to.be.false;
    });

    it("Should return new data of dialog when call loadCoutryData", () => {
        const backUp = component.vm.service;
        component.vm.dialog = {
            countryData: null
        };
        let promiseFunction = Promise.resolve();
        let dataTest = {data: "Test Data"};
        promiseFunction.then = (callback) => {
            callback(dataTest);
            return promiseFunction;
        };
        promiseFunction.finally = function ( callback ) {
            callback();
        };
        component.vm.service = {
            CountryService: {
                getCountryInfo: () => {
                    return promiseFunction;
                }
            }
        }
        component.vm.loadCoutryData("VN");
        expect(component.vm.dialog.countryData).to.be.equal(dataTest.data);
        component.vm.service = backUp;
    });
    it("Should return new data of dialog when call loadCoutryCovidInfo", () => {
        const backUp = component.vm.prepareChartData;
        component.vm.dialog = {
            chart: {
                loaded: false,
                chartdata: {
                    labels: [1,2],
                    datasets: [3,4],
                }
            }
        };
        component.vm.loadingDialog = true;
        component.vm.dialog.isShowDialog = false;
        let promiseFunction = Promise.resolve();
        promiseFunction.then = (callback) => {
            let dataTest = {data: "Test Data"};
            callback(dataTest);
            return promiseFunction;
        };
        let resultData = null;
        component.vm.prepareChartData = (data) => {
            resultData = data;
        }
        promiseFunction.finally = function ( callback ) {
            callback();
        }
        component.vm.service = {
            CovidService: {
                getCovidOfCountry: () => {
                    return promiseFunction;
                }
            }
        }
        component.vm.loadCoutryCovidInfo("VN");
        expect(component.vm.dialog.chart.loaded).to.be.true;
        expect(component.vm.dialog.isShowDialog).to.be.true;
        expect(component.vm.dialog.chart.chartdata.labels).to.be.empty;
        expect(component.vm.dialog.chart.chartdata.datasets).to.be.empty;
        expect(resultData).to.be.equal("Test Data");
        component.vm.prepareChartData = backUp;
    });
    it("Should return new data when call prepareChartData() and qualified with the condition date #1", () => {
        component.vm.dialog.chart = {
            numberRecords: 5,
            chartdata: {
                labels: [],
                datasets: []
            }
        };
        let data = [
            {
                Date: "2021-05-09T00:00:00Z8",
                Confirmed: 1,
                Deaths: 2,
                Recovered: 3,
            },
            {
                Date: "2021-05-10T00:00:00Z8",
                Confirmed: 4,
                Deaths: 5,
                Recovered: 6,
            }
        ];
        const expectedResult = {
            labels: ["2021/05/09", "2021/05/10"],
            data: [
                {
                    label: "Confirmed",
                    backgroundColor: "#2A49BD",
                    data: [1,4]
                },
                {
                    label: "Deaths",
                    backgroundColor: "#D60D14",
                    data: [2,5],
                },
                {
                    label: "Recovered",
                    backgroundColor: "#0DD61A",
                    data: [3,6],
                }
            ]
        };
        component.vm.isMobileView = () => {
            return false;
        };
        component.vm.prepareChartData(data);
        expect(component.vm.dialog.chart.numberRecords).to.be.eql(5);
        expect(component.vm.dialog.chart.chartdata.labels).to.be.eql(expectedResult.labels);
        expect(component.vm.dialog.chart.chartdata.datasets).to.be.eql(expectedResult.data);
    });
    it("Should return new data when call prepareChartData() and when have some case not qualified with the condition date #2", () => {
        component.vm.dialog.chart = {
            numberRecords: 5,
            chartdata: {
                labels: [],
                datasets: []
            }
        };
        let data = [
            {
                Date: "2021-05-01T00:00:00Z8",
                Confirmed: 1,
                Deaths: 2,
                Recovered: 3,
            },
            {
                Date: "2021-05-10T00:00:00Z8",
                Confirmed: 4,
                Deaths: 5,
                Recovered: 6,
            }
        ];
        const expectedResult = {
            labels: ["2021/05/10"],
            data: [
                {
                    label: "Confirmed",
                    backgroundColor: "#2A49BD",
                    data: [4]
                },
                {
                    label: "Deaths",
                    backgroundColor: "#D60D14",
                    data: [5],
                },
                {
                    label: "Recovered",
                    backgroundColor: "#0DD61A",
                    data: [6],
                }
            ]
        };
        component.vm.isMobileView = () => {
            return false;
        };
        component.vm.prepareChartData(data);
        expect(component.vm.dialog.chart.numberRecords).to.be.eql(5);
        expect(component.vm.dialog.chart.chartdata.labels).to.be.eql(expectedResult.labels);
        expect(component.vm.dialog.chart.chartdata.datasets).to.be.eql(expectedResult.data);
    });
    it("Should return new data when call prepareChartData() and when have all case not qualified with the condition date #3", () => {
        component.vm.dialog.chart = {
            numberRecords: 5,
            chartdata: {
                labels: [],
                datasets: []
            }
        };
        let data = [
            {
                Date: "2021-05-01T00:00:00Z8",
                Confirmed: 1,
                Deaths: 2,
                Recovered: 3,
            },
            {
                Date: "2021-04-10T00:00:00Z8",
                Confirmed: 4,
                Deaths: 5,
                Recovered: 6,
            }
        ];
        const expectedResult = {
            labels: [],
            data: [
                {
                    label: "Confirmed",
                    backgroundColor: "#2A49BD",
                    data: []
                },
                {
                    label: "Deaths",
                    backgroundColor: "#D60D14",
                    data: [],
                },
                {
                    label: "Recovered",
                    backgroundColor: "#0DD61A",
                    data: [],
                }
            ]
        };
        component.vm.isMobileView = () => {
            return false;
        };
        component.vm.prepareChartData(data);
        expect(component.vm.dialog.chart.numberRecords).to.be.eql(5);
        expect(component.vm.dialog.chart.chartdata.labels).to.be.eql(expectedResult.labels);
        expect(component.vm.dialog.chart.chartdata.datasets).to.be.eql(expectedResult.data);
    });
    it("Should return number record is 10 when call prepareChartData() and under mobile view", () => {
        component.vm.dialog.chart = {
            numberRecords: 5,
            chartdata: {
                labels: [],
                datasets: []
            }
        };
        let data = [
            {
                Date: "2021-05-09T00:00:00Z8",
                Confirmed: 1,
                Deaths: 2,
                Recovered: 3,
            },
            {
                Date: "2021-05-10T00:00:00Z8",
                Confirmed: 4,
                Deaths: 5,
                Recovered: 6,
            }
        ];
        const expectedResult = {
            labels: ["2021/05/09", "2021/05/10"],
            data: [
                {
                    label: "Confirmed",
                    backgroundColor: "#2A49BD",
                    data: [1,4]
                },
                {
                    label: "Deaths",
                    backgroundColor: "#D60D14",
                    data: [2,5],
                },
                {
                    label: "Recovered",
                    backgroundColor: "#0DD61A",
                    data: [3,6],
                }
            ]
        };
        component.vm.isMobileView = () => {
            return true;
        };
        component.vm.prepareChartData(data);
        expect(component.vm.dialog.chart.numberRecords).to.be.eql(10);
        expect(component.vm.dialog.chart.chartdata.labels).to.be.eql(expectedResult.labels);
        expect(component.vm.dialog.chart.chartdata.datasets).to.be.eql(expectedResult.data);
    });
});
