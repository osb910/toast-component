import {createContext, useMemo, useState} from 'react';
import useHotKeys from '../hooks/use-hotkeys';

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

  const keyboardShortcuts = useMemo(() => {
    return [
      {
        hotKey: 'Escape',
        run: () => setToasts([]),
      },
    ];
  }, []);
  useHotKeys(keyboardShortcuts);

  return (
    <ToastContext.Provider value={{toasts, createToast, dismissToast}}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
