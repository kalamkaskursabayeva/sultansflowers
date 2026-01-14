import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/contexts/language-context"
import { AuthProvider } from "@/contexts/auth-context"
import { CartProvider } from "@/contexts/cart-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin", "latin-ext"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Green Flowers — Оптовые цветы из Китая | Прямые поставки без посредников",
  description:
    "Прямые поставки свежих цветов с плантаций Китая. Розы, хризантемы, гвоздики, лилии оптом. Без посредников, лучшие цены, доставка 7-10 дней. Связь через WhatsApp: +7 708 235 4533",
  keywords: [
    "оптовые цветы",
    "цветы из Китая",
    "розы оптом",
    "хризантемы оптом",
    "B2B цветы",
    "поставки цветов",
    "Куньмин цветы",
    "wholesale flowers",
    "China flowers",
  ],
  authors: [{ name: "Green Flowers" }],
  creator: "Green Flowers",
  publisher: "Green Flowers",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["en_US", "kk_KZ"],
    url: "https://greenflowers.kz",
    siteName: "Green Flowers",
    title: "Green Flowers — Оптовые цветы из Китая",
    description: "Прямые поставки свежих цветов с плантаций Китая без посредников. WhatsApp: +7 708 235 4533",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Green Flowers — Оптовые цветы из Китая",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Flowers — Оптовые цветы из Китая",
    description: "Прямые поставки свежих цветов с плантаций Китая без посредников",
  },
  generator: "v0.app",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#568a56",
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <AuthProvider>
          <CartProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
