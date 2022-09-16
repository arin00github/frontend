import React from "react";
import { renderWithProviders } from "../util/reduxTestUtil";
import { AuthDisplay } from "../components/AuthDisplay";
import { setupStore } from "../redux/store";
import { getLogin } from "../redux/auth";

test("Display preloaded state to render", () => {
  const initialState = { isLogin: false, state: "close" };

  const {} = renderWithProviders(<AuthDisplay />, {
    preloadedState: {
      auth: initialState,
    },
  });
});

test("Sets up initial state with actions", () => {
  const store = setupStore();
  store.dispatch(getLogin(true));
  const { getByText } = renderWithProviders(<AuthDisplay />, { store });
});
