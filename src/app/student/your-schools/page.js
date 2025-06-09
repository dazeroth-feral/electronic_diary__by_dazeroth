'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from '@/styles/pages/student-all-schools.module.css';

export default function StudentSchools() {
  const { data: session, status } = useSession();
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch(`/api/student-schools?id=${session.user.id}`)
        .then(res => res.json())
        .then(data => setSchools(data))
        .catch(err => console.error("Помилка при завантаженні шкіл:", err));
    }
  }, [session, status]);

  if (status === 'loading') return <div>Завантаження...</div>;
  if (status === 'unauthenticated') return <div>Увійдіть у систему</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Учням: <span>Список навчальних закладів, куди вас додано</span>
      </h2>

      <div className={styles.searchWrapper}>
        <input className={styles.search} type="text" placeholder="Пошук" />
      </div>

      <div className={styles.list}>
        {schools.map((school) => (
          <div key={school.id} className={styles.schoolItem}>
            <span className={styles.schoolName}>{school.name}</span>
            <a href={`/schools?id=${Number(school.id )- 1}`} className={styles.link}>
              Перейти до навч. закладу
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}