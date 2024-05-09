import { useRef } from 'react'
import { auth } from '../config/FirebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Auth() {

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, emailRef.current?.value, passwordRef.current?.value)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <form>
                <label>email</label>
                <input className='border' type="text" ref={emailRef} />
                <label>password</label>
                <input className='border' type="text" ref={passwordRef} />
            </form>
            <div>
                <button type="button"onClick={logIn}>log in</button>
            </div>
        </>
    )
}
