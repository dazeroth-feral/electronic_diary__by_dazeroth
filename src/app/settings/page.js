'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from '@/styles/pages/profile-settings.module.css';

export default function ProfileSettingsPage() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/user/${session.user.id}`)
        .then(res => res.json())
        .then(data => setUserData(data));
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await fetch(`/api/user/${session.user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    alert('Оновлено!');
  };

  if (!userData) return <p>Завантаження...</p>;

  console.log(userData)

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Налаштування профілю</h1>
      <div className={styles.content}>
        <div className={styles.formSection}>
          <label>
            Прізвище, ім’я та по батькові
            <input name="name" value={userData.name || ''} onChange={handleChange} className={styles.input} />
          </label>

          <div className={styles.row}>
            <label className={styles.flexGrow}>
              Мобільний телефон
              <input name="phone" value={userData.phone || ''} onChange={handleChange} className={styles.input} />
            </label>

            <label className={styles.genderSelect}>
              Стать
              <select name="gender" value={userData.gender || ''} onChange={handleChange} className={styles.input}>
                <option value="">Не обрано</option>
                <option value="male">Чоловіча</option>
                <option value="female">Жіноча</option>
              </select>
            </label>
          </div>

          <label>
            Електронна пошта
            <input name="email" value={userData.email || ''} onChange={handleChange} className={styles.input} />
          </label>

          <label>
            Опис вашого профілю
            <textarea name="description" value={userData.description || ''} onChange={handleChange} rows={4} className={styles.textarea} />
          </label>
        </div>

        <div className={styles.avatarSection}>
          <span className={styles.avatarLabel}>Ваше фото аватару</span>
          <div className={styles.avatarBox}></div>
          <button className={styles.uploadBtn}>Завантажити інше фото</button>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.saveBtn} onClick={handleSubmit}>Оновити інформацію облікового запису</button>
        <button className={styles.deleteBtn}>Видалити обліковий запис</button>
      </div>
    </main>
  );
}
