import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from './config/FirebaseConfig'
import Auth from './components/Auth'
import RoleSwitch from './components/RoleSwitch';
import './index.css'

function App() {

    const [user] = useAuthState(auth)

    return (
        <>
            <div className='main-container'>
                {user == null ? <Auth /> : <RoleSwitch />}
            </div>
        </>
    )
}

export default App
