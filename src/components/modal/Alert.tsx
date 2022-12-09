import { useEffect, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import styled, {css, keyframes} from "styled-components";
import {
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Portal from "./Portal";
import { alertMessage, closeAlert } from "../../reactiveVar";

// 구조
// reactiveVar에서 alert state 저장. V
// 컴포에서 사용시 변경. (중첩 불가.) V
// portal 이용해서 생성해놓기. V

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

const AlertWrapper = styled.div`
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

const AlertBox = styled.div<IBox>`
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

const BottomArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const BottomButton = styled.button`
  height: 24px;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 4px;
  background-color: white;
  font-size: 12px;
  & + button {
    margin-left: 5px;
  }
`;

function Alert() {
  const state = useReactiveVar(alertMessage);
  const {message} = state;
  const [visibleText, setVisibleText] = useState<string>("");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if(message) {
      setVisibleText(message);
    } else if (visibleText) {
      if (state?.cancelCallback) {
        state.cancelCallback();
      }
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

  const clickCancel = () => {
    if(state?.cancelCallback)  {
      state.cancelCallback();
    }
    closeAlert();
  };

  const clickSubmit = () => {
    if(state?.submitCallback)  {
      state.submitCallback();
    }
    closeAlert();
  };

  // if(!visibleText) return null;

  return (
    <Portal rootId="AlertPortal">
      {
        visibleText ? 
        <AlertWrapper>
          <AlertBox visible={!!message}>
            <Header>
              <CloseButton onClick={closeAlert}>
                <FontAwesomeIcon icon={faXmark} />
              </CloseButton>
            </Header>
            <Contents>
              {visibleText}
              {
                state.cancelText || state.submitText ?
                <BottomArea>
                {
                  state.cancelText ?
                  <BottomButton onClick={clickCancel}>{state.cancelText}</BottomButton> : null
                }
                {
                  state.submitText ?
                  <BottomButton onClick={clickSubmit}>{state.submitText}</BottomButton> : null
                }
                </BottomArea> : null
              }
            </Contents>
          </AlertBox>
        </AlertWrapper> : null
      }
    </Portal>
  )
}

export default Alert;