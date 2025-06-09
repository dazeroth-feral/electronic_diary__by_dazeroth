'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from '@/styles/pages/studen-all-disciplines.module.css';

export default function VisitorDisciplinesPage() {
  const { data: session, status } = useSession();
  const [disciplines, setdisciplines] = useState([]);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      fetch(`/api/student-all-disciplines-from-id?id=${session.user.id}`)
        .then(res => res.json())
        .then(data => setdisciplines(data))
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
        {disciplines.map((discipline) => (
          <div key={discipline.id} className={styles.listItem}>
            <span className={styles.schoolName}>{`${discipline.name} ${discipline.from_school_name}`}</span>
            <a href={`/discipline?id=${discipline.id}`} className={styles.inviteBtn}>Перейти до завдань</a>
          </div>
        ))}
      </div>
    </main>
  );
}
