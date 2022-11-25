import { useEffect, useState } from "react";
import styled, {css, keyframes} from "styled-components";
import {
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IPopup {
  message: String
  close: (x: any) => any
  type: 'TOAST' | 'MESSAGE'
  cancelText?: String
  cancelCallback?: (x: any) => any
}

interface IBox {
  visible: boolean
}

const slideUp = keyframes`
  0% {
    transform: translateY(2px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideDown = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(2px);
    opacity: 0;
  }
`;

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupBox = styled.div<IBox>`
  width: 200px;
  display: flex; 
  flex-direction: column;
  background-color: ${props => props.theme.accentBackgroundColor};
  overflow: hidden;
  animation-duration: .2s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
  border-color: #333;
  border-top-color: white;
  border-left-color: white;
  ${
    props => props.visible ? css`
      animation-name: ${slideUp};
    ` : css`
      animation-name: ${slideDown};
    `
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 20px;
  padding: 2px 5px;
  background-color: ${props => props.theme.accentColor};
`;

const CloseButton = styled.button`
  width: 16px;
  height: 16px;
  padding: 0;
  background-color: ${props => props.theme.accentBackgroundColor};
  font-size: 12px;
`;

const Contents = styled.div`
  padding: 20px 3px;
  text-align: center;
`;

function Popup({message, close}: IPopup) {
  const [visibleText, setVisibleText] = useState<String>("");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if(message) {
      setVisibleText(message);
    } else if (visibleText) {
      timeout = setTimeout(() => {
        setVisibleText("");
      }, 300)
    }
    return () => {
      if (timeout !== undefined) {
        clearTimeout(timeout);
      }
    }
  }, [message]);

  if(!visibleText) return null;

  return (
    <PopupWrapper>
      <PopupBox visible={!!message}>
        <Header>
          <CloseButton onClick={close}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseButton>
        </Header>
        <Contents>
          {visibleText}
        </Contents>
      </PopupBox>
    </PopupWrapper>
  )
}

export default Popup;