import { useContext } from "react";
import { UserLoginContext } from "../context/UserContext";

const useUserContext = () => useContext(UserLoginContext);

export default useUserContext;
