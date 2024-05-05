import { useRef } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

import { auth } from '../config/FirebaseConfig'
import { db } from '../config/FirebaseConfig'

export default function Auth() {

    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const roleRef = useRef()

    const rolesRef = collection(db, 'roles')

    const signIn = async () => {
        try {
            createUserWithEmailAndPassword(auth, emailRef.current?.value, passwordRef.current?.value).then((createdUser) => {
                addDoc(rolesRef, { userId: createdUser.user.uid, role: roleRef.current?.value })
            })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <form>
                <label>email</label>
                <input type="text" ref={emailRef} />
                
                <label>password</label>
                <input type="text" ref={passwordRef} />

                <label>role</label>
                <select ref={roleRef}>
                    <option value="student">student</option>
                    <option value="teacher">teacher</option>
                </select>
            </form>

            <div>
                <button type="button" onClick={signIn}>create account</button>
            </div>
        </>
    )
}
