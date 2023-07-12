'use client';

import { useState } from 'react';
import Image from 'next/image';
import Logo from '@/assets/logo.svg';
import MoonIcon from '@/assets/icon-moon.svg';
import SunIcon from '@/assets/icon-sun.svg';
import Avatar from '@/assets/image-avatar.jpg';
import styles from '@/app/styles/Header.module.scss';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  const [theme, setTheme] = useState('light');

  const switchTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={Logo} alt='logo' />
      </div>
      <div className={styles.theme_switch} onClick={switchTheme}>
        {theme === 'light' ? <Image src={MoonIcon} alt='moon icon' /> : <Image src={SunIcon} alt='sun icon' />}
      </div>
      <div className={styles.avatar}>
        <Image src={Avatar} alt='avatar' />
      </div>
      <ThemeSwitcher theme={theme} />
    </header>
  );
}
