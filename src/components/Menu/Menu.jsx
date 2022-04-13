import React from 'react';
import { Link } from 'react-router-dom';
import { logOut } from '../../redux/authorization/auth-operations';
import {AiFillHome, AiFillContacts, AiOutlineLogin, AiOutlineLogout, AiTwotoneRocket} from 'react-icons/ai';
import styles from './Menu.module.css';
import '../../App.module.css';
export default function Menu({ isAuth, dispatch }) {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to={'/'} className={styles.homePageLink}>
            <AiFillHome className={styles.headerIcon} />
            Мій ремонт
          </Link>
        </li>
        <li>
          <Link to={'/masters'} className={styles.homePageLink}>
            Майстри
          </Link>
        </li>
        <li>
          <Link to={'/orders'} className={styles.homePageLink}>
            Замовлення
          </Link>
        </li>
        <li>
          <Link to={'/tomasters'} className={styles.homePageLink}>
            Майстрам
          </Link>
        </li>
        <li>
          <Link to={'/toorders'} className={styles.homePageLink}>
            Замовникам
          </Link>
        </li>
        <li>
          <Link to={'/portfolio'} className={styles.homePageLink}>
            Портфоліо
          </Link>
        </li>
        <li>
          <Link to={'/news'} className={styles.homePageLink}>
            Новини
          </Link>
        </li>
        {isAuth === true && (
          <li>
            <Link to={'/contacts'} className={styles.homePageLink}>
              <AiFillContacts className={styles.headerIcon} />
              Contacts
            </Link>
          </li>
        )}
      </ul>

      <ul className={styles.authList}>
        {isAuth === true ? (
          <>
            <li>
              <button
                type="button"
                className={(styles.authLinks, styles.OutLink)}
                onClick={() => {
                  dispatch(logOut());
                }}
              >
                <AiOutlineLogout className={styles.headerIcon} />
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className={styles.authLinks} to={'/auth/register'}>
                <AiTwotoneRocket className={styles.headerIcon} />
                Реєстрація
              </Link>
            </li>
            <li>
              <Link to={'/auth/login'} className={styles.authLinks}>
                <AiOutlineLogin className={styles.headerIcon} />
                Вхід
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
