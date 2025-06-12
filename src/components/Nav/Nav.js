'use client';

import styles from "@/styles/components_styles/nav.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from "react";

let WHO_IS = "Відвідувач";
let PIB = "ads.";

export default function Nav() {
    const search_params = usePathname();
    const { data: session } = useSession()
    const [user_data, set__user_data] = useState();

    useEffect(() => {
        if (session?.user?.id) {
            fetch(`/api/user/${session.user.id}`)
                .then(res => res.json())
                .then(data => set__user_data(data));
        }
    }, [session]);

    if (!session) {
        WHO_IS = "Відвідувач";
        PIB = "Незнайко А. К.";
    }
    else if (session && user_data) {
        WHO_IS = user_data.is_teacher
            ? "Викладач"
            : "Учень"
            ;
        PIB = session.user.name
    }

    return (
        <main className={styles.nav}>
            <div className={styles.top_navigates}>
                <span className={search_params == "/" ? styles.active : ""}>
                    <Image src="/ico/nav__home_ico.svg" width={22} height={22} alt="" />
                    <Link href="/">Головна</Link>
                </span>

                <div>
                    Відвідувачам
                </div>

                <span className={search_params == "/visitor/all-schools" ? styles.active : ""}>
                    <Image src="/ico/nav__book_ico.svg" width={22} height={22} alt="" />
                    <Link href="/visitor/all-schools">Всі заклади</Link>
                </span>
                <span className={search_params == "/visitor/all-disciplines" ? styles.active : ""}>
                    <Image src="/ico/nav__head_ico.svg" width={22} height={22} alt="" />
                    <Link href="/visitor/all-disciplines">Всі дисципліни</Link>
                </span>

                {
                    user_data
                        ? user_data.is_teacher
                            ?
                            <>
                                <div>
                                    Викладачам
                                </div>

                                <span className={search_params == "/teacher/your-schools" ? styles.active : ""}>
                                    <Image src="/ico/nav__book_ico.svg" width={22} height={22} alt="" />
                                    <Link href="/teacher/your-schools">Ваші заклади</Link>
                                </span>
                                <span className={search_params == "/teacher/your-disciplines" ? styles.active : ""}>
                                    <Image src="/ico/nav__head_ico.svg" width={22} height={22} alt="" />
                                    <Link href="/teacher/your-disciplines">Ващі дисципліни</Link>
                                </span>
                                <span className={search_params == "/teacher/your-calendar" ? styles.active : ""}>
                                    <Image src="/ico/nav__calendar_ico.svg" width={22} height={22} alt="" />
                                    <Link href="/teacher/your-calendar">Календар вчителя</Link>
                                </span>
                            </>
                            : <>
                                <div>
                                    Учням
                                </div>

                                <span className={search_params == "/student/your-schools" ? styles.active : ""}>
                                    <Image src="/ico/nav__book_ico.svg" width={22} height={22} alt="" />
                                    <Link href="/student/your-schools">Заклади з вами</Link>
                                </span>
                                <span className={search_params == "/student/your-disciplines" ? styles.active : ""}>
                                    <Image src="/ico/nav__head_ico.svg" width={22} height={22} alt="" />
                                    <Link href="/student/your-disciplines">Дисцип. що вивч.</Link>
                                </span>
                                <span className={search_params == "/student/your-calendar" ? styles.active : ""}>
                                    <Image src="/ico/nav__calendar_ico.svg" width={22} height={22} alt="" />
                                    <Link href="/student/your-calendar">Календар учня</Link>
                                </span>
                                <span className={search_params == "/student/your-all-grades" ? styles.active : ""}>
                                    <Image src="/ico/nav__tablet_ico.svg" width={22} height={22} alt="" />
                                    <Link href="/student/your-all-grades">Всі ваші оцінки</Link>
                                </span>
                            </>
                        :
                        <>
                            <div>
                                Викладачам
                            </div>

                            <span className={search_params == "/teacher/your-schools" ? styles.active : ""}>
                                <Image src="/ico/nav__book_ico.svg" width={22} height={22} alt="" />
                                <Link href="/teacher/your-schools">Ваші заклади</Link>
                            </span>
                            <span className={search_params == "/teacher/your-disciplines" ? styles.active : ""}>
                                <Image src="/ico/nav__head_ico.svg" width={22} height={22} alt="" />
                                <Link href="/teacher/your-disciplines">Ващі дисципліни</Link>
                            </span>
                            <span className={search_params == "/teacher/your-calendar" ? styles.active : ""}>
                                <Image src="/ico/nav__calendar_ico.svg" width={22} height={22} alt="" />
                                <Link href="/teacher/your-calendar">Календар вчителя</Link>
                            </span>
                            <div>
                                Учням
                            </div>

                            <span className={search_params == "/student/your-schools" ? styles.active : ""}>
                                <Image src="/ico/nav__book_ico.svg" width={22} height={22} alt="" />
                                <Link href="/student/your-schools">Заклади з вами</Link>
                            </span>
                            <span className={search_params == "/student/your-disciplines" ? styles.active : ""}>
                                <Image src="/ico/nav__head_ico.svg" width={22} height={22} alt="" />
                                <Link href="/student/your-disciplines">Дисцип. що вивч.</Link>
                            </span>
                            <span className={search_params == "/student/your-calendar" ? styles.active : ""}>
                                <Image src="/ico/nav__calendar_ico.svg" width={22} height={22} alt="" />
                                <Link href="/student/your-calendar">Календар учня</Link>
                            </span>
                            <span className={search_params == "/student/your-all-grades" ? styles.active : ""}>
                                <Image src="/ico/nav__tablet_ico.svg" width={22} height={22} alt="" />
                                <Link href="/student/your-all-grades">Всі ваші оцінки</Link>
                            </span>
                        </>
                }
            </div>


            <div className={styles.bottom_options}>
                <span className={search_params == "/settings" ? styles.active : ""}>
                    <Image src="/ico/nav__gear_ico.svg" width={22} height={22} alt="" />
                    <Link href="/settings">Налаштування</Link>
                </span>
                <div className={styles.acount_plate}>
                    <Image src="/ico/nav__avatar_ico.svg" width={36} height={36} alt="" />
                    <div className={styles.right_peace}>
                        <span className={styles.who_is}>
                            {WHO_IS}
                        </span>
                        <div className={styles.pib_holder}>
                            <span className={styles.pib}>
                                <Link href="/authpage">{PIB}</Link>
                            </span>
                            <span onClick={() => signOut()}>
                                <Link href="/"><Image src="/ico/nav__logout_ico.svg" width={22} height={22} alt="" /></Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
