import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { encryptedToken } from "../../utils/constants"
import { updateUserFetch } from "../../features/actions/accountAction"
import type { UserFullName } from "../../utils/interfaces"

interface ChangeUserProps {
  onBack: () => void,
  userLogin: string
}

const ChangeUser = ({ onBack, userLogin }: ChangeUserProps) => {
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.user.status);

  const handleClickUpdateUser = () => {
    const token = encryptedToken(userLogin, password);
    const user : UserFullName = {
      firstName,
      lastName
    }
    dispatch(updateUserFetch({ token, user }))
      .then(response => {
        console.log("fulfilled");
      })
      .catch(error => console.error(error));
    setPassword("");
    setFirstName("");
    setLastName("");
  };
  

  return (
    <div>
      <h2>Update User Data</h2>
      <input
        type="password"
        placeholder="Your password"
        required={true}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="string"
        placeholder="First Name"
        required={true}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="string"
        placeholder="Last Name"
        required={true}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <button onClick={handleClickUpdateUser}>Update User Data</button>
      <button onClick={onBack}>Back to details</button>
      {status && <p>{status}</p>}
    </div>
  )
}

export default ChangeUser