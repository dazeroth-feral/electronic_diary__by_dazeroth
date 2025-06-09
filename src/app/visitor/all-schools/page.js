'use client';

import styles from '@/styles/pages/visitor-schools.module.css';

export default function VisitorInstitutionsPage() {
  return (
    <main className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>
          Відвідувачам: <strong>Список навчальних закладів</strong>
        </h1>
        <input type="text" className={styles.searchInput} placeholder="Пошук" />
      </div>

      <div className={styles.list}>
        {[
          'Міжгірська ЗОШ ІІІ ст. №1',
          'МІЖНАРОДНИЙ ЕКОНОМІКО-ГУМАНІТАРНИЙ УНІВЕРСИТЕТ ІМ. АКАДЕМІКА СТЕПАНА ДЕМ’ЯНЧУКА',
          'Запорізька ЗОШ ІІІ ст. №101',
          'Рівненська ЗОШ ІІІ ст. №68',
          'Міжгірська ЗОШ ІІІ ст. №1',
        ].map((school, i) => (
          <div className={styles.listItem} key={i}>
            <span>{school}</span>
            <button onClick={() => {alert("Ви не є учасником платформи, тому можливості надати вам доступ до певної школи, чи дисципліни - нема.", "Не можливо доєднатись.");}} className={styles.inviteBtn}>Надіслати запрошення</button>
          </div>
        ))}
      </div>
    </main>
  );
}
