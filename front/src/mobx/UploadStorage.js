import { makeAutoObservable } from "mobx";
import axios from "axios";

export default class UploadStorage {

    constructor() {
        makeAutoObservable(this)
    }

    // ########################## .Net API URL ##########################
    apiHost = "https://localhost:7227"


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
    submitFiles = async (subject_name, student_name, task_name) => {

        console.log(subject_name.replace(/ /g, "_"))
        console.log(student_name.split("@")[0].replace(/ /g, "_"))
        console.log(task_name.replace(/ /g, "_"))

        // try {

        //     if (this.files.length == 0) { // jeśli nie ma żadnych plików
        //         throw new Error("Brak plików!")
        //     }

        //     const url = new URL(this.apiHost)
        //     url.pathname = "/api/FileManager/uploadfile"
        //     // #hardcoded (for now)
        //     url.searchParams.append("_SubjectName", "Zielonka_Programowanie")
        //     url.searchParams.append("_StudentName", "Gesiek")
        //     url.searchParams.append("_TaskName", "Zad1")

        //     var numOfFilesUploaded = 0
        //     for (let i = 0; i < this.files.length; i++) {

        //         const file = this.files[i];
        //         console.log("file:", i, ":", file)

        //         const formData = new FormData();
        //         formData.append("_IFormFile", file)

        //         console.log("Wysyłam plik do API") // wysyłamy pojedyńczo
        //         axios
        //             .post(url, formData)
        //             .then((response) => { // 2xx

        //                 console.log("response:", response)
        //                 numOfFilesUploaded++
        //                 // console.log("num:", numOfFilesUploaded)
        //                 // console.log("num:", this.files.length)

        //                 if (numOfFilesUploaded == this.files.length) { // jeśli wszystkie wysłane
        //                     alert("Przesłano pliki.")
        //                     console.log("Rrzesłano pliki")
        //                     console.log("Czyszcze zmienną")
        //                     this.files = ""
        //                     console.log("Czyszcze input")
        //                     document.getElementById("filesUpload").value = ""
        //                 }

        //             })
        //             .catch(error => {
        //                 if (error.response) { // 4xx, 5xx itp.
        //                     console.log("request error: ", error.response);
        //                 }
        //                 else if (error.request) { // no response
        //                     console.log("no response error: ", error.request)
        //                 }
        //                 else {
        //                     console.log("other error: ", error.message)
        //                 }
        //                 alert("Nie udało się przesłać pliku")
        //             })
        //     }
        // }
        // catch (err) {
        //     console.log("err: ", err)
        //     alert("Nie udało się przetworzyć i wysłać plików. ", err)
        // }

    }


}

