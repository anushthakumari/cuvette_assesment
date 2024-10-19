import useUserContext from "./useUserContext";

const useUserData = () => {
	const { userData } = useUserContext();

	return userData;
};

export default useUserData;
