import {createContext, useState} from 'react';

const ToastContext = createContext();

export const ToastProvider = ({children}) => {
  const [toasts, setToasts] = useState([]);

  const createToast = (variant, message) => {
    setToasts(current => [
      ...current,
      {id: crypto.randomUUID(), variant, message},
    ]);
  };

  const dismissToast = id => {
    setToasts(current => current.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{toasts, createToast, dismissToast}}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
