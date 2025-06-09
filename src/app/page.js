import styles from '@/styles/home-page.module.css';

import Link from "next/link";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.newsBox}>
        <h2>Остання новина:</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi auctor risus sit amet lectus laoreet...
        </p>
      </div>

      <div className={styles.sections}>
        <section className={styles.each_section}>
          <h2 className={styles.sectionTitle}>Відвідувачам для ознайомлення</h2>
          <div className={styles.grid}>
            <Link className={styles.card} href="/visitor/all-schools">
              <span className={styles.icon}>📖</span>
              <span>Всі заклади</span>
            </Link>
            <Link className={styles.card} href="/visitor/all-disciplines">
              <span className={styles.icon}>🎓</span>
              <span>Перелік всіх навчальних дисциплін</span>
            </Link>
            <div className={styles.card_solo}></div>
            <div className={styles.card_solo}></div>
          </div>
        </section>

        <section className={styles.each_section}>
          <h2 className={styles.sectionTitle}>Учням, що навчаються</h2>
          <div className={styles.grid}>
            <Link className={styles.card} href="/student/your-schools">
              <span className={styles.icon}>🏫</span>
              <span>Навчальні заклади, в котрі вас додано</span>
            </Link>
            <Link className={styles.card} href="/student/your-disciplines">
              <span className={styles.icon}>📚</span>
              <span>Дисципліни, котрі ви вивчаєте</span>
            </Link>
            <Link className={styles.card} href="/student/your-calendar">
              <span className={styles.icon}>📅</span>
              <span>Календар навчального навантаження</span>
            </Link>
            <Link className={styles.card} href="/student/your-all-grades">
              <span className={styles.icon}>📝</span>
              <span>Всі виставлені вам оцінки</span>
            </Link>
          </div>
        </section>

        <section className={styles.each_section}>
          <h2 className={styles.sectionTitle}>Викладачам, що навчають</h2>
          <div className={styles.grid}>
            <Link className={styles.card} href="/teacher/your-schools">
              <span className={styles.icon}>🏫</span>
              <span>Ваші навчальні заклади</span>
            </Link>
            <Link className={styles.card} href="/teacher/your-disciplines">
              <span className={styles.icon}>📚</span>
              <span>Дисципліни, котрі ви ведете</span>
            </Link>
            <Link className={styles.card} href="/teacher/your-calendar">
              <span className={styles.icon}>📅</span>
              <span>Календар навчального навантаження</span>
            </Link>
            <div className={styles.card_solo}></div>
          </div>
        </section>
      </div>
    </main>
  );
}
