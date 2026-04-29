import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    // 1. Ambil NISN dari body request frontend
    const { nisn } = await request.json();

    // 2. Tentukan lokasi file JSON (Root/data/siswa.json)
    // process.cwd() akan mengarah ke root project kamu
    const filePath = path.join(process.cwd(), "data", "data_siswa.json");

    // 3. Baca filenya
    const jsonData = fs.readFileSync(filePath, "utf8");
    const dataSiswa = JSON.parse(jsonData);

    // 4. Cari data siswa berdasarkan NISN
    const siswa = dataSiswa.find((item) => item.nisn === nisn);

    if (siswa) {
      return NextResponse.json(siswa, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "NISN tidak ditemukan, silakan hubungi wali kelas." },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Error reading JSON:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 },
    );
  }
}
