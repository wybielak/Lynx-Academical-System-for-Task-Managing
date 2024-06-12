import { makeAutoObservable } from "mobx";  // kolejnosc importow - najpierw standardowe
import { signOut } from 'firebase/auth'     // i zewnetrzne
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, doc } from 'firebase/firestore'
import { getDocs, getDoc, collection, query, where } from 'firebase/firestore'
import { updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

import { db } from '../config/FirebaseConfig'   // potem te "nasze"
import { auth } from '../config/FirebaseConfig'

export default class AppStorage {

    constructor() {
        makeAutoObservable(this)
    }

    // ########################## ROLE ##########################

    rolesCollection = collection(db, 'roles')
    currentRole = ''

    setCurrentRole = (role) => { // żeby nie było WARRNINGÓW i ERRORÓW (w <React.StrictMode>) takie rzeczy jak set'owanie tych "stanów" musi być osobną funkcją albo być z dekoratorem @action
        this.currentRole = role
        console.log("currentRole:", this.currentRole)
    }

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

    getNameById = async (id) => {
        try {
            const roleQuery = query(this.rolesCollection, where("userId", "==", id))
            const data = await getDocs(roleQuery)
            const filteredData = data.docs.map((doc) => ({ ...doc.data() }))
            return filteredData[0].name
        } catch (err) {
            console.log(err)
        }
    }


    // ########################## USER #######################

    email = ''
    password = ''
    newUserRole = 'student' // #hardcoded
    newUserEmail = ''
    newUserPassword = ''
    myStudentsWithData = []

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
                    addDoc(this.rolesCollection, { userId: createdUser.user.uid, name: createdUser.user.email, role: this.newUserRole })
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

    // ustawienie moich studentów z kursu (id, nazwa, ...) - nauczyciel
    setMyStudentsWithData = (data) => {
        this.myStudentsWithData = data
        // console.log("myStudentsWithData:")
        // this.showMapVariableIDsPlus(this.myStudentsWithData)
    }

    // getStudentById = (id) => {
    //     this.myStudentsWithData.map((student) => {
    //         // console.log(student.userId, "=?=", id, student.userId == id)
    //         if (student.userId == id) {
    //             console.log("returning", student.name)
    //             return student.name
    //         }
    //     })
    // }


    // ########################## KURSY ##########################

    coursesCollection = collection(db, 'courses')
    tasksCollection = collection(db, 'tasks') // yo #w, #NOTE jo mom to już w UploadStorage.js!
    myCourses = [] // #TODO możnaby ujednolicić 

    coursesListWithoutStudent = [] // #w
    coursesListWithWaitingStudent = [] // #w
    coursesListWithStudent = [] // #w
    tasksListCourse = [] // #w

    newCourseName = ''
    selectedCourseFull = ''

    currentCourseId = '' // #w
    currentCourseData = '' // #w

    currentTaskId = '' // #w
    currentTaskData = '' // #w

    setNewCourseName = (name) => {
        this.newCourseName = name
    }

    // tworzenie nowego kursu
    createNewCourse = async () => {

        const docRef = await addDoc(collection(db, "courses"), { // #TODO refractor
            courseName: this.newCourseName,
            ownerId: auth.currentUser.uid,
            // ownerName: auth.currentUser.email,
            studentsIds: [],
            waitingStudentsIds: [],
        }).then((res) => {
            console.log("Utworzono nowy kurs z id: ", res.id);
            alert("Utworzono kurs")
            console.log("Czyszcze zmienną")
            this.setNewCourseName('')
            this.getMyCourses() // ANCHOR !
            // console.log("czyszcze input")
            // document.getElementById("filesUpload").value = ""
        })
    }

    setMyCourses = (data) => {
        this.myCourses = data
        // console.log("myCourses:")
        // this.showMapVariableIDsPlus(this.myCourses)
    }

    // wylistowanie swoich kursów - nauczyciel
    getMyCourses = async () => {
        console.log("Pobieram moje kursy")
        try {
            var tmp = [] // może się przydać do czyszczenia stanu (jakby się coś zaczęło kiepścić)
            const courseQuery = query(this.coursesCollection, where("ownerId", "==", auth?.currentUser?.uid))
            const data = await getDocs(courseQuery)
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) //NOTE - ważne, dopisanie ID

            this.setMyCourses(filteredData)

        } catch (err) {
            console.log(err)
        }
    }

    // student
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

    // student
    setCoursesListWithStudent = (coursesData) => {
        this.coursesListWithStudent = coursesData
        console.log("Ustawiono zmienną setCoursesListWithStudent")
    }

    // pobieranie kursów w których jest - student
    getCoursesListWithStudent = async (studentid) => {
        try {
            const data = await getDocs(this.coursesCollection)
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

            var filteredData2 = []

            for (var i = 0; i < filteredData.length; i++) {
                if (filteredData[i].studentsIds) {
                    if (filteredData[i].studentsIds.includes(studentid)) {
                        filteredData2.push(filteredData[i])
                        continue
                    }
                }
            }

            this.setCoursesListWithStudent(filteredData2)

        } catch (err) {
            console.error(err)
        }
    }

    // getCurrentCourseData = (id) => {  // TODO
    //     // this.clearSelectedCourse()
    //     this.coursesListWithStudent.map((course) => {
    //         if (course.id == id) {
    //             //this.selectedCourseFull = course
    //             console.log(course.courseName)
    //         }
    //     })
    //     //console.log("selectedCourse:", this.selectedCourseFull)
    // }

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
            console.log(filteredData2)

        } catch (err) {
            console.error(err)
        }
    }

    // wybór kursu 
    setSelectedCourseFull = (data) => {
        // this.clearSelectedCourse()
        this.selectedCourseFull = data
        console.log("selectedCourseFull:", this.selectedCourseFull)
    }

    clearSelectedCourseFull = () => { //NOTE - do poprawienia/sprawdzenia czy działa przy przełączaniu między stronami
        this.selectedCourseFull = ''
        console.log("czyszczę selectedCourseFull")
    }

    handleSelectCourse = (courseId) => {
        // this.clearSelectedCourse()
        this.myCourses.map((course) => {
            if (course.id == courseId) {
                this.setSelectedCourseFull(course)
            }
        })
        console.log("selectedCourseFull:", this.selectedCourseFull)
    }

    addStudentToCourse = async (course, studentId) => {

        console.log("dodaję..", course.id, studentId)
        const courseRef = doc(db, "courses", course.id)

        await updateDoc(courseRef, {
            studentsIds: arrayUnion(studentId),
            waitingStudentsIds: arrayRemove(studentId)
        })
            .then(async () => {
                // dla odświeżenia
                await this.getMyCourses()
            })
            .then(() => {
                alert("Dodano")
                return this.setSelectedCourseFull(course.id)
            })
    }

    // // pobranie danych od studentach (id, nazwa, ...), który należą (lub chcą należeć) do wybranego kursu - nauczyciel
    // loadAllStudentsDataInCourse = async () => {
    //     try {
    //         const allIds = this.selectedCourseFull.studentsIds.concat(this.selectedCourseFull.waitingStudentsIds)
    //         // console.log("allIds:", allIds)

    //         if (allIds.length > 0) {

    //             var students = []
    //             const studentsWithData = query(this.rolesCollection, where("userId", "in", allIds));
    //             const querySnapshot = await getDocs(studentsWithData)

    //             querySnapshot.forEach((doc) => {
    //                 // console.log("student:", doc.id, ' ', doc.data())
    //                 students.push(doc.data()) // role: , name: , userId: 
    //             })

    //             this.setMyStudentsWithData(students)

    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // Wyświetlanie szczegółów kursu - student #ANCHOR

    setCurrentCourseId = (id) => {
        this.currentCourseId = id
        console.log('Ustawiono currentCourseId')
    }

    getCurrentCourseData = async () => {  // TODO
        console.log("Pobieram szczegoly kursu studenta")
        try {
            if (this.currentCourseId !== '') {
                const courseRef = doc(this.coursesCollection, this.currentCourseId)
                const data = await getDoc(courseRef)
                this.currentCourseData = { ...data.data(), id: data.id };
            }
        } catch (err) {
            console.log(err)
        }
    }

    setStudentTasks = (data) => {
        this.tasksListCourse = data
        console.log("Ustawiono zmienną coursesListWithWaitingStudent")
    }

    getStudentTasks = async (id) => {
        console.log("Pobieram zadania studenta")
        try {
            const data = await getDocs(this.tasksCollection)
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

            var filteredData2 = []

            for (var i = 0; i < filteredData.length; i++) {
                if (filteredData[i].courseId == id) {
                    filteredData2.push(filteredData[i])
                    continue
                }
            }

            this.setStudentTasks(filteredData2)

        } catch (err) {
            console.log(err)
        }
    }

    setCurrentTaskId = (id) => {
        this.currentTaskId = id
        console.log('Ustawiono currentTaskId')
    }

    getCurrentTaskData = async () => {  // TODO
        console.log("Pobieram szczegoly zadania studenta")
        try {
            if (this.currentCourseId !== '') {
                const taskRef = doc(this.tasksCollection, this.currentTaskId)
                const data = await getDoc(taskRef)
                this.currentTaskData = { ...data.data(), id: data.id };
            }
        } catch (err) {
            console.log(err)
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
            console.log("- ", x.id, x.courseName, x.userId, x.name)
        ))
    }


}

