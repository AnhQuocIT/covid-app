import Vue from "vue";
import { expect } from "chai";
import Headers from "@/components/Header";

describe("BarChart.vue", () => {
    const header = {
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
    };
    const menu = {
        title: "Test menu title",
        items: [
            { title: "Country List", icon: "mdi-view-dashboard", to: "/" },
            { title: "Favorite", icon: "mdi-star-box", to: "/favorite" },
        ],
        right: null,
    };
    const Constructor = Vue.extend(Headers);
    const component = new Constructor({ propsData: [header, menu] }).$mount();
    it("Should change value of isShowAboutDialog to TRUE when call onOpenDialog", () => {
        component.isShowAboutDialog = false;
        component.onOpenDialog();
        expect(component.isShowAboutDialog).to.be.true;
    });
    it("Should change value of isShowAboutDialog to FALSE when call onCloseDialog", () => {
        component.isShowAboutDialog = true;
        component.onCloseDialog();
        expect(component.isShowAboutDialog).to.be.false;
    });
    it("Should register emit event 'toogle' sucessfully", () => {
        component.onToogleMenu();
        console.log("TODO");
        // expect(component.toogle).to.be.not.equal(0); $options
    });
});
