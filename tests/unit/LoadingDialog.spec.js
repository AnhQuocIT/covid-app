import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import LoadingDialog from "@/components/LoadingDialog";

describe("LoadingDialog.vue", () => {
    let component = shallowMount(LoadingDialog, {
        propsData: {
            dialog: true,
        },
    });
    it("Should props data successfully", () => {
        expect(component.props().dialog).to.be.true;
    });
});
