import * as React from 'react';

import styles from '@/components/Footer/Footer.scss';

import GithubIcon from '../icons/GithubIcon';

const Footer: React.FC = () => (
  <div className={styles.footer}>
    <div className="footer-text">2020</div>
    <a className={styles['link-footer']} href="https://github.com/KantyshVitali">
      <GithubIcon className={styles['footer-li-icon']} />
      <span>KantyshVitali</span>
    </a>
    <a className={styles['link-footer']} href="https://github.com/SkaymanT">
      <GithubIcon className={styles['footer-li-icon']} />
      <span>SkaymanT</span>
    </a>
    <a className={styles['link-footer']} href="https://github.com/Ilya-Baklanov">
      <GithubIcon className={styles['footer-li-icon']} />
      <span>Ilya-Baklanov</span>
    </a>

    <a className="school-link" href="https://rs.school/js/">
      <img src="https://rs.school/images/rs_school_js.svg" alt="rs_school" />
    </a>
  </div>
);

export default Footer;
