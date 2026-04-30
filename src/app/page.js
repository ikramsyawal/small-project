"use client";
import { useState } from "react";

export default function Home() {
  const [nisn, setNisn] = useState("");
  const [hasil, setHasil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cekKelulusan = async () => {
    if (!nisn) return alert("Isi NISN dulu ya!");

    setLoading(true);
    setError("");
    setHasil(null);

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nisn }),
      });

      const res = await response.json();

      if (response.ok) {
        setHasil(res);
      } else {
        setError(res.message || "Data tidak ditemukan.");
      }
    } catch (err) {
      setError("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* HEADER */}
      <header className="w-full bg-white border-b border-zinc-200 py-4 px-6 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo_sekolah.png"
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="font-bold text-zinc-900 leading-none text-sm sm:text-base">
                SMK NEGERI 2 GORONTALO
              </h1>
              <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">
                Sistem Informasi Kelulusan
              </p>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="text-xs bg-zinc-200 px-3 py-1 rounded-full font-medium">
              TP. 2025/2026
            </span>
          </div>
        </div>
      </header>
      <main
        id="print-area"
        className="flex flex-1 w-full max-w-5xl flex-col items-center pt-6 px-16 bg-white dark:bg-black sm:items-start"
      >
        <h1 className="text-2xl font-bold mb-2">Cek Kelulusan</h1>
        <p className="text-zinc-500 text-sm mb-6">
          Masukkan NISN untuk melihat hasil kelulusan.
        </p>

        <div className="w-full">
          <label className="label text-xs font-semibold uppercase text-zinc-400">
            Nomor Induk Siswa Nasional
          </label>
          <input
            type="text"
            className="input input-bordered w-full mb-4 bg-zinc-50 dark:bg-zinc-800"
            placeholder="Contoh: 006123456"
            value={nisn}
            onChange={(e) => setNisn(e.target.value)}
          />
          <button
            onClick={cekKelulusan}
            disabled={loading}
            className={`btn btn-neutral w-full ${loading ? "loading" : ""}`}
          >
            {loading ? "Mengecek..." : "Lihat Hasil"}
          </button>
        </div>

        {/* AREA HASIL */}
        {error && (
          <div className="mt-6 p-4 w-full bg-red-50 text-red-600 rounded-lg text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        {/* {hasil && (
          <div className="mt-8 p-6 w-full border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-center">
            <h2 className="text-lg font-bold">{hasil.nama}</h2>
            <p className="text-sm text-zinc-500 mb-4">{hasil.nisn}</p>

            <div
              className={`py-2 px-4 rounded-full font-bold inline-block ${
                hasil.status === "LULUS"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {hasil.keterangan}
            </div>

            {hasil.keterangan === "LULUS" && (
              <button
                onClick={() => window.print()}
                className="btn btn-outline btn-sm w-full mt-6"
              >
                Cetak Surat
              </button>
            )}
          </div>
        )} */}
        {hasil && (
          <div className="w-full overflow-x-auto pb-10 custom-scrollbar mt-8">
            <div
              id="print-area"
              className="min-w-[800px] max-w-[800px] mx-auto p-16 bg-white text-black shadow-2xl rounded-sm border border-zinc-200 min-h-[1000px]"
            >
              {/* KOP SURAT - Dibuat statis ukurannya agar tidak mengecil */}
              <div className="flex items-center border-b-4 border-black pb-2 mb-6 gap-4">
                <img
                  src="/logo_provinsi.png"
                  className="w-20 h-20 object-contain"
                  alt="Logo"
                />
                <div className="text-center flex-1">
                  <h2 className="text-lg uppercase leading-tight">
                    Pemerintah Provinsi Gorontalo
                  </h2>
                  <h1 className="text-xl uppercase leading-tight">
                    Dinas Pendidikan dan Kebudayaan
                  </h1>
                  <h1 className="text-2xl font-black uppercase leading-tight">
                    SMK Negeri 2 Gorontalo
                  </h1>
                  <p className="text-xs italic leading-tight">
                    Jl. Drs. Achmad Nadjamudin, Kelurahan Limba U2, Kec. Kota
                    Selatan, Posel smknduagorontalo@gmail.com
                  </p>
                </div>
                <img
                  src="/logo_sekolah.png"
                  className="w-20 h-20 object-contain"
                  alt="Logo"
                />
              </div>

              <div className="">
                <h3 className="text-center font-bold underline text-base">
                  PENGUMUMAN KELULUSAN
                </h3>
                <h3 className="text-center font-bold underline mb-6 text-base">
                  TAHUN PELAJARAN 2025/2026
                </h3>

                <p className="text-base leading-relaxed text-justify">
                  Berdasarkan surat keputusan kepala SMK Negeri 2 Gorontalo
                  Nomor:{" "}
                  <span className="font-mono">318/SMKN2GTO-KUR/V/2026</span>{" "}
                  tentang penetapan kelulusan peserta didik kelas 12 tahun
                  pelajaran 2025/2026, dengan ini menerangkan kepada:
                </p>

                {/* GRID DATA SISWA - Menggunakan lebar tetap agar titik dua sejajar sempurna */}
                <div className="grid grid-cols-[200px_10px_1fr] text-base gap-y-3 my-8">
                  <span className="font-semibold">Nama</span>
                  <span>:</span>
                  <span className="font-bold uppercase">{hasil.nama}</span>

                  <span className="font-semibold">NIPD</span>
                  <span>:</span>
                  <span>{hasil.nipd}</span>

                  <span className="font-semibold">NISN</span>
                  <span>:</span>
                  <span>{hasil.nisn}</span>

                  <span className="font-semibold">Konsentrasi Keahlian</span>
                  <span>:</span>
                  <span>{hasil.keahlian}</span>
                </div>
                <div className="w-full text-center mb-4">
                  <p className="font-semibold">Dinyatakan</p>
                  <span
                    className={`font-black underline text-lg ${hasil.keterangan === "LULUS" ? "text-green-700" : "text-red-600"}`}
                  >
                    {hasil.keterangan}
                  </span>
                </div>

                <p className="text-base leading-relaxed text-justify">
                  Selamat atas kelulusan anda semoga kelulusan ini menjadi
                  langkah awal menuju dunia kerja, wirausaha, atau pendidikan
                  yang lebih tinggi.
                </p>
              </div>

              {/* TANDA TANGAN */}
              <div className="mt-16 flex justify-end text-base">
                <div className="text-center w-72">
                  <p>Gorontalo, 4 Mei 2026</p>
                  <p className="font-semibold">Kepala Sekolah,</p>

                  <div className="flex justify-center my-4">
                    <img
                      src="/kepsek_ttd.png"
                      className="h-28 object-contain"
                      alt="Tanda Tangan"
                    />
                  </div>

                  <p className="font-bold underline uppercase">
                    Drs. Jakub A. GuE
                  </p>
                  <p className="text-sm">NIP. 196706081994121002</p>
                </div>
              </div>
            </div>
            {/* Tombol Cetak (Di luar print-area agar mudah dikelola, atau beri class btn-print) */}
            <button
              onClick={() => window.print()}
              className="btn btn-primary mt-6 px-10 btn-print w-full"
            >
              Cetak ke PDF / Printer
            </button>
          </div>
        )}
      </main>
      {/* FOOTER */}
      <footer className="w-full bg-white border-t border-zinc-200 py-8 px-6 mt-auto">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-zinc-600 font-medium">
            © 2026 SMK Negeri 2 Gorontalo. All Rights Reserved.
          </p>
          <div className="flex justify-center gap-4 mt-3">
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest">
              Dikembangkan oleh Tim IT SMKN 2 Gorontalo
            </p>
          </div>
          <div className="mt-6 pt-6 border-t border-zinc-100">
            <p className="text-[11px] text-black-400 italic leading-relaxed">
              *Jika terdapat kendala atau data tidak ditemukan, silakan hubungi
              bagian Kurikulum atau Wali Kelas masing-masing.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
