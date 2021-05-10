import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Menu from "@/components/Menu";

describe("Menu.vue", () => {
    const component = shallowMount(Menu, {
        propsData: {
            drawer: true,
            menu: {
                title: "Test menu title",
                items: [
                    { title: "Country List", icon: "mdi-view-dashboard", to: "/" },
                    { title: "Favorite", icon: "mdi-star-box", to: "/favorite" },
                ],
                right: null,
            }
        },
    });
    it("Should props data successfully", () => {
        const menu = {
            title: "Test menu title",
            items: [
                { title: "Country List", icon: "mdi-view-dashboard", to: "/" },
                { title: "Favorite", icon: "mdi-star-box", to: "/favorite" },
            ],
            right: null,
        };
        expect(component.props().menu).to.be.not.null;
        expect(component.props().menu).to.be.eql(menu);
        expect(component.props().drawer).to.be.not.null;
        expect(component.props().drawer).to.be.true;
    });
});
