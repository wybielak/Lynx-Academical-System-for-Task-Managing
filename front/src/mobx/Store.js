import { createContext, useContext } from "react";

import AppStorage from "./AppStorage";
import UploadStorage from "./UploadStorage";

// obiekt typu Store z inicjalizacją magazynów
const appStorage = new AppStorage();
const uploadStorage = new UploadStorage(appStorage); // uploadStore tworzony z odnośnikiem do appStorage
export const Store = {
	appStorage,
	uploadStorage
};

// kontekst dla magazynu danych
export const StoreContext = createContext(Store);

// funkcja useStore zwracająca hook useContext
export function useStore() {
	return useContext(StoreContext);
}
