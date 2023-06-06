import {useContext} from 'react';
import Toast from '../Toast';
import styles from './ToastShelf.module.css';
import ToastContext from '../../lib/toast-context';

function ToastShelf() {
  const {toasts, dismissToast} = useContext(ToastContext);
  return (
    <ol
      className={styles.wrapper}
      role='region'
      aria-live='assertive'
      aria-label='Notification'
    >
      {toasts.map(({id, variant, message}) => (
        <li key={id} className={styles.toastWrapper}>
          <Toast variant={variant} dismiss={() => dismissToast(id)}>
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
