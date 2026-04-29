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
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
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
          <div
            id="print-area"
            className="mt-10 w-full p-8 bg-white border shadow-sm rounded-lg text-black"
          >
            {/* Header Surat */}
            <div className="text-center border-b-2 border-double border-black pb-4 mb-6">
              {/* <img src="logo_provinsi.png" className="w-20 h-20"></img>  */}
              <h2 className="text-xl uppercase">
                Pemerintah Provinsi Gorontalo
              </h2>
              <h2 className="text-xl font-bold uppercase">
                Dinas Pendidikan dan Kebudayaan
              </h2>
              <h1 className="text-xl font-bold uppercase">
                SMA Negeri 2 Gorontalo
              </h1>
              <p className="text-xs italic text-zinc-600">
                Alamat: Jl. Drs. Achmad Nadjamudin, Kelurahan Limba U2, Kec.
                Kota Selatan, Posel smknduagorontalo@gmail.com
              </p>
            </div>
            {/* Isi Surat */}
            <div className="space-y-4">
              <h3 className="text-center font-bold underline mb-6">
                SURAT KETERANGAN LULUS
              </h3>

              <p className="text-sm leading-relaxed mt-4">
                Berdasarkan hasil rapat dewan guru dan staff tata usaha serta
                surat keputusan kepala SMK Negeri 2 Gorontalo NO.
                2.../SMKN2GTO-KURIKULUM-V-2026 tentang penetapan kelulusan
                peserta didik tahun pelajaran 2025/2026 dengan ini menerangkan;
                <span className="font-bold"> {hasil.status} </span>
                dari satuan pendidikan.
              </p>

              <div className="grid grid-cols-[120px_10px_1fr] text-sm gap-y-2">
                <span className="font-semibold">Nama</span>
                <span>:</span>
                <span className="">{hasil.nama}</span>

                <span className="font-semibold">NIPD</span>
                <span>:</span>
                <span>{hasil.nipd}</span>

                <span className="font-semibold">NISN</span>
                <span>:</span>
                <span>{hasil.nisn}</span>

                <span className="font-semibold">Konsentrasi keahlian</span>
                <span>:</span>
                <span>{hasil.keahlian}</span>

                <span className="font-semibold">Dinyatakan</span>
                <span>:</span>
                <span className="font-bold underline">{hasil.keterangan}</span>
              </div>

              <p className="text-sm leading-relaxed mt-4">
                Demikian surat ini dibuat semoga adik-adik alumni 2026 dapat
                bekerja melanjutkan/mandiri dan berwirausaha
                <span className="font-bold"> {hasil.status} </span>
                dari satuan pendidikan.
              </p>
            </div>

            {/* Tanda Tangan (Opsional) */}
            <div className="mt-12 flex justify-end text-sm">
              <div className="text-center">
                <p>
                  Gorontalo,{" "}
                  {new Date().toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="mb-16">Drs. Jakub A. Gue,</p>
                <p className="font-bold underline text-zinc-300">
                  (Tanda Tangan & Stempel)
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
