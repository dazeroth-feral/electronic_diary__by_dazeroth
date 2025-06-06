'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from '@/styles/pages/student-all-grades.module.css';

export default function AllGrades() {
  const { data: session, status } = useSession();
  const [grades, setGrades] = useState([]);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch(`/api/student-all-grades?id=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => setGrades(data))
        .catch((err) => console.error('Помилка при завантаженні оцінок:', err));
    }
  }, [session, status]);

  if (status === 'loading') return <div>Завантаження...</div>;
  if (status === 'unauthenticated') return <div>Увійдіть у систему</div>;

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        Учням: <strong>Всі ваші оцінки</strong>
      </div>

      <div
        className={styles.selectWrapper}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <span>Ваші дисципліни</span>
        <span>{expanded ? '⌃' : '⌄'}</span>
      </div>

      {expanded && (
        <div className={styles.schoolSection}>
          {grades.length === 0 ? (
            <div>Немає оцінок</div>
          ) : (
            grades.map((discipline, index) => (
              <div key={index} className={styles.subjectRow}>
                <div className={styles.subjectTitle}>{discipline.name}</div>
                {discipline.tasks.map((task, i) => (
                  <div key={i} className={styles.task}>
                    <span>Завдання #{task.task_id + 1}</span>
                    <span>{task.task_grade}</span>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
