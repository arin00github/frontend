import React, { PropsWithChildren, ReactElement } from "react";
import { RootState, AppStore, persistConfig } from "src/redux/store";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { PreloadedState } from "redux";
import { setupStore } from "../redux/store";
import { Provider } from "react-redux";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
