import css_style from "@/styles/components_styles/nav.module.css";
import Image from "next/image";
import Link from "next/link";

let WHO_IS = "Відвідувач";
let PIB = "ads.";

export default function Nav() {
    return (
        <main className={css_style.nav}>
            <div className={css_style.top_navigates}>
                <span>
                    <Image src="/ico/nav__home_ico.svg" width={22} height={22} alt="" />
                    <Link href="/">Головна</Link>
                </span>

                <div>
                    Відвідувачам
                </div>

                <span>
                    <Image src="/ico/nav__book_ico.svg" width={22} height={22} alt="" />
                    <Link href="/">Всі заклади</Link>
                </span>
                <span>
                    <Image src="/ico/nav__head_ico.svg" width={22} height={22} alt="" />
                    <Link href="/">Всі дисципліни</Link>
                </span>

                <div>
                    Учням
                </div>

                <span>
                    <Image src="/ico/nav__book_ico.svg" width={22} height={22} alt="" />
                    <Link href="/">Заклади з вами</Link>
                </span>
                <span>
                    <Image src="/ico/nav__head_ico.svg" width={22} height={22} alt="" />
                    <Link href="/">Дисцип. що вивч.</Link>
                </span>
                <span>
                    <Image src="/ico/nav__calendar_ico.svg" width={22} height={22} alt="" />
                    <Link href="/">Календар учня</Link>
                </span>
                <span>
                    <Image src="/ico/nav__tablet_ico.svg" width={22} height={22} alt="" />
                    <Link href="/">Всі ваші оцінки</Link>
                </span>

                <div>
                    Викладачам
                </div>

                <span>
                    <Image src="/ico/nav__book_ico.svg" width={22} height={22} alt="" />
                    <Link href="/">Ваші заклади</Link>
                </span>
                <span>
                    <Image src="/ico/nav__head_ico.svg" width={22} height={22} alt="" />
                    <Link href="/">Ващі дисципліни</Link>
                </span>
                <span>
                    <Image src="/ico/nav__calendar_ico.svg" width={22} height={22} alt="" />
                    <Link href="/">Календар вчителя</Link>
                </span>
            </div>


            <div className={css_style.bottom_options}>
                <span>
                    <Image src="/ico/nav__gear_ico.svg" width={22} height={22} alt="" />
                    <Link href="/">Налаштування</Link>
                </span>
                <div className={css_style.acount_plate}>
                    <Image src="/ico/nav__avatar_ico.svg" width={36} height={36} alt="" />
                    <div className={css_style.right_peace}>
                        <span className={css_style.who_is}>
                            {WHO_IS}
                        </span>
                        <div className={css_style.pib_holder}>
                            <span className={css_style.pib}>
                                <Link href="/">{PIB}</Link>
                            </span>
                            <Link href="/"><Image src="/ico/nav__logout_ico.svg" width={22} height={22} alt="" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
