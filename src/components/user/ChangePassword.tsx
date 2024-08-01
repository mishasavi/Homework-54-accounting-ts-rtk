import { useState } from "react"
import { encryptedToken } from "../../utils/constants"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { updatePasswordFetch } from "../../features/actions/accountAction"



interface ChangePasswordProps {
  onBack: () => void,
  userLogin: string
}

const ChangePassword = ({ onBack, userLogin }: ChangePasswordProps) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.user.status);

  const handleClickChangePassword = () => {
    const token = encryptedToken(userLogin, oldPassword);
    dispatch(updatePasswordFetch({ token, newPassword }))
      .then(response => {
        console.log("fulfilled");
      })
      .catch(error => console.error(error));
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <div>
      <h2>Change Password</h2>
      <input
        type="password"
        placeholder="Old password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleClickChangePassword}>Change password</button>
      <button onClick={onBack}>Back to details</button>
      {status && <p>{status}</p>}
    </div>
  )
}

export default ChangePassword