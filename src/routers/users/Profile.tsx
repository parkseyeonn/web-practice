import { Outlet, Link, useParams } from "react-router-dom";

function Profile () {
  const {userId} = useParams();

  return (
    <>
      PROFILE OF {userId}
      <Link to="followers">See followers</Link>
      <Outlet 
        context={{
          message: "i love my holiday"
        }}
      />
    </>
  )
}

export default Profile;