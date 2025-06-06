'use client'
import { SessionProvider } from "next-auth/react"

import css_style from '@/styles/global.module.css';
import Header from "@/components/Header/Header.js";
import Footer from "@/components/Footer/Footer.js";
import Nav from '@/components/Nav/Nav.js';

export default function RootLayout({ children }) {
    return (
        <SessionProvider>
            <head>
                <title>Electronic Diary</title>
            </head>
            <html lang="en">
                <body>
                    <Header />
                    <div className={css_style.wrapper}>
                        <Nav />
                        <div className={css_style.content}>
                            <div style={{ flex: 1 }}>
                                {children}
                            </div>
                            <Footer />
                        </div>
                    </div>
                </body>
            </html>
        </SessionProvider>
    )
}
