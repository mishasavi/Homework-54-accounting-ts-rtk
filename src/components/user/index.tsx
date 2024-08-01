import { useAppSelector } from "../../app/hooks"
import { useState } from "react"
import ChangeUser from "./ChangeUser"
import ChangePassword from "./ChangePassword"

const User = () => {
  const user = useAppSelector(store=>store.user.data);
  const [view, setView] = useState('details');
  const showChangeUser = () => setView('changeUser');
  const showChangePassword = () => setView('changePassword');
  const showDetails = () => setView('details');

  //TODO create components ChangeUser, ChangePassword



  return (

    <div>
      {view === 'details' && (
        <div>
          <h2>User details</h2>
          <p>{user.firstName}</p>
          <p>{user.lastName}</p>
          <p>{user.login}</p>
          <p>{user.roles}</p>
          <button onClick={showChangeUser}>Update User Data</button>
          <button onClick={showChangePassword}>Change Password</button>
        </div>
      )}

      {view === 'changeUser' && <ChangeUser onBack={showDetails} userLogin={user.login}/>}
      {view === 'changePassword' && <ChangePassword onBack={showDetails} userLogin={user.login}/>}
    </div>
  )
}

export default User