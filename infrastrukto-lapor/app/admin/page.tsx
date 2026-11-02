'use client';

import { useState, useEffect } from 'react';
import { UserCheck, CheckCircle, Clock, ShieldAlert, AlertTriangle, Layers } from 'lucide-react';

interface Report {
  id: string;
  ticket: string;
  category: string;
  location: string;
  description: string;
  status: string;
  date: string;
}

export default function AdminPage() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('warga_reports');
    if (saved) setReports(JSON.parse(saved));
  }, []);

  const updateStatus = (id: string, newStatus: string) => {
    const updated = reports.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
    setReports(updated);
    localStorage.setItem('warga_reports', JSON.stringify(updated));
  };

  const total = reports.length;
  const inProgress = reports.filter(r => r.status === 'Dalam Proses' || r.status === 'Diterima').length;
  const completed = reports.filter(r => r.status === 'Selesai').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Dashboard */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider mb-2">
            <ShieldAlert className="w-3 h-3 text-blue-400" /> Admin Enterprise Panel
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">Dashboard Manajemen Dinas</h1>
          <p className="text-xs text-slate-500 mt-0.5">Kelola dan perbarui status laporan infrastruktur publik secara terpusat.</p>
        </div>
        <div className="text-xs bg-blue-50 text-blue-700 font-bold px-3.5 py-2 rounded-xl border border-blue-200">
          Total Laporan Aktif: {total}
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Masuk</p>
            <h4 className="text-2xl font-black text-slate-900 mt-1">{total}</h4>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Layers className="w-5 h-5" /></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dalam Penanganan</p>
            <h4 className="text-2xl font-black text-slate-900 mt-1">{inProgress}</h4>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock className="w-5 h-5" /></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Selesai Diperbaiki</p>
            <h4 className="text-2xl font-black text-slate-900 mt-1">{completed}</h4>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle className="w-5 h-5" /></div>
        </div>
      </div>

      {/* Tabel Data Manajemen */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-sm">Daftar Pengaduan Masuk</h3>
          <span className="text-xs text-slate-400">Update status secara instan</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4">Tiket & Kategori</th>
                <th className="p-4">Lokasi & Deskripsi</th>
                <th className="p-4">Tanggal</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Tindakan Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-4">
                    <span className="font-mono font-bold text-blue-600 text-sm block">{report.ticket}</span>
                    <span className="text-slate-400">{report.category}</span>
                  </td>
                  <td className="p-4 max-w-xs">
                    <p className="font-bold text-slate-800">{report.location}</p>
                    <p className="text-slate-400 truncate mt-0.5">{report.description}</p>
                  </td>
                  <td className="p-4 text-slate-500">{report.date}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                      report.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {report.status === 'Selesai' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {report.status}
                    </span>
                  </td>
                  <td className="p-4 text-center space-x-1.5">
                    <button
                      onClick={() => updateStatus(report.id, 'Dalam Proses')}
                      className="px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs font-bold hover:bg-amber-100 transition shadow-sm"
                    >
                      Proses
                    </button>
                    <button
                      onClick={() => updateStatus(report.id, 'Selesai')}
                      className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold hover:bg-emerald-100 transition shadow-sm"
                    >
                      Selesai
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}