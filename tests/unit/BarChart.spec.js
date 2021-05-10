import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import BarChart from "@/components/Chart/BarChart";

describe("BarChart.vue", () => {
    const component = shallowMount(BarChart, {
        propsData: {
            data: {
                labels: ['January', 'February'],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [40, 20]
                    },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        },
    });
    it("Should props data successfully", () => {
        expect(component.props().data).to.be.not.null;
        expect(component.props().data.labels).to.be.eql(['January', 'February']);
        expect(component.props().options).to.be.not.null;
        expect(component.props().options.responsive).to.be.true;
    });
});
