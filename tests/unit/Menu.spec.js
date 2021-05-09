import Vue from "vue";
// import { expect } from "chai";
import Menu from "@/components/Menu";

describe("BarChart.vue", () => {
    const drawer = false;
    const menu = {
        title: "Test menu title",
        items: [
            { title: "Country List", icon: "mdi-view-dashboard", to: "/" },
            { title: "Favorite", icon: "mdi-star-box", to: "/favorite" },
        ],
        right: null,
    };
    const Constructor = Vue.extend(Menu);
    const component = new Constructor({ propsData: [menu,drawer] }).$mount();
    it("Should props data successfully", () => {
        console.log("quoc",component.menu);
        // expect(component.props.menu).to.be.eql(menu);
    });
    // it("Should change value of isShowAboutDialog to FALSE when call onCloseDialog", () => {
    //     component.isShowAboutDialog = true;
    //     component.onCloseDialog();
    //     expect(component.isShowAboutDialog).to.be.false;
    // });
    // it("Should register emit event 'toogle' sucessfully", () => {
    //     component.onToogleMenu();
    //     console.log("TODO", window);
    //     // expect(component.toogle).to.be.not.equal(0); $options
    // });
});
