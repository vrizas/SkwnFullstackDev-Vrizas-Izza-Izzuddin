# SkwnFullstackDev-Vrizas-Izza-Izzuddin

> **Note**
> Physical Data Model (PDM) & Activity Diagram sudah ada di folder masing-masing. Untuk log aplikasi dapat diakses di path /logs ([http://localhost:8000/logs](http://localhost:8000/logs)) pada aplikasi backend.

## Daftar Informasi
### Vehicle Booking API (Backend)
| Database Version | PHP Version | Framework |
| --- | --- | --- |
| 8.0.30 - MySQL Community Server - GPL | 8.1.10 | Laravel 9 |

### Vehicle Booking App (Frontend)
#### Daftar User
| Username | Password | Role |
| --- | --- | --- |
| admin | password123 | admin |
| manajer | password123 | manager |
| direktur | password123 | director |

#### Informasi Lain
| Framework | Library |
| --- | --- |
| Next JS | Material UI (MUI) |

## Panduan Instalasi
Clone repository ini terlebih dahulu.
### Vehicle Booking API (Backend)
1. Buka folder vehicle-booking-api menggunakan Code Editor
2. Jalankan pada terminal
```terminal
composer install
```
3. Jalankan pada terminal
```terminal
cp .env.example .env
```
4. Sesuaikan konfigurasi database dan lainnya pada file .env
5. Jalankan pada terminal
```terminal
php artisan key:generate
```
6. Import database vehicle-booking.sql
7. Jalankan pada terminal
```terminal
php artisan migrate:fresh --seed
```
8. Terakhir untuk menjalankan aplikasi, jalankan pada terminal
```terminal
php artisan serve --port=8000
```

### Vehicle Booking App (Frontend)
Aplikasi frontend bisa diakses melalui laman [http://localhost:8000/logs](http://localhost:8000/logs)
Untuk instalasi:
1. Buka folder vehicle-booking-app menggunakan Code Editor
2. Jalankan pada terminal
```terminal
npm install
```
3. Terakhir untuk menjalankan aplikasi, jalankan pada terminal
```terminal
npm run dev
```
