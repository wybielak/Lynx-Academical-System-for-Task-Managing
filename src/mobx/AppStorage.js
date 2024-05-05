import { useRef } from 'react'
import { makeAutoObservable } from "mobx";

import { signOut } from 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc } from 'firebase/firestore'
import { getDocs, collection, query, where } from 'firebase/firestore'

import { db } from '../config/FirebaseConfig'
import { auth } from '../config/FirebaseConfig'

export default class AppStorage {

    constructor() {
        makeAutoObservable(this)
    }





    // pobieranie roli uzytkownikow z bazy

    rolesRef = collection(db, 'roles')

    getRoles = async () => {
        try {
            const roleQuery = query(this.rolesRef, where("userId", "==", auth?.currentUser?.uid))
            const data = await getDocs(roleQuery)
            const filteredData = data.docs.map((doc) => ({ ...doc.data() }))
            this.currentRole = filteredData[0].role
            console.log("rola:", filteredData[0].role)
        } catch (err) {
            console.log(err)
        }
    }

    allRoles = undefined
    currentRole = undefined




    // do tworzenia nowego uzytkownika

    newUserEmail = ''
    newUserPassword = ''

    onChangeNewUserEmail = (e) => {
        this.newUserEmail = e.target.value
    }

    onChangeNewUserPassword = (e) => {
        this.newUserPassword = e.target.value
    }

    signIn = async () => {
        try {
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then((createdUser) => {
                    addDoc(this.rolesRef, { userId: createdUser.user.uid, role: this.role.current?.value })
                })
        } catch (err) {
            console.error(err)
        }
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
        console.log("email:", this.email)
        console.log("password:", this.password)
        try {
            await signInWithEmailAndPassword(auth, this.email, this.password)
        } catch (err) {
            console.error(err)
        }
    }

    logOut = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.log(err)
        }
    }







}
