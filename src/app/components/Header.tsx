import Image from 'next/image';
import Logo from '@/assets/logo.svg';
import Avatar from '@/assets/image-avatar.jpg';
import styles from '@/app/styles/Header.module.scss';
import ThemeSwitcher from './ThemeSwitcher';
import useStore from '../store/store';
import MoonIconSvg from './MoonIconSvg';
import SunIconSvg from './SunIconSvg';
import { useEffect } from 'react';
import { Theme } from '../types';

export default function Header() {
  const { theme, setTheme } = useStore();

  useEffect(() => {
    const themeFromLS = (localStorage.getItem('Invoice-app-theme') as Theme) || 'light';
    setTheme(themeFromLS);
  }, [setTheme]);

  useEffect(() => {
    localStorage.setItem('Invoice-app-theme', theme);
  }, [theme]);

  const switchTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={Logo} alt='logo' />
      </div>
      <div className={styles.theme_switch} onClick={switchTheme}>
        {theme === 'light' ? <MoonIconSvg className={styles.moon_icon} /> : <SunIconSvg className={styles.sun_icon} />}
      </div>
      <div className={styles.avatar}>
        <Image src={Avatar} alt='avatar' />
      </div>
      <ThemeSwitcher theme={theme} />
    </header>
  );
}
