// unit tests
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import mockAxios from "axios";

import rootReducer, {
  setSearchTerm,
  setList,
  setFirstLoaded,
  setLoading,
  handleFirstLoad,
  submitSearch,
} from "./rootreducer";

const createError = require("http-errors");

const initialState = {
  firstLoaded: false, // flag para mostrar el loader global
  searchTerm: "", // search term usado en Search
  list: null, // listado de items
  loading: true, // flag para listado
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Redux root slice", () => {
  // Actions
  describe("Test actions", () => {
    it("setSearchTerm()", () => {
      const expectedAction = {
        type: "root/setSearchTerm",
        payload: { searchTerm: "abc" },
      };
      expect(setSearchTerm({ searchTerm: "abc" })).toEqual(expectedAction);
    });

    it("setList()", () => {
      const expectedAction = {
        type: "root/setList",
        payload: { list: [1] },
      };
      expect(setList({ list: [1] })).toEqual(expectedAction);
    });

    it("setFirstLoaded()", () => {
      const expectedAction = {
        type: "root/setFirstLoaded",
        payload: undefined,
      };
      expect(setFirstLoaded()).toEqual(expectedAction);
    });

    it("setLoading()", () => {
      const expectedAction = {
        type: "root/setLoading",
        payload: { loading: false },
      };
      expect(setLoading({ loading: false })).toEqual(expectedAction);
    });
  });

  // Reducers
  describe("Test reducers", () => {
    it("should return the initial state", () => {
      expect(rootReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle setSearchTerm()", () => {
      const initial = { ...initialState };
      const expected = { ...initialState, searchTerm: "abc" };
      expect(
        rootReducer(initial, setSearchTerm({ searchTerm: "abc" }))
      ).toEqual(expected);
    });

    it("should handle setList()", () => {
      const initial = { ...initialState };
      expect(rootReducer(initial, setList({ list: [1, 2, 3] }))).toEqual({
        ...initialState,
        loading: false,
        list: [1, 2, 3],
      });
    });

    it("should handle setFirstLoaded()", () => {
      const initial = { ...initialState };
      expect(rootReducer(initial, setFirstLoaded())).toEqual({
        ...initialState,
        firstLoaded: true,
      });
    });

    it("should handle setLoading()", () => {
      const initial = { ...initialState };
      expect(rootReducer(initial, setLoading({ loading: false }))).toEqual({
        ...initialState,
        loading: false,
      });
    });
  });

  describe("Test async action handleFirstLoad()", () => {
    it("firstLoaded flag TRUE, abort", () => {
      const store = mockStore({
        root: { ...initialState, firstLoaded: true },
      });
      // As function aborts no dispatch() are executed, actions is empty array
      return store.dispatch(handleFirstLoad({})).then(() => {
        expect(store.getActions()).toEqual([]);
      });
    });

    it("Requested unknown route", () => {
      const expectedActions = [
        { type: "root/setFirstLoaded", payload: undefined },
      ];
      const store = mockStore({
        root: { ...initialState },
      });
      const mockLocation = {
        search: "",
        pathname: "/foo",
      };

      return store.dispatch(handleFirstLoad(mockLocation)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("Requested route /items?search=SEARCH_TERM", () => {
      const expectedActions = [
        { type: "root/setSearchTerm", payload: { searchTerm: "aaa" } },
        { type: "root/setLoading", payload: { loading: true } },
        { type: "root/setLoading", payload: { loading: false } },
        { type: "root/setFirstLoaded", payload: undefined },
      ];
      const store = mockStore({
        root: { ...initialState },
      });
      const mockLocation = {
        search: "?search=aaa",
        pathname: "/items",
      };

      return store.dispatch(handleFirstLoad(mockLocation)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("Requested route /item/ID", () => {
      const expectedActions = [
        { type: "item/setLoading", payload: { loading: false } },
        { type: "root/setFirstLoaded", payload: undefined },
      ];
      const store = mockStore({
        root: { ...initialState },
      });
      const mockLocation = {
        pathname: "/items/abc123",
      };

      return store.dispatch(handleFirstLoad(mockLocation)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe("Test async action submitSearch()", () => {
    it("no search term", () => {
      const expectedActions = [
        { type: "root/setLoading", payload: { loading: true } },
        { type: "root/setLoading", payload: { loading: false } },
      ];
      const store = mockStore({
        root: { ...initialState },
      });

      return store.dispatch(submitSearch()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("search term defined, API response error", () => {
      mockAxios.get.mockResolvedValueOnce({
        data: { message: "ERROR" },
      });
      const expectedActions = [
        { type: "root/setLoading", payload: { loading: true } },
        { type: "root/setLoading", payload: { loading: false } },
      ];
      const store = mockStore({
        root: { ...initialState, searchTerm: "zzz" },
      });

      return store.dispatch(submitSearch()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("search term defined, API response valid", () => {
      mockAxios.get.mockResolvedValueOnce({
        data: [1, 2, 3],
      });
      const expectedActions = [
        { type: "root/setLoading", payload: { loading: true } },
        { type: "root/setList", payload: { list: [1, 2, 3] } },
      ];
      const store = mockStore({
        root: { ...initialState, searchTerm: "zzz" },
      });

      return store.dispatch(submitSearch()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("search term defined, API network error", () => {
      mockAxios.get.mockRejectedValueOnce(createError(500, "Horrible Error!"));
      const expectedActions = [
        { type: "root/setLoading", payload: { loading: true } },
        { type: "root/setLoading", payload: { loading: false } },
      ];
      const store = mockStore({
        root: { ...initialState, searchTerm: "zzz" },
      });

      return store.dispatch(submitSearch()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
