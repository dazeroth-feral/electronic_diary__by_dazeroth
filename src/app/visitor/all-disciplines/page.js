'use client';

import styles from '@/styles/pages/visitor-disciplines.module.css';

export default function VisitorDisciplinesPage() {
  return (
    <main className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>
          Відвідувачам: <strong>Список навчальних дисциплін</strong>
        </h1>
        <input type="text" className={styles.searchInput} placeholder="Пошук" />
      </div>

      <div className={styles.list}>
        {[
          'Математика (Міжгір’я, ЗОШ ІІІ ст. №1)',
          'Математика (МЕГУ)',
          'Вища математика (МЕГУ)',
          'Математика (Запоріжжя, ЗОШ №101)',
          'Математика (Міжгір’я ЗОШ ІІІ ст. №1)',
        ].map((item, i) => (
          <div className={styles.listItem} key={i}>
            <span>{item}</span>
            <button onClick={() => {alert("Ви не є учасником платформи, тому можливості надати вам доступ до певної школи, чи дисципліни - нема.", "Не можливо доєднатись.");}} className={styles.inviteBtn}>Надіслати запрошення</button>
          </div>
        ))}
      </div>
    </main>
  );
}
