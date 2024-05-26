import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import { StoreContext, Store } from "./mobx/Store.js";

ReactDOM.createRoot(document.getElementById("root")).render(

    // zakomentowanie StrictMode'a "wyczyści" troche konsole ale trzeba być tego świadomym co to robi (przed czym chroni)
    <React.StrictMode>

        <StoreContext.Provider value={Store}>
            <App />
        </StoreContext.Provider>

    </React.StrictMode>

);
