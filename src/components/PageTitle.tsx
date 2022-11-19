import {Helmet} from "react-helmet-async";

interface IPageTitle {
  title: string;
}

function PageTitle({title}: IPageTitle) {
  return (<Helmet>
    <title>{title}</title>
  </Helmet>);
}

export default PageTitle;