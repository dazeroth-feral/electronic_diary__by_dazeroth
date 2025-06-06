import styles from '@/styles/HomePage.module.css';

import Link from "next/link";

export default function HomePage() {
  return (
    <main className={styles.main}>
      {/* Остання новина */}
      <div className={styles.newsBox}>
        <h2>Остання новина:</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi auctor risus sit amet lectus laoreet...
        </p>
      </div>

      <div className={styles.sections}>
        {/* Відвідувачам */}
        <section className={styles.each_section}>
          <h2 className={styles.sectionTitle}>Відвідувачам для ознайомлення</h2>
          <div className={styles.grid}>
            <Link className={styles.card} href="/visitordisciplines">
              <span className={styles.icon}>📖</span>
              <span>Всі заклади</span>
            </Link>
            <Link className={styles.card} href="/visitorinstitutions">
              <span className={styles.icon}>🎓</span>
              <span>Перелік всіх навчальних дисциплін</span>
            </Link>
            <div className={styles.card_solo}></div>
            <div className={styles.card_solo}></div>
          </div>
        </section>

        {/* Учням */}
        <section className={styles.each_section}>
          <h2 className={styles.sectionTitle}>Учням, що навчаються</h2>
          <div className={styles.grid}>
            <Link className={styles.card} href="/studentschools">
              <span className={styles.icon}>🏫</span>
              <span>Навчальні заклади, в котрі вас додано</span>
            </Link>
            <Link className={styles.card} href="/student-all-disciplines">
              <span className={styles.icon}>📚</span>
              <span>Дисципліни, котрі ви вивчаєте</span>
            </Link>
            <Link className={styles.card} href="/">
              <span className={styles.icon}>📅</span>
              <span>Календар навчального навантаження</span>
            </Link>
            <Link className={styles.card} href="/student-all-grades">
              <span className={styles.icon}>📝</span>
              <span>Всі виставлені вам оцінки</span>
            </Link>
          </div>
        </section>

        {/* Викладачам */}
        <section className={styles.each_section}>
          <h2 className={styles.sectionTitle}>Викладачам, що навчають</h2>
          <div className={styles.grid}>
            <Link className={styles.card} href="/">
              <span className={styles.icon}>🏫</span>
              <span>Ваші навчальні заклади</span>
            </Link>
            <Link className={styles.card} href="/">
              <span className={styles.icon}>📚</span>
              <span>Дисципліни, котрі ви ведете</span>
            </Link>
            <Link className={styles.card} href="/">
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
