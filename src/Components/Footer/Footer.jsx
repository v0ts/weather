import styles from "./Footer.module.scss"
import logo from '../Header/img/logo.png';
import instagramIcon from './img/instagram.png';
import facebookIcon from './img/facebook.png';
import whatsappIcon from './img/whatsapp.png';
import { Container } from '../Container/Container';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <ul className={styles.footerList}>
          <li className={styles.brandSection}>
            <div className={styles.logo}>
              <img src={logo} alt="24/7 forecast logo" className={styles.logoImage} />
            </div>
          </li>

          <li className={styles.addressSection}>
            <h3 className={styles.sectionTitle}>Address</h3>
            <div className={styles.address}>
              <p>Svobody str. 35</p>
              <p>Kyiv</p>
              <p>Ukraine</p>
            </div>
          </li>

          <li className={styles.contactSection}>
            <h3 className={styles.sectionTitle}>Contact us</h3>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">
                <img src={instagramIcon} alt="Instagram" className={styles.socialIconImage} />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Facebook">
                <img src={facebookIcon} alt="Facebook" className={styles.socialIconImage} />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="WhatsApp">
                <img src={whatsappIcon} alt="WhatsApp" className={styles.socialIconImage} />
              </a>
            </div>
          </li>
        </ul>
      </Container>
    </footer>
  );
};
