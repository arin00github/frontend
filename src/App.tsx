import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import AppRoutes from "./routes/index";
import { store, persistor } from "./redux/store";
import { ContextComponent } from "./context/context";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ContextComponent>
              <AppRoutes />
            </ContextComponent>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
