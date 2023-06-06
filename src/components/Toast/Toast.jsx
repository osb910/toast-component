import {AlertOctagon, AlertTriangle, CheckCircle, Info, X} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';
import {useEffect} from 'react';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

const Toast = ({variant, dismiss, delay = 60000, children}) => {
  const Icon = ICONS_BY_VARIANT[variant];
  useEffect(() => {
    const timeout = setTimeout(() => {
      dismiss();
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay, dismiss]);
  return (
    <div onClick={dismiss} className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{variant} -</VisuallyHidden>
        {children}
      </p>
      <button
        className={styles.closeButton}
        onClick={dismiss}
        aria-label='Dismiss message'
        aria-live='off'
      >
        <X size={24} />
      </button>
    </div>
  );
};

export default Toast;
