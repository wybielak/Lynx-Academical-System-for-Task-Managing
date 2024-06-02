import { makeAutoObservable } from "mobx";
import axios from "axios";
import { getDocs, collection, query, where } from 'firebase/firestore'

import { db } from '../config/FirebaseConfig'

export default class UploadStorage {

    constructor(appStorage) {
        this.appStorage = appStorage; // żeby można było używać rzeczy z appStorage
        makeAutoObservable(this)
    }

    // ########################## .Net API URL ##########################
    apiHost = "https://localhost:7227"


    // ########################## TASKS ##########################
    tasksCollection = collection(db, 'tasks')
    courseTasks = []
    selectedTaskFull = ''

    setCourseTasks = (data) => {
        this.courseTasks = data
        console.log("zadania w kursie:", this.courseTasks)
    }

    getCourseTasks = async () => {
        try {
            const tasksQuery = query(this.tasksCollection, where("courseId", "==", this.appStorage.selectedCourseFull.id))
            const data = await getDocs(tasksQuery)
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) //NOTE - ważne, dopisanie ID
            this.setCourseTasks(filteredData)
        } catch (err) {
            console.log(err)
        }
    }

    // wybór zadania 
    setSelectedTaskFull = (taskId) => {
        this.courseTasks.map((task) => {
            if (task.id == taskId) {
                this.selectedTaskFull = task
                console.log("selectedTask:", this.selectedTaskFull)
                return
            }
        })
    }

    clearSelectedTaskFull = () => {
        console.log("czyszczę wybraność zadania")
        this.selectedTaskFull = null
    }

    handleSelectedTask = (taskId) => {
        this.setSelectedTaskFull(taskId)
    }


    // ########################## FILES ##########################
    files = ''
    setFiles = (data) => {
        this.files = data
    }

    onChangeFile = (e) => {

        console.log("Zmieniam plik")
        if (e.target.files && e.target.files.length > 0) {
            this.setFiles(e.target.files)
        }
        console.log(this.files)

    }

    // upload plików
    submitFiles = async () => {

        try {

            if (this.files.length == 0) { // jeśli nie ma żadnych plików
                throw new Error("Brak plików!")
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
                console.log("file:", i, ":", file)

                const formData = new FormData();
                formData.append("_IFormFile", file)

                console.log("Wysyłam plik do API") // wysyłamy pojedyńczo
                axios
                    .post(url, formData)
                    .then((response) => { // 2xx

                        console.log("response:", response)
                        numOfFilesUploaded++
                        // console.log("num:", numOfFilesUploaded)
                        // console.log("num:", this.files.length)

                        if (numOfFilesUploaded == this.files.length) { // jeśli wszystkie wysłane
                            alert("Przesłano pliki.")
                            console.log("Rrzesłano pliki")
                            console.log("Czyszcze zmienną")
                            this.files = ""
                            console.log("Czyszcze input")
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

