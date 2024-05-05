import { makeAutoObservable } from "mobx";
import { signOut } from 'firebase/auth'

import { auth } from '../config/FirebaseConfig'

export default class AppStorage {

    constructor() {
        makeAutoObservable(this)
    }

    //



    //



    // logowanie

    logOut = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.log(err)
        }
    }



}
