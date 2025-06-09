'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/pages/student-calendar.module.css';

export default function StudentCalendar() {
    const daysInMonth = 30;

    const { data: session, status } = useSession();

    const [all_disciplines, setDisciplines] = useState([]);
    const [all_tasks, setTasks] = useState([]);
    const [user_data, set__user_data] = useState([]);
    const [selectedDisciplineId, setSelectedDisciplineId] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    const months = [
        'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
        'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
    ];

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.id) {
            Promise.all([
                fetch('/api/student-calendar').then(res => res.json()),
                fetch(`/api/user/${session.user.id}`).then(res => res.json()),
            ]).then(([tasks, user]) => {
                let currentUser;

                if (user.id == session.user.id) {
                    currentUser = user;
                };
                if (!currentUser) return;

                set__user_data(user)
                setTasks(tasks);

                fetch(`/api/student-all-disciplines-from-id?id=${session.user.id}`)
                    .then(res => res.json())
                    .then(allDisciplines => setDisciplines(allDisciplines))
                    .catch(err => console.error("Помилка при завантаженні дисциплін:", err));
            });
        }
    }, [status, session]);

    if (status === 'loading') return <div>Завантаження...</div>;
    if (status === 'unauthenticated') return <div>Увійдіть у систему</div>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Викладачам: Календар завдань</h2>

            <div className={styles.calendarSection}>
                <div className={styles.calendarBox}>
                    {months[selectedMonth]}
                    <br />
                    {[...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1;
                        const dayStr = String(day).padStart(2, '0');
                        const monthStr = String(selectedMonth + 1).padStart(2, '0');

                        const tasksForDay = all_tasks.filter(task => {
                            const task_day = task.task_add_date.slice(0, 2);
                            const task_month = task.task_add_date.slice(3, 5);
                            const isSameDate = task_day === dayStr && task_month === monthStr;
                            const isSameDiscipline =
                                selectedDisciplineId !== null &&
                                task.task_from_discipline_id === selectedDisciplineId;
                            return isSameDate && isSameDiscipline;
                        });

                        if (tasksForDay.length > 0) {
                            const task = tasksForDay[0];
                            return (
                                <Link
                                    key={`day-${day}-${selectedDisciplineId}`}
                                    href={`/student/task/${task.task_id}`}
                                    className={`${styles.day} ${styles.activeDay}`}
                                >
                                    {day}
                                </Link>
                            );
                        } else {
                            return (
                                <div
                                    key={`day-${day}-${selectedDisciplineId}`}
                                    className={styles.day}
                                >
                                    {day}
                                </div>
                            );
                        }
                    })}
                </div>

                <div className={styles.subjectsBox}>
                    {user_data?.disciplines &&
                        all_disciplines.length > 0 &&
                        user_data.disciplines.map((disciplineId, idx) => {
                            const discipline = all_disciplines.find(d => d.id === disciplineId);
                            if (!discipline) return null;

                            return (
                                <div
                                    key={discipline.id}
                                    onClick={() => { setSelectedDisciplineId(discipline.id); console.log(selectedDisciplineId) }}
                                    className={`${styles.subjectBtn} ${discipline.id === selectedDisciplineId ? styles.active__subjectBtn : ""
                                        }`}
                                >
                                    {discipline.name}
                                </div>
                            );
                        })}
                </div>
            </div>

            <div className={styles.yearRow}>
                <span className={styles.year}>2025</span>
                <div className={styles.monthsBox}>
                    {months.map((_, i) => (
                        <div
                            key={`month-${i}`}
                            className={`${styles.month} ${i === selectedMonth ? styles.activeMonth : ''}`}
                            onClick={() => setSelectedMonth(i)}
                        >
                            {String(i + 1).padStart(2, '0')}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
