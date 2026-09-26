# Lumiere — Project Blueprint

## 1. Gambaran Project

Lumiere adalah portal digital dengan dua layanan utama:

1. Undangan Digital
2. Sewa Fotografer

Target pengguna:
- Mahasiswa
- Pernikahan

Target undangan dan fotografer dipisahkan karena masing-masing memiliki kategori dan kebutuhan yang berbeda.

---

## 2. Layanan Utama

### 2.1 Undangan Digital

Model layanan:

- Berbayar
- Template bersifat premium
- Pengguna memilih template
- Pengguna mengisi form
- Sistem langsung menghasilkan undangan digital
- Pengguna mendapatkan URL khusus
- Pengguna dapat mengedit isi undangan setelah dibuat
- Pembayaran dilakukan melalui website

Flow:

```text
Pilih Kategori
      ↓
Pilih Template Premium
      ↓
Isi Form
      ↓
Preview
      ↓
Pembayaran
      ↓
Undangan Aktif
      ↓
URL Khusus
```

Kategori:

```text
Undangan Digital
├── Mahasiswa
└── Pernikahan
```

Contoh URL:

```text
lumiere.id/invitation/nama-undangan
```

---

### 2.2 Fotografer

Fotografer berasal dari tim Lumiere dan dikelola oleh admin.

Pengguna:

- Memilih kategori
- Melihat daftar fotografer
- Melihat profil
- Melihat portfolio
- Melihat informasi layanan
- Menghubungi admin melalui WhatsApp

Tidak ada booking otomatis dan pembayaran fotografer melalui website pada tahap awal.

Flow:

```text
Pilih Kategori
      ↓
Lihat Fotografer
      ↓
Lihat Detail & Portfolio
      ↓
Hubungi Admin
      ↓
WhatsApp
      ↓
Negosiasi
      ↓
Deal
```

Kategori:

```text
Fotografer
├── Mahasiswa
└── Pernikahan
```

---

# 3. Rekomendasi Teknologi

## Backend

- Node.js
- NestJS
- TypeScript
- Prisma ORM
- REST API

## Database

- PostgreSQL

## Authentication

- JWT
- Argon2 atau bcrypt untuk password hashing
- Role: USER dan ADMIN

## Storage

Gunakan object/file storage untuk gambar, misalnya:

- Cloudinary
- Amazon S3
- S3-compatible storage

Database hanya menyimpan URL atau identifier file.

## Payment

Untuk pembayaran undangan:

- Midtrans atau Xendit

Payment gateway digunakan untuk transaksi undangan digital.

## Version Control

- Git
- GitHub

---

# 4. Arsitektur Sistem

```text
                         LUMIERE
                            │
                ┌───────────┴───────────┐
                │                       │
             Frontend                Backend
           Next.js/React             NestJS
                │                       │
                │                  REST API
                │                       │
                └───────────────┬───────┘
                                │
                         PostgreSQL
                                │
                ┌───────────────┼───────────────┐
                │               │               │
             Storage         Payment         Auth
           Cloudinary      Midtrans/Xendit      │
                                            JWT + Hash
```

Arsitektur awal menggunakan **monolith REST API**. Tidak perlu microservices untuk MVP.

---

# 5. Struktur Project

```text
lumiere/
│
├── README.md
│
├── docs/
│   ├── 01-arsitektur.md
│   ├── 02-database.md
│   ├── 03-api.md
│   ├── 04-authentication.md
│   ├── 05-payment.md
│   ├── 06-template-system.md
│   │
│   ├── pages/
│   │   ├── 01-home.md
│   │   ├── 02-undangan.md
│   │   ├── 03-undangan-mahasiswa.md
│   │   ├── 04-undangan-wedding.md
│   │   ├── 05-template.md
│   │   ├── 06-template-detail.md
│   │   ├── 07-undangan-form.md
│   │   ├── 08-undangan-preview.md
│   │   ├── 09-undangan-pembayaran.md
│   │   ├── 10-undangan-saya.md
│   │   ├── 11-undangan-edit.md
│   │   ├── 12-fotografer.md
│   │   ├── 13-fotografer-mahasiswa.md
│   │   ├── 14-fotografer-wedding.md
│   │   ├── 15-fotografer-detail.md
│   │   ├── 16-login.md
│   │   └── 17-register.md
│   │
│   └── admin/
│       ├── 01-dashboard.md
│       ├── 02-template.md
│       ├── 03-undangan.md
│       ├── 04-order.md
│       ├── 05-pembayaran.md
│       ├── 06-fotografer.md
│       ├── 07-portfolio.md
│       └── 08-users.md
│
├── frontend/
│
└── backend/
```

Prinsip utama:

> Setiap halaman memiliki file/component sendiri agar desain dan struktur tidak bercampur dalam satu file besar.

---

# 6. Database

Database utama: **PostgreSQL**

## 6.1 users

Menyimpan akun pengguna dan admin.

```text
id
name
email
password_hash
role
status
created_at
updated_at
```

Role:

```text
USER
ADMIN
```

---

## 6.2 categories

Menyimpan kategori yang digunakan oleh layanan.

```text
id
name
type
status
created_at
updated_at
```

Contoh:

```text
name: Mahasiswa
type: INVITATION

name: Pernikahan
type: INVITATION

name: Mahasiswa
type: PHOTOGRAPHER

name: Pernikahan
type: PHOTOGRAPHER
```

Jika kategori sudah benar-benar tetap, struktur ini nantinya dapat disederhanakan menjadi enum.

---

## 6.3 templates

Menyimpan template undangan premium.

```text
id
category_id
name
slug
description
thumbnail
price
template_data
status
created_at
updated_at
```

Contoh:

```text
name: Elegant Wedding
category: Pernikahan
price: 99000
status: ACTIVE
```

---

## 6.4 invitations

Menyimpan undangan yang dibuat oleh user.

```text
id
user_id
template_id
slug
data
status
created_at
updated_at
```

Status:

```text
DRAFT
PENDING_PAYMENT
ACTIVE
EXPIRED
DISABLED
```

`data` disimpan sebagai JSONB.

Contoh:

```json
{
  "groom": {
    "name": "Mahfud",
    "parents": "..."
  },
  "bride": {
    "name": "Aisyah",
    "parents": "..."
  },
  "event": {
    "date": "2026-12-20",
    "time": "10:00",
    "venue": "Gedung ..."
  },
  "maps_url": "...",
  "gallery": [],
  "story": "...",
  "rsvp": {},
  "gift": {}
}
```

---

## 6.5 orders

Menyimpan pesanan undangan digital.

```text
id
user_id
invitation_id
amount
status
payment_reference
created_at
updated_at
```

Status:

```text
PENDING
PAID
FAILED
EXPIRED
CANCELLED
```

---

## 6.6 payments

Menyimpan transaksi pembayaran.

```text
id
order_id
provider
transaction_id
amount
status
paid_at
raw_response
created_at
updated_at
```

Status:

```text
PENDING
PAID
FAILED
EXPIRED
CANCELLED
```

---

## 6.7 photographers

Menyimpan data fotografer milik tim Lumiere.

```text
id
name
slug
description
location
whatsapp
category_id
starting_price
profile_image
status
created_at
updated_at
```

Admin mengelola seluruh data fotografer.

Tidak diperlukan sistem registrasi fotografer pada MVP.

---

## 6.8 photographer_portfolios

Menyimpan portfolio fotografer.

```text
id
photographer_id
image_url
title
sort_order
created_at
updated_at
```

Relasi:

```text
photographer
      │
      └── photographer_portfolios
```

---

# 7. Relasi Database

```text
USERS
  │
  ├───────────────┐
  │               │
  ▼               ▼
INVITATIONS      ORDERS
  │               │
  ▼               ▼
TEMPLATES       PAYMENTS
  │
  ▼
CATEGORIES


PHOTOGRAPHERS
      │
      ▼
PHOTOGRAPHER_PORTFOLIOS
      │
      ▼
CATEGORIES
```

Relasi utama:

```text
User 1 ──── N Invitation
User 1 ──── N Order
Template 1 ──── N Invitation
Invitation 1 ──── N Order
Order 1 ──── N Payment
Category 1 ──── N Template
Category 1 ──── N Photographer
Photographer 1 ──── N Portfolio
```

---

# 8. Template System

Template tidak dibuat sebagai HTML terpisah yang menyimpan data pengguna.

Konsep:

```text
Template
   +
Invitation Data
   ↓
Invitation Renderer
   ↓
Halaman Undangan
```

Contoh:

```text
Template Elegant
        +
{
  groom: "Ahmad",
  bride: "Aisyah",
  date: "...",
  venue: "..."
}
        ↓
Rendered Invitation
```

Setiap template memiliki struktur desain sendiri, tetapi menggunakan data undangan yang diberikan sistem.

---

# 9. API

## 9.1 Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

---

## 9.2 Categories

```http
GET /api/categories
GET /api/categories/:id
```

---

## 9.3 Templates

```http
GET /api/templates
GET /api/templates/:slug
```

Filter:

```http
GET /api/templates?category=wedding
GET /api/templates?category=mahasiswa
```

---

## 9.4 Invitations

```http
POST   /api/invitations
GET    /api/invitations
GET    /api/invitations/:slug
PUT    /api/invitations/:id
DELETE /api/invitations/:id
```

---

## 9.5 Orders

```http
POST /api/orders
GET  /api/orders
GET  /api/orders/:id
```

---

## 9.6 Payments

```http
POST /api/payments
POST /api/payments/webhook
```

Webhook digunakan payment gateway untuk memberi tahu backend tentang perubahan status pembayaran.

Flow:

```text
User
 ↓
Order
 ↓
Payment Gateway
 ↓
Payment Success
 ↓
Webhook
 ↓
Backend
 ↓
Verify
 ↓
Order = PAID
 ↓
Invitation = ACTIVE
```

Jangan menjadikan frontend sebagai sumber kebenaran pembayaran.

---

## 9.7 Photographers

```http
GET /api/photographers
GET /api/photographers/:slug
GET /api/photographers/:slug/portfolio
```

Tidak ada API registrasi fotografer untuk MVP.

---

# 10. Admin API

## Templates

```http
GET    /api/admin/templates
POST   /api/admin/templates
GET    /api/admin/templates/:id
PUT    /api/admin/templates/:id
DELETE /api/admin/templates/:id
```

## Invitations

```http
GET /api/admin/invitations
GET /api/admin/invitations/:id
PUT /api/admin/invitations/:id/status
```

## Orders

```http
GET /api/admin/orders
GET /api/admin/orders/:id
```

## Payments

```http
GET /api/admin/payments
GET /api/admin/payments/:id
```

## Photographers

```http
GET    /api/admin/photographers
POST   /api/admin/photographers
GET    /api/admin/photographers/:id
PUT    /api/admin/photographers/:id
DELETE /api/admin/photographers/:id
```

## Portfolio

```http
GET    /api/admin/photographers/:id/portfolio
POST   /api/admin/photographers/:id/portfolio
PUT    /api/admin/portfolio/:id
DELETE /api/admin/portfolio/:id
```

## Users

```http
GET /api/admin/users
GET /api/admin/users/:id
PUT /api/admin/users/:id/status
```

---

# 11. Halaman Frontend

Setiap halaman dibuat terpisah.

## Public Pages

### 01 — Home

File:

```text
pages/01-home.md
```

Isi:

- Hero
- CTA Undangan Digital
- CTA Fotografer
- Kategori
- Template unggulan
- Fotografer unggulan
- CTA utama

---

### 02 — Undangan

File:

```text
pages/02-undangan.md
```

Isi:

- Pilihan Mahasiswa
- Pilihan Pernikahan

---

### 03 — Undangan Mahasiswa

File:

```text
pages/03-undangan-mahasiswa.md
```

Isi:

- Template mahasiswa
- Filter
- Thumbnail
- Harga
- Detail
- Gunakan template

---

### 04 — Undangan Wedding

File:

```text
pages/04-undangan-wedding.md
```

Isi:

- Template pernikahan
- Filter
- Thumbnail
- Harga
- Detail
- Gunakan template

---

### 05 — Template

File:

```text
pages/05-template.md
```

Isi:

- Semua template
- Filter kategori
- Harga
- Preview
- Detail

---

### 06 — Template Detail

File:

```text
pages/06-template-detail.md
```

Isi:

- Preview
- Nama
- Deskripsi
- Harga
- Fitur
- Gunakan template

---

### 07 — Form Undangan

File:

```text
pages/07-undangan-form.md
```

Flow:

```text
Isi Form
 ↓
Simpan Draft
 ↓
Preview
```

Field menyesuaikan kategori dan template.

---

### 08 — Preview

File:

```text
pages/08-undangan-preview.md
```

Isi:

- Preview undangan
- Edit
- Lanjut pembayaran

---

### 09 — Pembayaran

File:

```text
pages/09-undangan-pembayaran.md
```

Flow:

```text
Preview
 ↓
Checkout
 ↓
Payment Gateway
 ↓
Pembayaran
 ↓
Active
```

---

### 10 — Undangan Saya

File:

```text
pages/10-undangan-saya.md
```

Isi:

- Daftar undangan
- Status
- URL
- Lihat
- Edit

---

### 11 — Edit Undangan

File:

```text
pages/11-undangan-edit.md
```

Isi:

- Form data undangan
- Upload foto
- Preview
- Simpan perubahan

Pengguna mengubah data, bukan mendesain ulang template secara bebas.

---

### 12 — Fotografer

File:

```text
pages/12-fotografer.md
```

Isi:

- Semua fotografer
- Filter kategori
- Card fotografer

---

### 13 — Fotografer Mahasiswa

File:

```text
pages/13-fotografer-mahasiswa.md
```

Isi:

- Fotografer mahasiswa
- Portfolio
- Layanan
- Harga mulai

---

### 14 — Fotografer Wedding

File:

```text
pages/14-fotografer-wedding.md
```

Isi:

- Fotografer wedding
- Portfolio
- Layanan
- Harga mulai

---

### 15 — Detail Fotografer

File:

```text
pages/15-fotografer-detail.md
```

Isi:

- Profil
- Deskripsi
- Lokasi
- Portfolio
- Layanan
- Harga mulai
- Tombol WhatsApp

Tombol WhatsApp diarahkan ke **WhatsApp Admin Lumiere**, bukan WhatsApp fotografer.

---

### 16 — Login

File:

```text
pages/16-login.md
```

Input:

- Email
- Password

---

### 17 — Register

File:

```text
pages/17-register.md
```

Input:

- Nama
- Email
- Password
- Konfirmasi password

---

# 12. Admin Pages

## 01 — Dashboard

```text
admin/01-dashboard.md
```

Menampilkan:

- Total user
- Total undangan
- Total order
- Total pendapatan
- Total fotografer

---

## 02 — Template

```text
admin/02-template.md
```

Admin dapat:

- Tambah template
- Edit template
- Hapus template
- Aktifkan/nonaktifkan template
- Atur harga
- Atur kategori

---

## 03 — Undangan

```text
admin/03-undangan.md
```

Admin dapat:

- Melihat semua undangan
- Melihat user
- Melihat template
- Melihat status
- Melihat URL
- Menonaktifkan undangan

---

## 04 — Order

```text
admin/04-order.md
```

Menampilkan:

- Order ID
- User
- Undangan
- Nominal
- Status
- Waktu transaksi

---

## 05 — Pembayaran

```text
admin/05-pembayaran.md
```

Menampilkan:

- Payment ID
- Order
- Provider
- Transaction ID
- Nominal
- Status
- Waktu pembayaran

---

## 06 — Fotografer

```text
admin/06-fotografer.md
```

Admin dapat:

- Tambah fotografer
- Edit fotografer
- Hapus fotografer
- Aktifkan/nonaktifkan fotografer
- Mengatur kategori
- Mengatur informasi layanan

---

## 07 — Portfolio

```text
admin/07-portfolio.md
```

Admin dapat:

- Upload portfolio
- Hapus portfolio
- Mengubah urutan
- Mengubah judul
- Menghubungkan foto dengan fotografer

---

## 08 — Users

```text
admin/08-users.md
```

Admin dapat:

- Melihat pengguna
- Melihat email
- Melihat jumlah undangan
- Melihat status akun
- Menonaktifkan akun

---

# 13. Authentication

Role:

```text
USER
ADMIN
```

Flow:

```text
Register
 ↓
Hash Password
 ↓
Create User
 ↓
Login
 ↓
JWT
 ↓
Authenticated Request
```

Endpoint yang membutuhkan authentication harus menggunakan JWT.

Endpoint admin membutuhkan:

```text
JWT
+
ROLE = ADMIN
```

---

# 14. Payment

Pembayaran hanya digunakan untuk layanan undangan digital pada tahap awal.

Flow:

```text
User memilih template
        ↓
Isi data
        ↓
Create Invitation
        ↓
Create Order
        ↓
Create Payment
        ↓
Payment Gateway
        ↓
User membayar
        ↓
Webhook
        ↓
Backend memverifikasi
        ↓
Payment PAID
        ↓
Order PAID
        ↓
Invitation ACTIVE
```

---

# 15. Image Storage

Jangan menyimpan file gambar langsung dalam PostgreSQL.

Gunakan:

```text
User
 ↓
Upload Image
 ↓
Cloudinary / S3
 ↓
Image URL
 ↓
PostgreSQL
```

Data yang disimpan database cukup:

```text
image_url
```

atau identifier file.

Digunakan untuk:

- Thumbnail template
- Foto undangan
- Gallery undangan
- Foto profil fotografer
- Portfolio fotografer

---

# 16. Status Undangan

```text
DRAFT
```

Undangan sedang dibuat dan belum selesai.

```text
PENDING_PAYMENT
```

Undangan menunggu pembayaran.

```text
ACTIVE
```

Pembayaran berhasil dan URL dapat diakses.

```text
EXPIRED
```

Jika nantinya Lumiere menerapkan masa aktif.

```text
DISABLED
```

Undangan dinonaktifkan oleh admin.

---

# 17. Status Order

```text
PENDING
PAID
FAILED
EXPIRED
CANCELLED
```

---

# 18. Status Photographer

```text
ACTIVE
INACTIVE
```

---

# 19. Environment Variables

Backend nantinya membutuhkan konfigurasi melalui `.env`.

Contoh:

```env
DATABASE_URL=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

MIDTRANS_SERVER_KEY=
MIDTRANS_CLIENT_KEY=

ADMIN_WHATSAPP=
```

Jangan commit `.env` ke GitHub.

Gunakan:

```text
.env
.env.example
```

`env.example` boleh disimpan di repository tanpa credential asli.

---

# 20. Urutan Pengerjaan Backend

Jangan membuat semua fitur sekaligus.

Urutan yang disarankan:

```text
1. Setup Node.js + NestJS
          ↓
2. Setup PostgreSQL
          ↓
3. Setup Prisma
          ↓
4. Buat Database Schema
          ↓
5. Migration
          ↓
6. Authentication
          ↓
7. Categories
          ↓
8. Templates
          ↓
9. Invitations
          ↓
10. Orders
          ↓
11. Payment
          ↓
12. Photographers
          ↓
13. Portfolio
          ↓
14. Admin API
          ↓
15. Integrasi Frontend
```

---

# 21. MVP Backend

Untuk versi pertama, fokus pada:

```text
AUTH
├── Register
└── Login

INVITATION
├── Template
├── Form
├── Preview
├── Create
├── Edit
└── URL

PAYMENT
├── Order
├── Payment
└── Webhook

PHOTOGRAPHER
├── List
├── Detail
└── Portfolio

ADMIN
├── Template
├── Invitation
├── Order
├── Payment
├── Photographer
├── Portfolio
└── User
```

Tidak perlu membuat:

- Sistem chat
- Booking fotografer
- Dashboard fotografer
- Registrasi fotografer
- Komisi otomatis
- Payment fotografer
- Microservices
- WebSocket
- GraphQL
- Redis
- Kubernetes

untuk MVP.

---

# 22. Prinsip Penting Pengembangan

## Separation of Concerns

Pisahkan:

```text
Frontend
Backend
Database
Storage
Payment
```

Jangan mencampurkan logic database ke frontend.

## Page Separation

Setiap halaman mempunyai file/component sendiri.

Contoh:

```text
InvitationForm.tsx
InvitationPreview.tsx
TemplateList.tsx
TemplateDetail.tsx
PhotographerList.tsx
PhotographerDetail.tsx
```

## Backend Separation

Setiap domain mempunyai module sendiri:

```text
auth
users
templates
invitations
orders
payments
photographers
portfolios
admin
```

Dengan struktur tersebut, ketika ada perubahan pada halaman fotografer, perubahan tidak perlu menyentuh seluruh sistem undangan.

---

# 23. Prioritas Persiapan Saat Ini

Jika backend belum dibuat sama sekali, siapkan terlebih dahulu:

```text
[1] GitHub Repository
        ↓
[2] Backend Project
        ↓
[3] PostgreSQL
        ↓
[4] Prisma
        ↓
[5] Database Schema
        ↓
[6] Environment Variables
        ↓
[7] Authentication
```

Setelah itu baru implementasikan API secara bertahap.

Dokumen ini adalah blueprint awal. Detail field form undangan dan struktur template perlu dikunci sebelum Prisma schema final dibuat.
