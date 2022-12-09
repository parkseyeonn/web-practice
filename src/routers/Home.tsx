import PageTitle from "../components/PageTitle";
import Photo from "../components/feed/Photo";
import { useSeeFeedQuery } from "../request";

function Home () {
  const {data} = useSeeFeedQuery({
    variables: {
      offset: 0
    }
  });
  return (
    <>
      <PageTitle title="Home" />
      {
        data?.seeFeed?.map((photo, index) => (
          photo ? <Photo key={index} {...photo}/> : null
        ))
      }
    </>
  )
}

export default Home;