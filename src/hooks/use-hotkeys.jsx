import {useEffect, useMemo} from 'react';

const useHotKeys = (keyMap, ref) => {
  const element = ref?.current ?? window;

  const hotKeyRegex = useMemo(
    () =>
      /((?:(?:[<>]|Left|Right)?(?:\B[!^+#]|(?:Alt|C(?:on)?tro?l|Shift|Win)[\s+]?))*)[\s+]?(.+)/i,
    []
  );
  const leftKeyRegex = useMemo(
    () => /(<|Left)([!^+#]|Alt|C(?:on)?tro?l|Shift|Win)\+?/i,
    []
  );
  const rightKeyRegex = useMemo(
    () => /(>|Right)([!^+#]|Alt|C(?:on)?tro?l|Shift|Win)\+?/i,
    []
  );
  const altRegex = useMemo(() => /(\B!|Alt)\+?(?!Left|Right)/i, []);
  const ctrlRegex = useMemo(() => /(\B\^|C(?:on)?tro?l)\+?(?!Left|Right)/i, []);
  const shiftRegex = useMemo(() => /(\B\+|Shift)\+?(?!Left|Right)/i, []);
  const metaRegex = useMemo(() => /(\B#|Win)\+?(?!Left|Right)/i, []);

  useEffect(() => {
    const keyActions = keyMap.map(({hotKey, run, universal}) => {
      let [char, ...mods] = hotKey
        .replace(hotKeyRegex, (_, mods, char) => {
          mods = mods
            .replace(leftKeyRegex, '$2Left ')
            .replace(rightKeyRegex, '$2Right ')
            .replace(altRegex, 'Alt ')
            .replace(ctrlRegex, 'Control ')
            .replace(shiftRegex, 'Shift ')
            .replace(metaRegex, 'Meta ');
          char = universal && char.length === 1 ? char.toUpperCase() : char;
          char =
            universal && char.length === 1
              ? char.replace(/[a-z]/i, 'Key$&')
              : char;
          return `${mods}${char}`;
        })
        .split(/\s+/)
        .reverse();
      mods = mods.map(mod => {
        const [, modKey, dir] = mod.split(
          /(Alt|Control|Shift|Meta)(Left|Right)?/i
        );
        return {modKey, dir};
      });
      return {char, mods, run, universal};
    });
    const handleKeyDown = evt => {
      evt.stopPropagation();
      const {key, code} = evt;
      for (let {char, mods, run, universal} of keyActions) {
        const isHotKey = universal ? char === code : char === key;
        if (
          isHotKey &&
          mods.every(({modKey}) => evt.getModifierState(modKey))
        ) {
          run();
          break;
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [
    element,
    keyMap,
    hotKeyRegex,
    leftKeyRegex,
    rightKeyRegex,
    altRegex,
    ctrlRegex,
    shiftRegex,
    metaRegex,
  ]);
  return null;
};

export default useHotKeys;
