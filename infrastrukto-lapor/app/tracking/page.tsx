'use client';

import { useState } from 'react';
import { Search, CheckCircle, Clock, AlertCircle, MapPin, Calendar, FileText } from 'lucide-react';

interface Report {
  ticket: string;
  category: string;
  location: string;
  description: string;
  status: string;
  date: string;
  image: string;
}

export default function TrackingPage() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Report | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const reports: Report[] = JSON.parse(localStorage.getItem('warga_reports') || '[]');
    const found = reports.find((r) => r.ticket.toLowerCase() === query.trim().toLowerCase());
    setResult(found || null);
    setSearched(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Tracking Sistem</span>
        <h1 className="text-2xl font-extrabold text-slate-900">Lacak Status Tiket</h1>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">Masukkan nomor tiket pengaduan untuk memantau progres perbaikan.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        <input
          type="text"
          required
          placeholder="CONTOH: WL-9921"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-blue-700 transition flex items-center gap-1.5">
          <Search className="w-4 h-4" /> Cari
        </button>
      </form>

      {searched && (
        <div>
          {result ? (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-sm">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{result.category}</span>
                  <h2 className="text-base font-extrabold text-slate-900">{result.location}</h2>
                </div>
                <span className="bg-slate-100 text-slate-800 text-xs font-mono px-3 py-1 rounded-lg font-bold border border-slate-200">
                  {result.ticket}
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex items-center gap-3">
                {result.status === 'Selesai' ? (
                  <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                ) : (
                  <Clock className="w-6 h-6 text-amber-600 shrink-0" />
                )}
                <div>
                  <span className="text-xs text-slate-400 font-semibold block uppercase">Status Saat Ini</span>
                  <span className={`font-bold text-base ${result.status === 'Selesai' ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {result.status}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <p className="text-slate-400 font-semibold uppercase">Deskripsi Laporan</p>
                <p className="text-slate-700 font-medium">{result.description}</p>
                <p className="text-slate-400 text-[11px] pt-2">Tanggal: {result.date}</p>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center space-y-2">
              <AlertCircle className="w-6 h-6 text-amber-600 mx-auto" />
              <h3 className="font-bold text-amber-900 text-sm">Tiket Tidak Ditemukan</h3>
              <p className="text-xs text-amber-700">Periksa kembali nomor tiket yang Anda masukkan.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}