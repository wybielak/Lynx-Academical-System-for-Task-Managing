import { makeAutoObservable } from "mobx";  // kolejnosc importow - najpierw standardowe
import axios from 'axios';                  // i zewnetrzne
import { signOut } from 'firebase/auth'
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

    // api url

    apiHost = "https://localhost:7227"

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




    // upload plików

    files = ""
    isFile = false

    onChangeFile = (e) => {

        console.log("zmieniam plik")

        if (e.target.files && e.target.files.length > 0) {
            this.files = e.target.files
            this.isFile = true
        }
        else {
            this.isFile = false
        }
        console.log(this.files)

    }

    handleSubmitFilesButton = async () => {

        try {

            if (this.files.length == 0) { // jeśli nie ma żadnych plików
                throw new Error("No files included!")
            }

            const url = new URL(this.apiHost)
            url.pathname = "/api/FileManager/uploadfile"
            // #hardcoded (for now)
            url.searchParams.append("_SubjectName", "Zielonka_Programowanie")
            url.searchParams.append("_StudentName", "Gesiek")
            url.searchParams.append("_TaskName", "Zad1")

            var numOfFilesUploaded = 0
            for (let i = 0; i < this.files.length; i++) {

                const file = this.files[i];
                console.log("file ", i, " ", file)

                const formData = new FormData();
                formData.append("_IFormFile", file)

                console.log("wysyłam plik do API") // wysyłamy pojedyńczo
                axios
                    .post(url, formData)
                    .then((response) => { // 2xx

                        console.log("response:", response)
                        numOfFilesUploaded++
                        // console.log("num:", numOfFilesUploaded)
                        // console.log("num:", this.files.length)

                        if (numOfFilesUploaded == this.files.length) { // jeśli wszystkie wysłane
                            alert("Przesłano pliki.")
                            console.log("przesłano pliki")
                            console.log("czyszcze zmienną")
                            this.files = ""
                            console.log("czyszcze input")
                            document.getElementById("filesUpload").value = ""
                        }

                    })
                    .catch(error => {
                        if (error.response) { // 4xx, 5xx itp.
                            console.log("request error: ", error.response);
                        }
                        else if (error.request) { // no response
                            console.log("no response error: ", error.request)
                        }
                        else {
                            console.log("other error: ", error.message)
                        }
                        alert("Nie udało się przesłać pliku")
                    })
            }

        }
        catch (err) {

            console.log("err: ", err)
            alert("Nie udało się przetworzyć i wysłać plików. ", err)

        }

    }




}
