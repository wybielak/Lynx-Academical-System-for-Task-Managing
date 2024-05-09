import { makeAutoObservable } from "mobx";  // kolejnosc importow - najpierw standardowe
import { signOut } from 'firebase/auth'     // i zewnetrzne
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc } from 'firebase/firestore'
import { getDocs, collection, query, where } from 'firebase/firestore'

import { db } from '../config/FirebaseConfig'   // potem te "nasze"
import { auth } from '../config/FirebaseConfig'

export default class AppStorage {

    constructor() {
        makeAutoObservable(this)
    }



    // pobieranie roli uzytkownikow z bazy

    rolesCollection = collection(db, 'roles')
    currentRole = undefined

    getRoles = async () => {
        try {
            const roleQuery = query(this.rolesCollection, where("userId", "==", auth?.currentUser?.uid))
            const data = await getDocs(roleQuery)
            const filteredData = data.docs.map((doc) => ({ ...doc.data() }))
            this.setCurrentRole(filteredData[0].role) // i ustawienie swojej roli (możnaby rozdzielić)
        } catch (err) {
            console.log(err)
        }
    }

    setCurrentRole = (r) => { // żeby nie było WARRNINGÓW i ERRORÓW (w <React.StrictMode>) takie rzeczy jak set'owanie tych "stanów" musi być osobną funkcją albo być z dekoratorem @action
        this.currentRole = r
        console.log("setCurrentRole = ", this.currentRole)
    }



    // tworzenie nowego uzytkownika

    newUserEmail = ''
    newUserPassword = ''
    newUserRole = 'student' // #hardcoded

    setNewUserEmail = (v) => {
        this.newUserEmail = v
        // console.log("newUserEmail = ", this.newUserEmail)
    }

    setNewUserPassword = (v) => {
        this.newUserPassword = v
        // console.log("newUserPassword = ", this.newUserPassword)
    }

    setNewUserRole = (v) => {
        this.newUserRole = v
        // console.log("newUserRole = ", this.newUserRole)
    }

    signIn = async () => {
        console.log("probuje stworzyc uzytkownika: ", this.newUserEmail, this.newUserPassword, this.newUserRole)
        try {
            createUserWithEmailAndPassword(auth, this.newUserEmail, this.newUserPassword)
                .then((createdUser) => {
                    addDoc(this.rolesCollection, { userId: createdUser.user.uid, role: this.newUserRole })
                    console.log("utworzono nowego uzytkownika")
                })
        } catch (err) {
            console.error(err)
        }
        console.log("czyszcze inputy")
        this.setNewUserEmail('')
        this.setNewUserPassword('')
    }



    // do logowania sie

    email = ''
    password = ''

    onChangeEmail = (e) => {
        this.email = e.target.value
    }

    onChangePassword = (e) => {
        this.password = e.target.value
    }

    logIn = async () => {
        console.log("proba zalogowania za pomoca email: ", this.email, " password: ", this.password)
        try {
            await signInWithEmailAndPassword(auth, this.email, this.password)
            console.log("zalogowano")
        } catch (err) {
            console.error(err)
        }
    }

    logOut = async () => {
        try {
            await signOut(auth)
            console.log("nastapilo wylogowanie")
        } catch (err) {
            console.log(err)
        }
    }



    // pomocnicze / debug

    showRoles = async () => {
        const q = query(this.rolesCollection, where("role", "!=", " "))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    }





}
