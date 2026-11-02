'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle2, Clock, MapPin, ArrowRight, PlusCircle, ShieldCheck, Activity } from 'lucide-react';

interface Report {
  id: string;
  ticket: string;
  category: string;
  location: string;
  description: string;
  status: string;
  date: string;
  image: string;
}

export default function Home() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('warga_reports');
    if (saved) {
      setReports(JSON.parse(saved));
    } else {
      const initialReports: Report[] = [
        {
          id: '1',
          ticket: 'WL-9921',
          category: 'Jalan Rusak',
          location: 'Jl. Soekarno Hatta No. 45',
          description: 'Lubang besar berdiameter 50cm membahayakan pengendara motor di malam hari.',
          status: 'Dalam Proses',
          date: '2026-10-15',
          image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
        },
        {
          id: '2',
          ticket: 'WL-8842',
          category: 'Lampu PJU Mati',
          location: 'Jl. Merjosari Indah',
          description: 'Lampu penerangan jalan mati total sudah 3 hari, rawan kriminalitas.',
          status: 'Selesai',
          date: '2026-10-14',
          image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f86f8?auto=format&fit=crop&w=600&q=80',
        },
        {
          id: '3',
          ticket: 'WL-7719',
          category: 'Saluran Air Mampet',
          location: 'Jl. Dieng Atas No. 12',
          description: 'Drainase tersumbat sampah plastik, menyebabkan genangan saat hujan.',
          status: 'Diterima',
          date: '2026-10-16',
          image: 'https://images.unsplash.com/photo-1584467735811-62862dffc165?auto=format&fit=crop&w=600&q=80',
        },
      ];
      localStorage.setItem('warga_reports', JSON.stringify(initialReports));
      setReports(initialReports);
    }
  }, []);

  const totalReports = reports.length;
  const processedReports = reports.filter(r => r.status === 'Dalam Proses' || r.status === 'Diterima').length;
  const finishedReports = reports.filter(r => r.status === 'Selesai').length;

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-20 px-4 text-center rounded-b-[2.5rem] shadow-lg">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-blue-100 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Platform Pengaduan & Transparansi Publik
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Suarakan Infrastruktur Rusak, Wujudkan Perubahan Nyata
          </h1>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto font-normal">
            Laporkan fasilitas umum yang rusak di sekitar Anda. Pantau progres perbaikannya secara transparan dan real-time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link href="/lapor" className="bg-white text-blue-600 font-bold px-6 py-3.5 rounded-xl shadow-md hover:bg-blue-50 transition flex items-center justify-center gap-2 text-sm">
              <PlusCircle className="w-4 h-4" /> Buat Laporan Baru
            </Link>
            <Link href="/tracking" className="bg-blue-800/60 border border-blue-400/40 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-blue-800 transition flex items-center justify-center gap-2 text-sm">
              Cek Tiket Laporan <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Statistik Cepat */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl"><AlertTriangle className="w-6 h-6" /></div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Laporan</p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">{totalReports}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-amber-50 text-amber-600 rounded-xl"><Clock className="w-6 h-6" /></div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Dalam Proses</p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">{processedReports}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Selesai Diperbaiki</p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">{finishedReports}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Peta Sebaran Interaktif Mockup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="text-blue-600 w-5 h-5" /> Peta Sebaran Titik Kerusakan
              </h2>
              <p className="text-xs text-slate-500">Visualisasi titik lokasi pengaduan warga.</p>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live GIS
            </span>
          </div>

          <div className="w-full h-72 bg-slate-100 rounded-xl border border-dashed border-slate-300 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="flex flex-wrap justify-center gap-3 z-10 p-4">
              {reports.map((r, idx) => (
                <div key={idx} className="bg-white px-3 py-2 rounded-xl shadow-sm border border-slate-200 text-xs font-medium flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span className="font-bold text-slate-800">{r.location}</span>
                  <span className="text-slate-400">({r.category})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feed Laporan Terbaru */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Laporan Terbaru Warga</h2>
            <p className="text-xs text-slate-500">Daftar pengaduan yang baru masuk ke sistem.</p>
          </div>
          <Link href="/lapor" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
            Buat Laporan <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
              <div className="relative h-48 bg-slate-100">
                <img src={report.image} alt={report.category} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-bold bg-white/90 backdrop-blur-sm text-slate-900 px-2.5 py-1 rounded-lg shadow-sm">
                    {report.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`text-[11px] px-2.5 py-1 rounded-lg font-bold shadow-sm ${
                    report.status === 'Selesai' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    {report.status}
                  </span>
                </div>
              </div>
              <div className="p-5 flex-grow space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" /> {report.location}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{report.description}</p>
              </div>
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                <span>Tiket: <strong className="font-mono text-slate-800">{report.ticket}</strong></span>
                <span>{report.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}