'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, CheckCircle2, Image as ImageIcon, MapPin, FileText, ArrowLeft, Navigation, Camera, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

export default function LaporPage() {
  const router = useRouter();
  const [category, setCategory] = useState('Jalan Rusak');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  
  // State untuk metode input gambar ('upload' atau 'url')
  const [imageMethod, setImageMethod] = useState<'upload' | 'url'>('upload');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80');
  
  const [successTicket, setSuccessTicket] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  // Fungsi Deteksi Lokasi Otomatis (GPS)
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Browser Anda tidak mendukung fitur Geolocation.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(5);
        const lng = position.coords.longitude.toFixed(5);
        setLocation(`Koordinat GPS: [${lat}, ${lng}] (Lokasi Terdeteksi Otomatis)`);
        setIsLocating(false);
      },
      (error) => {
        alert('Gagal mendeteksi lokasi. Pastikan izin GPS di browser Anda diaktifkan.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true }
    );
  };

  // Fungsi Konversi File Gambar/Kamera ke Base64 (Frontend-Only Storage)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result); // Simpan hasil Base64 ke state gambar
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomTicket = 'WL-' + Math.floor(1000 + Math.random() * 9000);
    
    const newReport = {
      id: Date.now().toString(),
      ticket: randomTicket,
      category,
      location,
      description,
      status: 'Diterima',
      date: new Date().toISOString().split('T')[0],
      image: image || 'https://images.unsplash.com/photo-1584467735811-62862dffc165?auto=format&fit=crop&w=600&q=80',
    };

    const existing = JSON.parse(localStorage.getItem('warga_reports') || '[]');
    localStorage.setItem('warga_reports', JSON.stringify([newReport, ...existing]));

    setSuccessTicket(randomTicket);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Form Pengaduan</span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">Laporkan Kerusakan</h1>
          <p className="text-xs text-slate-500 mt-1">Lengkapi data laporan dengan deteksi lokasi GPS dan bukti foto.</p>
        </div>

        {successTicket ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h2 className="text-base font-bold text-emerald-900">Laporan Berhasil Dikirim!</h2>
            <p className="text-xs text-emerald-700">Simpan nomor tiket unik Anda untuk melacak status perbaikan:</p>
            <div className="bg-white py-2 px-4 rounded-lg inline-block font-mono text-xl font-black text-blue-600 border border-emerald-300 shadow-sm">
              {successTicket}
            </div>
            <div>
              <button
                onClick={() => router.push('/tracking')}
                className="mt-2 bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
              >
                Lacak Status Tiket
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-sm">
            
            {/* Kategori */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kategori Kerusakan</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-3 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              >
                <option value="Jalan Rusak">Jalan Rusak / Berlubang</option>
                <option value="Lampu PJU Mati">Lampu Penerangan Jalan (PJU) Mati</option>
                <option value="Jembatan Retak">Jembatan Retak / Rusak</option>
                <option value="Saluran Air Mampet">Saluran Air / Drainase Mampet</option>
              </select>
            </div>

            {/* Lokasi + GPS Otomatis */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">Lokasi / Titik Koordinat</label>
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={isLocating}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  {isLocating ? 'Mendeteksi...' : '📍 Deteksi Lokasi GPS'}
                </button>
              </div>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Klik 'Deteksi Lokasi GPS' atau ketik manual..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-3.5 py-3 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium text-xs font-mono"
                />
              </div>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Deskripsi Kerusakan</label>
              <div className="relative">
                <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <textarea
                  required
                  rows={3}
                  placeholder="Jelaskan kondisi kerusakan secara detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-3.5 py-3 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                />
              </div>
            </div>

            {/* 2 Opsi Foto: Upload Langsung/Kamera atau URL */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-slate-700 uppercase">Bukti Foto Kerusakan</label>
                <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setImageMethod('upload')}
                    className={`px-3 py-1 rounded-md transition ${imageMethod === 'upload' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}`}
                  >
                    📁 Upload / Kamera
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageMethod('url')}
                    className={`px-3 py-1 rounded-md transition ${imageMethod === 'url' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}`}
                  >
                    🔗 Pakai URL
                  </button>
                </div>
              </div>

              {imageMethod === 'upload' ? (
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-5 text-center bg-slate-50/50 hover:bg-slate-50 transition">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-400 mt-2">Bisa langsung buka kamera HP (jika di smartphone) atau pilih dari galeri.</p>
                </div>
              ) : (
                <div className="relative">
                  <LinkIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full border border-slate-300 rounded-xl pl-10 pr-3.5 py-3 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono text-xs"
                  />
                </div>
              )}

              {/* Preview Gambar */}
              {image && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3 mt-2">
                  <img src={image} alt="Preview Bukti" className="w-14 h-14 rounded-lg object-cover border shadow-sm" />
                  <div>
                    <p className="text-xs font-bold text-slate-700">Preview Foto Terpilih</p>
                    <p className="text-[10px] text-slate-400">Foto siap dilampirkan ke laporan.</p>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-600/20 transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Kirim Pengaduan Warga
            </button>
          </form>
        )}
      </div>
    </div>
  );
}