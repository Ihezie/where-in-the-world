import axios from "axios";
import { useAppData } from "./AppProvider";

const useFetchData = () => {
  const { dispatch } = useAppData();
  return async function (url) {
    try {
      const response = await axios(url);
      dispatch({ type: "SET DATA", payload: response.data });
    } catch (error) {
      dispatch({type: "ERROR"})
      console.log(error);
    }
  };
};

export default useFetchData;
