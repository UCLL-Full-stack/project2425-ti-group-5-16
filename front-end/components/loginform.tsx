import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import UserService from "@services/UserService";

// Define the type for your props, including className
interface LoginFormProps {
  className?: string; // className is optional
}

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  // Destructure className from props

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [statusMessages, setStatusMessages] = useState([]);
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState<string | null>();
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    setLoggedInUser(sessionStorage.getItem("loggedInUser"));
    setToken(sessionStorage.getItem("token"));
  }, []);

  const clearErrors = () => {
    setUsernameError("");
    setPasswordError("");
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (username.trim() === "") {
      setUsernameError("Username is required");
      result = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    clearErrors();
    if (validate() === false) {
      return;
    }

    try {
      const response = await UserService.loginUser(username, password);
      const user = await response.json();

      if (response.status == 200) {
        setStatusMessages([
          {
            message: `Successfully logged in, you're being redirected`,
            type: "success",
          },
        ]);
        sessionStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            token: user.token,
            name: user.name,
            username: user.username,
            type: user.type,
          })
        );
        sessionStorage.setItem("token", user.token.toString());
        sessionStorage.setItem("type", user.type.toString());

        setTimeout(() => {
          router.push("/");
        }, 2000);
      }

      if (response.status == 400) {
        setStatusMessages([{ message: `${user.message}`, type: "error" }]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className} >
      {" "}
      {/* Apply className here */}
      {/* Update label color to white */}
      <label id="usernameLabel" className="text-white">
        username
      </label>
      <input
        className="border-2 border-[#005d8c] rounded p-2 bg-[#ffffff] text-black"
        id="usernameInput"
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      {usernameError && <p className="text-red-500">{usernameError}</p>}
      {/* Update label color to white */}
      <label id="passwordLabel" className="text-white">
        password
      </label>
      <input
        className="border-2 border-[#005d8c] rounded p-2 bg-[#ffffff] text-black"
        id="passwordInput"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {passwordError && <p className="text-red-500">{passwordError}</p>}
      {/* Change button to another purple color */}
      <button className="mt-2 w-14 h-7 border-2 bg-[#005d8c] hover:bg-[#063970] rounded text-white">
        <p className="text-white">Login</p> {/* Set text to black inside <p> */}
      </button>
      {statusMessages && (
        <ul>
          {statusMessages.map(({ message, type }, index) => (
            <li
              key={index}
              className={type === "error" ? "text-red-600" : "text-green-600"}
            >
              {message}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default LoginForm;
