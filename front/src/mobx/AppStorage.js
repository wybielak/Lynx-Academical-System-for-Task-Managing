import { makeAutoObservable } from "mobx";  // kolejnosc importow - najpierw standardowe
import axios from 'axios';                  // i zewnetrzne
import { setPersistence, signOut } from 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, doc, setDoc, updateDoc } from 'firebase/firestore'
import { getDocs, collection, query, where } from 'firebase/firestore'

import { db } from '../config/FirebaseConfig'   // potem te "nasze"
import { auth } from '../config/FirebaseConfig'

export default class AppStorage {

    constructor() {
        makeAutoObservable(this)
    }

    // ########################## .Net API URL ##########################
    apiHost = "https://localhost:7227"


    // ########################## ROLE ##########################

    rolesCollection = collection(db, 'roles')
    currentRole = ''

    // pobieranie roli uzytkownikow z bazy
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

    setCurrentRole = (role) => { // żeby nie było WARRNINGÓW i ERRORÓW (w <React.StrictMode>) takie rzeczy jak set'owanie tych "stanów" musi być osobną funkcją albo być z dekoratorem @action
        this.currentRole = role
        console.log("currentRole:", this.currentRole)
    }


    // ########################## USER #######################

    email = ''
    password = ''
    newUserRole = 'student' // #hardcoded
    newUserEmail = ''
    newUserPassword = ''

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

    // tworzenie nowego uzytkownika
    signIn = async () => {
        console.log("Próbuje stworzyć użytkownika: ", this.newUserEmail, this.newUserPassword, this.newUserRole)
        try {
            createUserWithEmailAndPassword(auth, this.newUserEmail, this.newUserPassword)
                .then((createdUser) => {
                    addDoc(this.rolesCollection, { userId: createdUser.user.uid, role: this.newUserRole })
                    console.log("Utworzono nowego użytkownika")
                })
        } catch (err) {
            console.error(err)
        }
        console.log("Czyszcze inputy")
        this.setNewUserEmail('')
        this.setNewUserPassword('')
    }

    onChangeEmail = (e) => {
        this.email = e.target.value
    }

    onChangePassword = (e) => {
        this.password = e.target.value
    }

    // logowanie sie
    logIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, this.email, this.password)
            console.log("Zalogowano")
        } catch (err) {
            console.error(err)
        }
    }

    logOut = async () => {
        try {
            await signOut(auth)
            console.log("Nastąpiło wylogowanie")
        } catch (err) {
            console.log(err)
        }
    }


    // ########################## KURSY ##########################

    coursesCollection = collection(db, 'courses')
    myCourses = [] // #TODO trzeba to jakoś lepiej ogarnąć/ujednolicić 
    coursesListWithoutStudent = [] // #w
    coursesListWithWaitingStudent = [] // #w
    newCourseName = ''

    setNewCourseName = (name) => {
        this.newCourseName = name
    }

    // tworzenie nowego kursu
    createNewCourse = async () => {

        const docRef = await addDoc(collection(db, "courses"), { // #TODO refractor
            courseName: this.newCourseName,
            ownerId: auth.currentUser.uid,
            ownerName: auth.currentUser.email,
            studentsIds: [],
            waitingStudentsIds: [],
        }).then((res) => {
            console.log("Utworzono nowy kurs z id: ", res.id);
            alert("Utworzono kurs")
            console.log("Czyszcze zmienną")
            this.setNewCourseName('')
            this.getMyCourses() // ANCHOR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // console.log("czyszcze input")
            // document.getElementById("filesUpload").value = ""
        })
    }

    setMyCourses = (coursesData) => {
        this.myCourses = coursesData
        console.log("Ustawiono zmienną myCourses")
    }

    clearMyCourses = () => {
        this.myCourses = []
        console.log("Czyszcze kursy")
    }

    // wylistowanie swoich kursów - nauczyciel
    getMyCourses = async () => {
        console.log("Pobieram moje kursy")
        try {
            var tmp = [] // może się przydać do czyszczenia stanu (jakby się coś zaczęło kiepścić)
            const courseQuery = query(this.coursesCollection, where("ownerId", "==", auth?.currentUser?.uid))
            const data = await getDocs(courseQuery)
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            this.setMyCourses(filteredData)
            this.showMapVariableIDsPlus(this.myCourses)
        } catch (err) {
            console.log(err)
        }
    }

    setCoursesListWithoutStudent = (coursesData) => {
        this.coursesListWithoutStudent = coursesData
        console.log("Ustawiono zmienną setCoursesListWithoutStudent")
    }

    // pobieranie kursów z możliwością dołączenia - student
    getCoursesListWithoutStudent = async (studentid) => {
        try {
            const data = await getDocs(this.coursesCollection)
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

            var filteredData2 = []

            for (var i = 0; i < filteredData.length; i++) {

                if (filteredData[i].waitingStudentsIds && filteredData[i].studentsIds) {
                    if (!(filteredData[i].waitingStudentsIds.includes(studentid) || filteredData[i].studentsIds.includes(studentid))) {
                        filteredData2.push(filteredData[i])
                    }
                    continue
                }

                if (filteredData[i].waitingStudentsIds) {
                    if (!filteredData[i].waitingStudentsIds.includes(studentid)) {
                        filteredData2.push(filteredData[i])
                        continue
                    }
                }

                if (filteredData[i].studentsIds) {
                    if (!filteredData[i].studentsIds.includes(studentid)) {
                        filteredData2.push(filteredData[i])
                        continue
                    }
                }
            }

            this.setCoursesListWithoutStudent(filteredData2)

        } catch (err) {
            console.error(err)
        }
    }

    // dołączanie do wybranego kursu - student
    addWaitingStudentToCourse = async (courseid, studentid) => {
        try {

            console.log(courseid)
            console.log(studentid)

            const ref = collection(db, 'courses')

            await getDocs(ref).then((data) => {
                const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

                var course = null

                for (var i = 0; i < filteredData.length; i++) {
                    if (courseid == filteredData[i].id) {
                        course = filteredData[i]
                        break
                    }
                }

                console.log(course)

                var oldWaiting = course.waitingStudentsIds

                if (!oldWaiting) oldWaiting = []

                updateDoc(doc(db, "courses", course.id), {
                    waitingStudentsIds: [...oldWaiting, studentid]
                }).then(() => {
                    console.log('Dodano id studenta do kursu')

                    this.getCoursesListWithoutStudent(studentid)
                    this.getCoursesListWithWaitingStudent(studentid)
                })
            })


        } catch (err) {
            console.error(err)
        }
    }

    setCoursesListWithWaitingStudent = (coursesData) => {
        this.coursesListWithWaitingStudent = coursesData
        console.log("Ustawiono zmienną coursesListWithWaitingStudent")
    }

    // pobieranie kursów w których jest oczekujący - student
    getCoursesListWithWaitingStudent = async (studentid) => {
        try {
            const data = await getDocs(this.coursesCollection)
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

            var filteredData2 = []

            for (var i = 0; i < filteredData.length; i++) {
                if (filteredData[i].waitingStudentsIds) {
                    if (filteredData[i].waitingStudentsIds.includes(studentid)) {
                        filteredData2.push(filteredData[i])
                        continue
                    }
                }
            }

            this.setCoursesListWithWaitingStudent(filteredData2)

        } catch (err) {
            console.error(err)
        }
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

    // ########################## DEBUG ##########################

    showRoles = async () => {
        const q = query(this.rolesCollection, where("role", "!=", " "))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    }

    showMapVariableIDsPlus = (variable) => {
        variable.map(x => (
            console.log("- ", x.id, x.courseName)
        ))
    }


}

