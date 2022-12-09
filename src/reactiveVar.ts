import { makeVar } from "@apollo/client";

const TOKEN = 'token';

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const logUserIn = (token:string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};
export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
};
export const getToken = () => localStorage.getItem(TOKEN);

export interface IAlert {
  message: string
  cancelText?: string
  cancelCallback?: (() => any)
  submitText?: string
  submitCallback?: (() => any)
}
const defaultAlert = {
  message: "",
  cancelText: "",
  submitText: "",
};
export const alertMessage = makeVar<IAlert>(defaultAlert);
export const openAlert = (args: IAlert) => {
  if (args) {
    alertMessage({
      ...defaultAlert,
      ...args,
    });
  }
};
export const closeAlert = () => {
  alertMessage({
    ...alertMessage(),
    message: ""
  })
};
