'use client';

import styles from '@/styles/pages/discipline.module.css';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from "next/link";

export default function discipline_page() {
    const { data: session, status } = useSession();
    const [disciplines_data, set__disciplines_data] = useState([]);
    const [current_disciplines_data, set__curent_disciplines_data] = useState([]);
    const [school_name, set__school_name] = useState();
    const [user_data, set__user_data] = useState();
    const [school_data, set__school_data] = useState();
    const [tasks_data, set__tasks_data] = useState();
    const [all_grades_data, set__all_grades_data] = useState();

    const search_params = useSearchParams();
    const discipline_id = search_params.get("id");

    let tasks_mass = [];

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.id) {
            Promise.all([
                fetch(`/api/student-schools?id=${session.user.id}`).then(res => res.json()),
                fetch(`/api/all-disciplines`).then(res => res.json()),
                fetch(`/api/student-calendar`).then(res => res.json()),
                fetch(`/api/student-all-grades?id=${session.user.id}`).then(res => res.json()),
                fetch(`/api/user/${session.user.id}`).then(res => res.json())
            ]).then(([schools, disciplines_all_data, tasks, all_grades, user_data]) => {
                let current_user = session.user.id;

                if (!current_user) return;

                if (tasks && user_data && disciplines_all_data && tasks && all_grades) {
                    set__school_data(schools);
                    set__school_name(tasks[discipline_id].name);
                    set__disciplines_data(disciplines_all_data);
                    set__user_data(user_data);
                    set__tasks_data(tasks);
                    set__all_grades_data(all_grades);
                };
            });
        }
    }, [status, session]);

    useEffect(() => {
        if (disciplines_data) {
            for (let i = 0; i < disciplines_data.length; i++) {
                if (discipline_id == disciplines_data[i].id) {
                    set__curent_disciplines_data(disciplines_data[i]);
                };
            };
        };
    }), [];

    if (status === 'loading') return <div>Завантаження...</div>;
    if (status === 'unauthenticated') return <div>Увійдіть у систему</div>;


    if (tasks_data && current_disciplines_data && all_grades_data) {
        if (current_disciplines_data.teacher_ids?.includes(session?.user?.id)) {
            for (let i = 0; i < school_data.length; i++) {
                if (current_disciplines_data.id == tasks_data[i].task_from_discipline_id) {
                    tasks_mass.push(
                        <details className={styles.spoiler} key={i + 600}>
                            <summary>
                                <div>{tasks_data[i].task_name} </div>
                                <div>Додано: {tasks_data[i].task_add_date}</div>
                            </summary>
                            <p>Завдання: {tasks_data[i].task_description}</p>
                        </details>
                    );
                };
            };
        } else {
            for (let i = 0; i < school_data.length; i++) {
                for (let j = 0; j < all_grades_data.length; j++) {
                    if (current_disciplines_data.id == tasks_data[i].task_from_discipline_id) {
                        tasks_mass.push(
                            <details className={styles.spoiler} key={i + 600}>
                                <summary>
                                    <div>{tasks_data[i].task_name} </div>
                                    <div>Додано: {tasks_data[i].task_add_date}</div>
                                </summary>
                                <p>Завдання: {tasks_data[i].task_description}</p>
                            </details>
                        );
                    };
                };
            };
        };
    };

    return (
        <main className={styles.main}>
            <div className={styles.headerRow}>
                <h1 className={styles.title}>
                    Дисципліна: <strong>
                        {
                            current_disciplines_data.name
                                ? current_disciplines_data.teacher_ids?.includes(session?.user?.id)
                                    ? (
                                        <>
                                            {current_disciplines_data.name}
                                            <div className={styles.who_is}>
                                                Вчитель
                                            </div>
                                        </>
                                    )
                                    : (
                                        <>
                                            {current_disciplines_data.name}
                                            <div className={styles.who_is}>
                                                Учень
                                            </div>
                                        </>
                                    )
                                : "Завантаження..."
                        }
                    </strong>
                </h1>
                <div className={styles.discipline_description}>
                    {
                        current_disciplines_data.description
                    }
                </div>
                <span className={styles.allowed_tasks}>Доступні завдання:</span>
                <div className={styles.task_list__container}>
                    <br />
                    {
                        tasks_mass
                    }
                </div>
            </div>
        </main>
    );
}
