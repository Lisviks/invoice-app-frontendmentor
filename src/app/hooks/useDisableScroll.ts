import { useEffect } from 'react';
import useWindowWidth from './useWindowSize';

export default function useDisableScroll(isFormOpen: boolean) {
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth >= 1000 && isFormOpen) {
      document.body.classList.add('disable_scroll');
    } else {
      document.body.classList.remove('disable_scroll');
    }
  }, [isFormOpen, windowWidth]);
}
