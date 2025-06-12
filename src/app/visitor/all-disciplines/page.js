'use client';

import { useEffect, useState } from 'react';

import styles from '@/styles/pages/visitor-disciplines.module.css';

export default function VisitorDisciplinesPage() {
    const [disciplines_data, set__disciplines] = useState([]);

    let disciplines_mass = [];

    useEffect(() => {
        fetch(`/api/all-disciplines`)
            .then(res => res.json())
            .then(data => set__disciplines(data))
            .catch(err => console.error("Помилка при завантаженні дисциплін:", err));
    },
        []);

    if (disciplines_data) {
        for (let i = 0; i < disciplines_data.length; i++) {
            disciplines_mass.push(
                <div className={styles.listItem} key={i}>
                    <span>{`${disciplines_data[i].name} ${disciplines_data[i].from_school_name}`}</span>
                    <button onClick={() => {
                        alert("Ви не є учасником платформи, тому можливості надати вам доступ до певної школи, чи дисципліни - нема.", "Не можливо доєднатись.");
                    }} className={styles.inviteBtn}>Надіслати запрошення</button>
                </div>
            );
        };
    };

    return (
        <main className={styles.container}>
            <div className={styles.headerRow}>
                <h1 className={styles.title}>
                    Відвідувачам: <strong>Список навчальних дисциплін</strong>
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
