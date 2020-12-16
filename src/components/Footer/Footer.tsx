import * as React from 'react';

import styles from '@/components/footer/footer.scss';

const Footer: React.FC = () => {
  const srcGit = '/images/github.svg';
  return (
    <div className={styles.footer}>
      <div className="footer-text">2020</div>
      <a href="https://github.com/KantyshVitali">
        <img src={srcGit} alt="github" />
      </a>
      <a href="https://github.com/SkaymanT">
        <img src={srcGit} alt="github" />
      </a>
      <a href="https://github.com/Ilya-Baklanov">
        <img src={srcGit} alt="github" />
      </a>

      <a className="school-link" href="https://rs.school/js/">
        <img src="https://rs.school/images/rs_school_js.svg" alt="rs_school" />
      </a>
    </div>
  );
};

export default Footer;
