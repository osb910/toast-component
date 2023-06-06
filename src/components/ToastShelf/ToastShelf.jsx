import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf({toasts, setToasts}) {
  return (
    <ol className={styles.wrapper}>
      {toasts.map(({id, variant, message}) => (
        <li key={id} className={styles.toastWrapper}>
          <Toast
            variant={variant}
            dismiss={() =>
              setToasts(current => current.filter(toast => toast.id !== id))
            }
          >
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
