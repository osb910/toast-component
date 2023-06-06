import {useCallback, useContext, useMemo, useRef, useState} from 'react';
import Button from '../Button';

import styles from './ToastPlayground.module.css';
import ToastShelf from '../ToastShelf/ToastShelf';
import useHotKeys from '../../hooks/use-hotkeys';
import ToastContext from '../../lib/toast-context';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

const ToastPlayground = () => {
  const [variant, setVariant] = useState(VARIANT_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const messageRef = useRef();
  const {createToast} = useContext(ToastContext);
  const popToast = useCallback(
    evt => {
      evt?.preventDefault();
      if (!message) return;
      createToast(variant, message);
      setVariant(VARIANT_OPTIONS[0]);
      setMessage('');
    },
    [message, variant, createToast]
  );

  const keyboardShortcuts = useMemo(() => {
    return [
      {
        hotKey: 'Escape',
        run: () => setMessage(''),
      },
      {
        hotKey: 'RightControl+Enter',
        run: () => popToast(),
      },
    ];
  }, [popToast]);
  useHotKeys(keyboardShortcuts, messageRef);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt='Cute toast mascot' src='/toast.png' />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf />

      <form className={styles.controlsWrapper} onSubmit={popToast}>
        <div className={styles.row}>
          <label
            htmlFor='message'
            className={styles.label}
            style={{alignSelf: 'baseline'}}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id='message'
              className={styles.messageInput}
              onInput={evt => setMessage(evt.target.value)}
              value={message}
              ref={messageRef}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <p className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map(option => {
              const id = `variant-${option}`;
              return (
                <label key={id} htmlFor={id}>
                  <input
                    id={id}
                    type='radio'
                    name='variant'
                    value={option}
                    checked={variant === option}
                    onChange={evt => setVariant(evt.target.value)}
                  />
                  {option}
                </label>
              );
            })}
          </p>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ToastPlayground;
