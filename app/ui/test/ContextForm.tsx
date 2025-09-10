import { useContext } from "react";
import { UserContext } from "../../page";

export default function ContextForm():JSX.Element {
  const { username, email, updateUsername } = useContext(UserContext);

  return (
    <div>
      <h2>My Profile</h2>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <button onClick={() => updateUsername("Jane")}>
        Update username to Jane
      </button>
    </div>
  );
}
