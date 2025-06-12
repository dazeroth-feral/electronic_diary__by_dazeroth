'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from '@/styles/pages/student-all-grades.module.css';

export default function AllGrades() {
  const { data: session, status } = useSession();
  const [grades, set__grades] = useState([]);
  const [all_tasks, set__all_tasks] = useState([]);
  const [all_disciplines_data, set__all_disciplines_data] = useState([]);
  const [expanded, setExpanded] = useState(true);

  let grades_mass = [];

  useEffect(() => {
    if (status === 'authenticated') {
      fetch(`/api/student-all-grades?id=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => set__grades(data))
        .catch((err) => console.error('Помилка при завантаженні оцінок:', err));
      fetch(`/api/all-tasks`)
        .then((res) => res.json())
        .then((data) => set__all_tasks(data))
        .catch((err) => console.error('Помилка при завантаженні оцінок:', err));
      fetch(`/api/student-all-disciplines-from-id?id=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => set__all_disciplines_data(data))
        .catch((err) => console.error('Помилка при завантаженні оцінок:', err));
    }
  }, [session, status]);

  if (status === 'loading') return <div>Завантаження...</div>;
  if (status === 'unauthenticated') return <div>Увійдіть у систему</div>;

  if (grades && all_tasks && all_disciplines_data) {
    for (let p = 0; p < all_disciplines_data.length; p++) {
      let tasks_in_block = [];
      if (grades.student_grades) {
        for (let i = 0; i < grades.student_grades.length; i++) {
          for (let j = 0; j < all_tasks.length; j++) {
            if (all_disciplines_data[p].id == grades.student_grades[i].discipline_id) {
              if (all_tasks[j].task_from_discipline_id == grades.student_grades[i].discipline_id) {
                const matchingTask = grades.student_grades[i].tasks.find(
                  (t) => t.task_id == all_tasks[j].task_id
                );

                if (matchingTask) {
                  tasks_in_block.push(
                    <div key={`row-${p}-${i}-${j}`} className={styles.subjectRow}>
                      <div key={`task-${p}-${i}-${j}`} className={styles.task}>
                        <span>Завдання: {all_tasks[j].task_name}</span>
                        <div style={{ display: 'flex', gap: "2em" }}>
                          <span>Оцінка: {matchingTask.task_grade}</span>
                          <span>{all_tasks[j].task_add_date}</span>
                        </div>
                      </div>
                    </div>
                  );
                };
              };
            };
          };
        };
        if (tasks_in_block.length > 0) {
          grades_mass.push(
            <details key={`row-${p}`} className={styles.subjectRow}>
              <summary className={styles.subjectTitle}>{`${all_disciplines_data[p].name} ${all_disciplines_data[p].from_school_name}`}</summary>
              {tasks_in_block}
            </details>
          );
        };
      }
    };
  };

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
          {!grades || grades.error || grades.student_grades?.length === 0 ? (
            <div>Немає оцінок</div>
          ) : (
            grades_mass
          )}
        </div>
      )}

    </div>
  );
}
