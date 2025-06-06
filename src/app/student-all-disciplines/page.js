'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from '@/styles/pages/StudenAllDisciplinesPage.module.css';

export default function VisitorDisciplinesPage() {
  const { data: session, status } = useSession();
  const [desciplines, setDesciplines] = useState([]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch(`/api/student-all-desciplines?id=${session.user.id}`)
        .then(res => res.json())
        .then(data => setDesciplines(data))
        .catch(err => console.error("Помилка при завантаженні дисциплін:", err));
    }
  }, [session, status]);

  if (status === 'loading') return <div>Завантаження...</div>;
  if (status === 'unauthenticated') return <div>Увійдіть у систему</div>;

  return (
    <main className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>
          Учням: <strong>Список всіх навчальних дисциплін, що вам доступні</strong>
        </h1>
        <input type="text" className={styles.searchInput} placeholder="Пошук" />
      </div>

      <div className={styles.list}>
        {desciplines.map((descipline) => (
          <div key={descipline.id} className={styles.listItem}>
            <span className={styles.schoolName}>{descipline.name}</span>
            <button className={styles.inviteBtn}>Перейти до завдань</button>
          </div>
        ))}
      </div>
    </main>
  );
}
