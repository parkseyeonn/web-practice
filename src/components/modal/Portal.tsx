import { ReactNode, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

interface IPortal {
  children: ReactNode
  rootId: string
}

function Portal({children, rootId}: IPortal) {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let root = document.getElementById(rootId);
    let systemCreated = false;
    if (!root && rootId) {
      systemCreated = true;
      root = document.createElement('div');
      root.setAttribute('id', rootId);
      document.body.appendChild(root);
    }
    setRootElement(root);

    return () => {
      if (systemCreated && root?.parentNode) {
        root.parentNode.removeChild(root);
      }
    };
  }, [rootId]);

  if (rootElement) {
    return createPortal(children, rootElement);
  }
  return null;
}

export default Portal;