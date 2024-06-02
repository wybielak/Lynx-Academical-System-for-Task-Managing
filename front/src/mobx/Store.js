import { createContext, useContext } from "react";

import AppStorage from "./AppStorage";
import UploadStorage from "./UploadStorage";

// obiekt typu Store z inicjalizacją AppStorage
export const Store = {
	appStorage: new AppStorage(),
	uploadStorage: new UploadStorage(),
};

// kontekst dla magazynu danych
export const StoreContext = createContext(Store);

// funkcja useStore zwracająca hook useContext
export function useStore() {
	return useContext(StoreContext);
}
