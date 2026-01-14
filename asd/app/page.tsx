"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Benefits } from "@/components/benefits"
import { Categories } from "@/components/categories"
import { Catalog } from "@/components/catalog"
import { AboutSection } from "@/components/about-section"
import { FAQ } from "@/components/faq"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { useLanguageContext } from "@/contexts/language-context"
import { getTranslation } from "@/lib/i18n"
import Image from "next/image"

export default function Home() {
  const { language, isClient } = useLanguageContext()

  if (!isClient) return null

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />

      <AboutSection />

      <Benefits />
      <Categories />
      <Catalog />

      {/* Delivery Info Section */}
      <section id="delivery" className="py-20 px-4 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#568a56] mb-4">
              {getTranslation(language, "deliveryTitle")}
            </h2>
            <div className="h-1 w-20 bg-[#568a56] mx-auto"></div>
          </div>
          <div className="bg-white border border-green-100 rounded-2xl p-8 shadow-sm">
            <p className="text-gray-700 mb-8 leading-relaxed text-lg text-center">
              {getTranslation(language, "deliveryDesc")}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {["deliveryPoint1", "deliveryPoint2", "deliveryPoint3", "deliveryPoint4"].map((key, i) => (
                <div key={i} className="flex items-start gap-3 bg-green-50 p-4 rounded-xl">
                  <svg
                    className="w-6 h-6 text-[#568a56] flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{getTranslation(language, key)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-[#568a56]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{getTranslation(language, "contactTitle")}</h2>
          <p className="text-green-100 mb-8 text-lg">{getTranslation(language, "contactVia")}</p>
          <p className="text-white text-2xl font-bold mb-10">+7 708 235 4533</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <WhatsAppButton variant="primary" className="!bg-white !text-[#568a56] hover:!bg-green-50" />
            <a
              href="mailto:info@greenflowers.kz"
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-[#568a56] transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {getTranslation(language, "email")}
            </a>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton variant="floating" />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Green Flowers"
                width={40}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
              <span className="font-bold text-lg">Green Flowers</span>
            </div>
            <p className="text-gray-400 text-sm text-center">{getTranslation(language, "footerText")}</p>
            <p className="text-gray-500 text-sm">+7 708 235 4533</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
