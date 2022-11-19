import {Outlet} from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";

function Root () {
  return (
    <>
      <Header />
      <Layout>
        <Outlet context={{
          darkMode: false
        }}/>
      </Layout>
    </>
  )
}

export default Root;