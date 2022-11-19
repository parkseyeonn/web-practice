import {Link} from "react-router-dom";
import styled from "styled-components";
import {BaseBox} from "../common";

interface IBottomBox {
  cta: String
  link: String
  linkText: String
}

const SBottomBox = styled(BaseBox)`
  padding: 20px 0;
  text-align: center;
  a {
    margin-left: 5px;
    color: ${props => props.theme.accentColor};
    font-weight: 600;
  }
`;

function BottomBox({cta, link, linkText}: IBottomBox) {
  return (
    <SBottomBox>
      <span>{cta}</span>
      <Link to={link}>{linkText}</Link>
    </SBottomBox>
  )
}

export default BottomBox;