'use client';

import './globals.css';
import Link from 'next/link';
import { useState } from 'react';
import { ShieldAlert, Home, FileText, Search, UserCheck, Menu, X, ArrowUpRight } from 'lucide-react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="id">
      <head>
        <title>WargaLapor — Platform Pengaduan Infrastruktur Publik</title>
        <meta name="description" content="Transparansi Publik dan Aksi Cepat Tanggap Infrastruktur Warga" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-['Plus_Jakarta_Sans',sans-serif] antialiased selection:bg-blue-600 selection:text-white">
        
        {/* Navbar Modern Glassmorphism */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-slate-900">Warga<span className="text-blue-600">Lapor</span></span>
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest">Public Portal</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 font-medium text-sm">
              <Link href="/" className="px-4 py-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-100/60 transition flex items-center gap-2">
                <Home className="w-4 h-4" /> Beranda
              </Link>
              <Link href="/lapor" className="px-4 py-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-100/60 transition flex items-center gap-2">
                <FileText className="w-4 h-4" /> Buat Laporan
              </Link>
              <Link href="/tracking" className="px-4 py-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-100/60 transition flex items-center gap-2">
                <Search className="w-4 h-4" /> Lacak Tiket
              </Link>
              <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>
              <Link href="/admin" className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 shadow-sm transition-all hover:scale-105">
                <UserCheck className="w-4 h-4" /> Dashboard Admin
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl py-5 px-6 space-y-2">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                <Home className="w-4 h-4 text-blue-600" /> Beranda
              </Link>
              <Link href="/lapor" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                <FileText className="w-4 h-4 text-blue-600" /> Buat Laporan
              </Link>
              <Link href="/tracking" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                <Search className="w-4 h-4 text-blue-600" /> Lacak Tiket
              </Link>
              <Link href="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 text-white font-medium shadow-sm">
                <UserCheck className="w-4 h-4" /> Dashboard Admin
              </Link>
            </div>
          )}
        </header>

        {/* Konten Utama */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200/60 py-8 text-center text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4 space-y-1">
            <p className="font-semibold text-slate-600">WargaLapor Platform — Web In Action (WIA) 2026</p>
            <p>Membangun transparansi infrastruktur publik yang cepat, akurat, dan terpercaya.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}