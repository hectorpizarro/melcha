import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { mount } from "enzyme";
import renderer from "react-test-renderer";

import theme from "../../shared/theme";
import List from "./List";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store = null; // es global para usar dentro de CompWithProviders

const CompWithProviders = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <List />
    </ThemeProvider>
  </Provider>
);

describe("<List />", () => {
  it("Renders without crashing", () => {
    store = mockStore({
      root: {
        firstLoaded: false,
        searchTerm: "",
        list: null,
        loading: true,
      },
    });
    const wrapper = mount(<CompWithProviders />);
    expect(wrapper.text()).toEqual("");
  });
  it("Check snapshot", () => {
    store = mockStore({
      root: {
        firstLoaded: false,
        searchTerm: "",
        list: null,
        loading: true,
      },
    });
    const tree = renderer.create(<CompWithProviders />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Renders with no list data", () => {
    store = mockStore({
      root: {
        firstLoaded: false,
        searchTerm: "",
        list: null,
        loading: false,
      },
    });
    const wrapper = mount(<CompWithProviders />);
    expect(wrapper.text()).toEqual("No hay resultados en su búsqueda.");
  });
  it("Check snapshot with no list data", () => {
    store = mockStore({
      root: {
        firstLoaded: false,
        searchTerm: "",
        list: null,
        loading: false,
      },
    });
    const tree = renderer.create(<CompWithProviders />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders with list data", () => {
    store = mockStore({
      root: {
        firstLoaded: false,
        searchTerm: "",
        list: {
          data: {
            items: [
              {
                id: 1,
                picture: "src",
                price: { currency: "ARS", amount: 1122 },
                free_shipping: true,
                title: "mock-title",
                city: "BA",
              },
            ],
            categories: ["aa", "bb", "cc"],
          },
        },
        loading: false,
      },
    });
    const wrapper = mount(<CompWithProviders />);
    expect(wrapper.text()).toEqual("cc > bb > aaARS1.122mock-titleBA");
  });

  it("Check snapshot with list data", () => {
    store = mockStore({
      root: {
        firstLoaded: false,
        searchTerm: "",
        list: {
          data: {
            items: [
              {
                id: 1,
                picture: "src",
                price: { currency: "ARS", amount: 1122 },
                free_shipping: true,
                title: "mock-title",
                city: "BA",
              },
            ],
            categories: ["aa", "bb", "cc"],
          },
        },
        loading: false,
      },
    });
    const tree = renderer.create(<CompWithProviders />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
