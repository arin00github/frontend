import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import AppRoutes from "./routes/index";
import { store, persistor } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ChakraProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
