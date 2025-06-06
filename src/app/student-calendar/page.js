'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/pages/student-calendar.module.css';

const all_tasks = [
    {
        "taks_id": 0,
        "taks_name": "task 1",
        "task_description": "task 1 desc",
        "task_from_discipline_id": 1,
        "task_add_date": "10.10.2025"
    }
];

const all_desceplines = [
    {
        "id": 1,
        "name": "Математика (Міжгір’я, ЗОШ ІІІ ст. №1)"
    },
    {
        "id": 2,
        "name": "Математика (МЕГУ)"
    },
    {
        "id": 3,
        "name": "Вища математика (МЕГУ)"
    },
    {
        "id": 4,
        "name": "Математика (Запоріжжя, ЗОШ №101)"
    },
    {
        "id": 5,
        "name": "Математика (Міжгір’я ЗОШ ІІІ ст. №1)"
    }
];

const user_data = [
    {
        "id": 1,
        "name": "dazeroth",
        "phone": "+380984932106",
        "gender": "male",
        "email": "dazeroth.feral@gmail.com",
        "description": "test1",
        "avatar": "",
        "schools": [
            1,
            2
        ],
        "desciplines": [
            1,
            2,
            3,
            4,
            5
        ]
    },
    {
        "id": 2,
        "name": "dazeroth",
        "phone": "+380984932106",
        "gender": "male",
        "email": "dazeroth.feral@gmail.com",
        "description": "test",
        "avatar": "",
        "schools": [
            1,
            2
        ],
        "desciplines": [
            1,
            2
        ]
    }
];

export default function StudentCalendar() {
    const { data: session, status } = useSession();

    const [disciplines, setDisciplines] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedDisciplineId, setSelectedDisciplineId] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    const months = [
        'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
        'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
    ];


    useEffect(() => {
        if (status === 'authenticated') {
            const userId = session.user.id;

            // Отримати всіх користувачів (щоб дістати дисципліни користувача)
            fetch('/api/student-calendar')
                .then(res => res.json())
                .then(users => {
                    const currentUser = users.find(u => u.id === userId);
                    if (!currentUser) return;

                    // Тепер отримати всі дисципліни
                    fetch('/api/all-disciplines')
                        .then(res => res.json())
                        .then(allDisciplines => {
                            const userDisciplines = allDisciplines.filter(d =>
                                currentUser.desciplines.includes(d.id)
                            );

                            // Стандартизуємо формат
                            const formatted = userDisciplines.map(d => ({
                                discipline_id: d.id,
                                discipline_name: d.name,
                                school: '' // якщо є school — додай сюди
                            }));

                            setDisciplines(formatted);
                        });
                });

            // Отримати всі таски
            fetch('/api/all-tasks')
                .then(res => res.json())
                .then(setTasks);
        }
    }, [status, session]);

    const daysInMonth = 30;

    let desciplines_mass = [];

    if (session) {
        for (let i = 0; i < user_data.length; i++) {
            if (user_data[i].id == session.user.id) {
                for (let j = 0; j < user_data[i].desciplines.length; j++) {
                    if (user_data[i].desciplines[j] == all_desceplines[j].id) {
                        desciplines_mass.push(
                            <div key={all_desceplines[j].id} className={styles.subjectBtn}>
                                {all_desceplines[j].name}
                            </div>
                        )
                    };
                };
            }
        };

    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Учням: Календар учня</h2>

            <div className={styles.calendarSection}>
                {/* КАЛЕНДАР */}
                <div className={styles.calendarBox}>
                    <div className={styles.title}>Місяць: {months[selectedMonth]}</div>
                    {Array.from({ length: daysInMonth }, (_, i) => {
                        const dayStr = String(i + 1).padStart(2, '0');
                        const task = tasks.find(
                            t =>
                                t.task_from_discipline_id === selectedDisciplineId &&
                                t.task_add_date.startsWith(dayStr) &&
                                Number(t.task_add_date.split('.')[1]) === selectedMonth + 1
                        );
                        const isHighlighted = Boolean(task);

                        return isHighlighted ? (
                            <Link
                                key={`day-${i}-${selectedDisciplineId}`}
                                href={`/student/task/${task.taks_id}`}
                                className={`${styles.day} ${styles.activeDay}`}
                            >
                                {dayStr}
                            </Link>
                        ) : (
                            <div key={`day-${i}-${selectedDisciplineId}`} className={styles.day}>
                                {dayStr}
                            </div>
                        );
                    })}
                </div>

                {/* ДИСЦИПЛІНИ */}
                <div className={styles.subjectsBox}>
                    {/* {disciplines.map(d => (
                        <button
                            key={d.discipline_id}
                            className={styles.subjectBtn}
                            onClick={() => setSelectedDisciplineId(d.discipline_id)}
                        >
                            {d.discipline_name}
                        </button>
                    ))} */}
                    {
                        desciplines_mass
                    }
                </div>
            </div>

            {/* ШКАЛА РОКУ З МІСЯЦЯМИ */}
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
