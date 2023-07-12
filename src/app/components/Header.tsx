import Image from 'next/image';
import Logo from '@/assets/logo.svg';
import MoonIcon from '@/assets/icon-moon.svg';
import SunIcon from '@/assets/icon-sun.svg';
import Avatar from '@/assets/image-avatar.jpg';
import styles from '@/app/styles/Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={Logo} alt='logo' />
      </div>
      <div className={styles.theme_switch}>
        <Image src={MoonIcon} alt='moon icon' />
      </div>
      <div className={styles.avatar}>
        <Image src={Avatar} alt='avatar' />
      </div>
    </header>
  );
}
