import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../../App.module.css';
import styles from '../AuthPage/AuthPage.module.css';
import { register, login } from '../../redux/authorization/auth-operations';
import { MdPermIdentity, MdEmail } from 'react-icons/md';
import { WiStars } from 'react-icons/wi';

function AuthPage() {
  const { authType } = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [te, setPassword] = useState('');
  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    authType === 'login' && dispatch(login({ email, password }));
    authType === 'register' && dispatch(register({ name, email, password }));
    setEmail('');
    setPassword('');
    setName('');
  };
  return (
    <div className={styles.formWrap}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h1>Fill the form:</h1>
        {authType === 'register' && (
          <label className={styles.label} htmlFor="name">
            <MdPermIdentity className={styles.labelIcons} />
            <input
              className={styles.authInput}
              type="text"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </label>
        )}
        <label className={styles.label} htmlFor="email">
          <MdEmail className={styles.labelIcons} />
          <input
            className={styles.authInput}
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label} htmlFor="password">
          <WiStars className={styles.labelIcons} />
          <input
            className={styles.authInput}
            title="Enter min. 8 characters, 1 number, 1 uppercase letter and 1 lowercase letter"
            type="text"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter your password"
            pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*"
            required
          />
        </label>
        <button className={styles.authBtn} type="submit">
          {authType === 'login' ? 'Log In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default AuthPage;



