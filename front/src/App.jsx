import { auth } from './config/FirebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'

import Auth from './components/Auth'
import RoleSwitch from './components/RoleSwitch';

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
