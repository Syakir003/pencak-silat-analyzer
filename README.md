# 🥋 AI Pencak Silat Analyzer - Gemini 2.5 Flash Edition

Aplikasi analisis performa atlet Pencak Silat berbasis Artificial Intelligence. Menggunakan **Gemini 2.5 Flash** untuk melakukan klasifikasi kategori (Fighter/Seni) dan analisis teknik secara otomatis melalui data fisik maupun rekaman video.

---

## ✨ Fitur Utama
* **Athlete Profile Analysis**: Menentukan kategori atlet (Tanding/Seni) berdasarkan profil fisik (TB/BB) menggunakan AI.
* **Video Performance Analysis**: Mendeteksi jumlah pukulan, tendangan, serta identifikasi teknik silat dari input video.
* **Automated Training Plan**: Memberikan rekomendasi jadwal latihan power dan nutrisi yang dipersonalisasi.
* **Professional Indonesia Language**: Output analisis disajikan dalam Bahasa Indonesia yang baku dan elegan.
* **Cloud Integration**: Terintegrasi dengan Google Apps Script sebagai backend bridge.

## 🚀 Tech Stack
* **Frontend**: React.js + Vite (TypeScript)
* **Styling**: Tailwind CSS (Elegant Dark/Gold Theme)
* **AI Engine**: Google Gemini 2.5 Flash API
* **Backend Proxy**: Google Apps Script (GAS)
* **Deployment**: Netlify

## 🛠️ Cara Instalasi (Local Development)

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/Syakir003/pencak-silat-analyzer.git](https://github.com/username/pencak-silat-analyzer.git)
    cd pencak-silat-analyzer
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Konfigurasi Environment Variable**
    Buat file `.env` di root folder dan masukkan:
    ```env
    VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
    VITE_GAS_URL=YOUR_GAS_DEPLOYMENT_URL_HERE
    ```

4.  **Running Project**
    ```bash
    npm run dev
    ```

## 🌐 Deployment (Netlify)
Proyek ini telah dikonfigurasi untuk deployment otomatis via Netlify.
1.  Jalankan `npm run build` untuk memproduksi folder `dist`.
2.  Pastikan **Environment Variables** sudah diatur di Dashboard Netlify (Site Settings > Environment Variables) agar API tetap berjalan aman.

## 🛡️ Keamanan & Optimasi
* **Prompt Shielding**: Menggunakan instruksi sistem yang kaku untuk mencegah *Prompt Injection*.
* **Secure API Handling**: Menggunakan Google Apps Script sebagai perantara guna menyembunyikan logika backend utama.
* **Payload Validation**: Validasi ukuran file video di sisi client untuk menjaga stabilitas performa.

---
**Developed by Syakir003.**
