'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from '@/styles/pages/studen-all-disciplines.module.css';

export default function VisitorDisciplinesPage() {
    const { data: session, status } = useSession();
    const [disciplines_data, set__disciplines_data] = useState([]);

    let disciplines_mass = [];

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.id) {
            fetch(`/api/student-all-disciplines-from-id?id=${session.user.id}`)
                .then(res => res.json())
                .then(data => set__disciplines_data(data))
                .catch(err => console.error("Помилка при завантаженні дисциплін:", err));
        }
    }, [session, status]);

    if (status === 'loading') return <div>Завантаження...</div>;
    if (status === 'unauthenticated') return <div>Увійдіть у систему</div>;

    if (disciplines_data) {
        for (let i = 0; i < disciplines_data.length; i++) {
            disciplines_mass.push(
                <div key={disciplines_data[i].id} className={styles.listItem}>
                    <span className={styles.schoolName}>{`${disciplines_data[i].name} ${disciplines_data[i].from_school_name}`}</span>
                    <a href={`/discipline?id=${disciplines_data[i].id}`} className={styles.inviteBtn}>Перейти до завдань</a>
                </div>
            );
        }
    }

    return (
        <main className={styles.container}>
            <div className={styles.headerRow}>
                <h1 className={styles.title}>
                    Учням: <strong>Список всіх навчальних дисциплін, що вам доступні</strong>
                </h1>
                <input type="text" className={styles.searchInput} placeholder="Пошук" />
            </div>

            <div className={styles.list}>
                {
                    disciplines_mass
                }
            </div>
        </main>
    );
}
