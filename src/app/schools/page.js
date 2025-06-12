'use client';

import styles from '@/styles/pages/schools.module.css';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from "next/link";

export default function Schools(req) {
    const { data: session, status } = useSession();
    const [disciplines_data, set__disciplines_data] = useState([]);
    const [school_name, set__school_name] = useState();
    const [school_data, set__school_data] = useState();

    const search_params = useSearchParams();
    const school_id = search_params.get("id");

    let disciplines_mass = [];

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.id) {
            Promise.all([
                fetch(`/api/student-schools?id=${session.user.id}`).then(res => res.json()),
                fetch(`/api/all-disciplines`).then(res => res.json())
            ]).then(([school, disciplines_all_data]) => {
                let current_user = session.user.id;

                if (!current_user) return;

                if (school) {
                    set__school_data(school);
                    set__school_name(school[school_id].name);
                    set__disciplines_data(disciplines_all_data);
                };
            });
        }
    }, [status, session]);

    if (status === 'loading') return <div>Завантаження...</div>;
    if (status === 'unauthenticated') return <div>Увійдіть у систему</div>;

    if (disciplines_data) {
        for (let i = 0; i < disciplines_data.length; i++) {
            if (Number(disciplines_data[i].from_school_id) == Number(school_id)) {
                disciplines_mass.push(
                    <div key={i + 1} className={styles.listItem}>
                        <span className={styles.schoolName}>{disciplines_data[i].name}</span>
                        <a href={`/discipline?id=${disciplines_data[i].id}`} className={styles.inviteBtn}>Перейти до завдань</a>
                    </div>
                )
            };
        };
    };

    return (
        <main className={styles.main}>
            <div className={styles.headerRow}>
                <h1 className={styles.title}>
                    Навчальний заклад: <strong>{school_name}</strong>
                </h1>
                <div className={styles.task_list__container}>
                    Доступні дисципліни:
                    {
                        disciplines_mass
                    }
                </div>
            </div>
        </main>
    );
}
