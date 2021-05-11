import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home";

describe("Home.vue", () => {
    const component = shallowMount(Home);
    it("Should return new data when con function loadData", () => {
        let dataTest = {
            data: {
                Countries: [
                    {
                        Date: "2020-05-01T00:00:00Z8",
                        Confirmed: 4,
                        Deaths: 5,
                        Recovered: 6,
                    },
                    {
                        Date: "2020-05-02T00:00:00Z",
                        Confirmed: 1,
                        Deaths: 2,
                        Recovered: 3,
                    },
                ]
            }
        };
        component.vm.tableData.items = [];
        let promiseFunction = Promise.resolve();
        promiseFunction.then = (callback) => {
            callback(dataTest);
            return promiseFunction;
        };
        promiseFunction.finally = function ( callback ) {
            callback();
        }
        component.vm.service = {
            getInfo: () => {
                return promiseFunction;
            },
            mapDataWithStorage: (data) => {
                return data
            }
        }
        component.vm.loadData();
        expect(component.vm.tableData.items).to.be.eql(dataTest.data.Countries);
    });
});
