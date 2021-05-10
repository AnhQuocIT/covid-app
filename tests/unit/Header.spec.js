import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Headers from "@/components/Header";

describe("Header.vue", () => {
    const component = shallowMount(Headers, {
        propsData: {
            drawer: true,
            header: {
                title: "Test App",
                img: {
                    scr: "Test scr",
                    gradientStyle: "Test gradient",
                },
                icon: {
                    rightIcon: "mdi-shield-star",
                },
                color: {
                    mainColor: "#fcb69f",
                },
            }
        },
    });
    it("Should change value of isShowAboutDialog to TRUE when call onOpenDialog", () => {
        component.vm.isShowAboutDialog = false;
        component.vm.onOpenDialog();
        expect(component.vm.isShowAboutDialog).to.be.true;
    });
    it("Should change value of isShowAboutDialog to FALSE when call onCloseDialog", () => {
        component.vm.isShowAboutDialog = true;
        component.vm.onCloseDialog();
        expect(component.vm.isShowAboutDialog).to.be.false;
    });
    it("Should register emit event 'toogle' sucessfully", async () => {
        component.vm.onToogleMenu();
        await component.vm.$nextTick()
        expect(component.emitted('toogle').length).to.be.equal(1);
    });
});
