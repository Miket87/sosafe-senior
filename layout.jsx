import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { EvaluacionProvider } from "@/context/EvaluacionContext";

export const metadata: Metadata = {
  title: "SoSafe Senior - Prototipo",
  description:
    "Prototipo SoSafe Senior para evaluación de seguridad domiciliaria en adultos mayores.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <EvaluacionProvider>
          <header className="border-b bg-white">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
              <Link href="/" className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight">
                  SoSafe Senior
                </span>
                <span className="text-xs uppercase tracking-widest text-slate-500">
                  Prototipo
                </span>
              </Link>
              <div className="flex gap-4 text-sm">
                <Link href="/diagnostico" className="hover:text-sky-700">
                  Diagnóstico
                </Link>
                <Link href="/checklist" className="hover:text-sky-700">
                  Checklist
                </Link>
                <Link href="/plan" className="hover:text-sky-700">
                  Plan Senior Ready
                </Link>
                <Link href="/kits" className="hover:text-sky-700">
                  Kits
                </Link>
                <Link href="/dashboard" className="hover:text-sky-700">
                  Dashboard
                </Link>
              </div>
            </nav>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t bg-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <span>© {new Date().getFullYear()} SoSafe Senior · Prototipo</span>
              <span>Evaluación domiciliaria · Prevención de caídas</span>
            </div>
          </footer>
        </EvaluacionProvider>
      </body>
    </html>
  );
}

