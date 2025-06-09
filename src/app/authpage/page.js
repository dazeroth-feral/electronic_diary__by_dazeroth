'use client';

import { signIn } from 'next-auth/react';
import styles from '@/styles/pages/login.module.css';

export default function LoginPage() {
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/', // редірект після входу
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.box}>
          <h2 className={styles.subtitle}>Авторизація в ED.bD</h2>  
          <form className={styles.form} onSubmit={handleLogin}>
            <input
              type="text"
              name="email"
              placeholder="Ім'я користувача або ел. пошта"
              className={styles.input}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              className={styles.input}
              required
            />

            <div className={styles.forgot}>
              <a href="#">Забули пароль?</a>
            </div>

            <button type="submit" className={styles.button}>
              Авторизуватися
            </button>
          </form>
            <div className={styles.register}>
              Вперше на ED.bD? <a href="#"><br />Створіть обліковий запис</a>
            </div>
        </div>
      </div>
    </div>
  );
}
