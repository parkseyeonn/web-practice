import {useOutletContext} from "react-router-dom";

interface IFolllowersContext {
  message: string;
}

function Followers() {
  const {message} = useOutletContext<IFolllowersContext>();
  return <>
  {message}
  </>
}

export default Followers;