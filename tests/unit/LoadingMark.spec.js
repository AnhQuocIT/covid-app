import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import LoadingMark from "@/components/LoadingMark";

describe("LoadingMark.vue", () => {
    let component = shallowMount(LoadingMark, {
        propsData: {
            value: true,
        },
    });
    it("Should props data successfully", () => {
        expect(component.props().value).to.be.true;
    });
});
