import { makeAutoObservable } from "mobx";

export default class AppStorage {

    constructor() {
        makeAutoObservable(this)
    }

}
