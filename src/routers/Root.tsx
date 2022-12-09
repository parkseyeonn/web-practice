import {Outlet} from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Alert from "../components/modal/Alert";

function Root () {
  return (
    <>
      <Header />
      <Layout>
        <Outlet context={{
          darkMode: false
        }}/>
      </Layout>
      <Alert />
    </>
  )
}

export default Root;