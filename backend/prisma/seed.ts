import {
  PrismaClient,
  Role,
  UserStatus,
  CategoryType,
  CategoryStatus,
  TemplateStatus,
  PhotographerStatus,
} from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for Lumiere...');

  // 1. Clean existing records (in reverse dependency order)
  await prisma.photographerPortfolio.deleteMany();
  await prisma.photographer.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.invitation.deleteMany();
  await prisma.template.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned existing records.');

  // 2. Seed Default Admin & Demo User
  const adminPassword = await argon2.hash('Admin123!');
  const userPassword = await argon2.hash('User123!');

  const admin = await prisma.user.create({
    data: {
      name: 'Lumiere Super Admin',
      email: 'admin@lumiere.id',
      passwordHash: adminPassword,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
    },
  });

  const demoUser = await prisma.user.create({
    data: {
      name: 'Ahmad Faiz',
      email: 'user@lumiere.id',
      passwordHash: userPassword,
      role: Role.USER,
      status: UserStatus.ACTIVE,
    },
  });

  console.log(`👤 Created users: Admin (${admin.email}), Demo User (${demoUser.email})`);

  // 3. Seed Categories (Undangan & Fotografer)
  const catUndanganMahasiswa = await prisma.category.create({
    data: {
      name: 'Mahasiswa',
      type: CategoryType.INVITATION,
      status: CategoryStatus.ACTIVE,
    },
  });

  const catUndanganPernikahan = await prisma.category.create({
    data: {
      name: 'Pernikahan',
      type: CategoryType.INVITATION,
      status: CategoryStatus.ACTIVE,
    },
  });

  const catFotograferMahasiswa = await prisma.category.create({
    data: {
      name: 'Mahasiswa',
      type: CategoryType.PHOTOGRAPHER,
      status: CategoryStatus.ACTIVE,
    },
  });

  const catFotograferPernikahan = await prisma.category.create({
    data: {
      name: 'Pernikahan',
      type: CategoryType.PHOTOGRAPHER,
      status: CategoryStatus.ACTIVE,
    },
  });

  console.log('📂 Categories created:');
  console.log(`  - Undangan Mahasiswa [ID: ${catUndanganMahasiswa.id}]`);
  console.log(`  - Undangan Pernikahan [ID: ${catUndanganPernikahan.id}]`);
  console.log(`  - Fotografer Mahasiswa [ID: ${catFotograferMahasiswa.id}]`);
  console.log(`  - Fotografer Pernikahan [ID: ${catFotograferPernikahan.id}]`);

  // 4. Seed Dummy Templates (Undangan Mahasiswa & Pernikahan)
  const templates = await Promise.all([
    prisma.template.create({
      data: {
        categoryId: catUndanganMahasiswa.id,
        name: 'Wisuda Minimalist Modern',
        slug: 'wisuda-minimalist-modern',
        description: 'Template undangan wisuda & yudisium bernuansa modern minimalis dengan tipografi elegan.',
        thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop',
        price: 49000,
        status: TemplateStatus.ACTIVE,
        templateData: {
          theme: 'academic-clean',
          palette: { primary: '#1E293B', accent: '#3B82F6', background: '#F8FAFC' },
          sections: ['hero', 'graduate_info', 'event_details', 'gallery', 'wishes', 'maps'],
          sampleContent: {
            title: 'Syukuran & Perayaan Wisuda Sarjana',
            university: 'Universitas Syiah Kuala',
            faculty: 'Fakultas Matematika dan Ilmu Pengetahuan Alam',
            degree: 'S.Kom (Sarjana Komputer)',
          },
        },
      },
    }),
    prisma.template.create({
      data: {
        categoryId: catUndanganMahasiswa.id,
        name: 'Sidang & Yudisium Academic Blue',
        slug: 'sidang-yudisium-academic-blue',
        description: 'Template resmi untuk syukuran kelulusan sidang skripsi, tesis, dan yudisium mahasiswa.',
        thumbnail: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop',
        price: 39000,
        status: TemplateStatus.ACTIVE,
        templateData: {
          theme: 'deep-navy',
          palette: { primary: '#0F172A', accent: '#60A5FA', background: '#FFFFFF' },
          sections: ['hero', 'graduate_info', 'schedule', 'livestream_link', 'wishes'],
          sampleContent: {
            title: 'Syukuran Kelulusan & Yudisium',
            subtitle: 'Proudly Celebrating Academic Achievement',
          },
        },
      },
    }),
    prisma.template.create({
      data: {
        categoryId: catUndanganPernikahan.id,
        name: 'Eternal Botanical Wedding',
        slug: 'eternal-botanical-wedding',
        description: 'Tema pernikahan botani floral yang lembut, romantis, dan dilengkapi galeri foto interaktif.',
        thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
        price: 99000,
        status: TemplateStatus.ACTIVE,
        templateData: {
          theme: 'botanical-gold',
          palette: { primary: '#2D3748', accent: '#D4AF37', background: '#FAFAF9' },
          sections: ['hero', 'couple', 'love_story', 'events', 'gallery', 'rsvp', 'gift', 'wishes'],
          features: ['music_player', 'countdown_timer', 'google_calendar_sync', 'amplop_digital'],
        },
      },
    }),
    prisma.template.create({
      data: {
        categoryId: catUndanganPernikahan.id,
        name: 'Royal Javanese Gold',
        slug: 'royal-javanese-gold',
        description: 'Nuansa adat nusantara klasik dengan sentuhan emas mewah dan ornamen budaya adiluhung.',
        thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
        price: 129000,
        status: TemplateStatus.ACTIVE,
        templateData: {
          theme: 'traditional-gold',
          palette: { primary: '#3B2F2F', accent: '#C5A059', background: '#FFFDF9' },
          sections: ['hero', 'bismillah', 'couple', 'akad_resepsi', 'protocol_health', 'gallery', 'gift'],
          features: ['custom_song', 'guest_name_qr', 'wishes_wall', 'bank_transfer_copy'],
        },
      },
    }),
  ]);

  console.log(`🎨 Created ${templates.length} dummy invitation templates.`);

  // 5. Seed Dummy Photographers (Mahasiswa & Pernikahan)
  const photographer1 = await prisma.photographer.create({
    data: {
      categoryId: catFotograferMahasiswa.id,
      name: 'Lumiere Campus Visual (Banda Aceh)',
      slug: 'lumiere-campus-visual',
      description: 'Spesialis foto wisuda outdoor & indoor studio Banda Aceh. Siap mendokumentasikan momen kelulusan terbaik Anda.',
      location: 'Banda Aceh, Aceh',
      whatsapp: '6281234567801',
      startingPrice: 250000,
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
      status: PhotographerStatus.ACTIVE,
    },
  });

  const photographer2 = await prisma.photographer.create({
    data: {
      categoryId: catFotograferMahasiswa.id,
      name: 'Graduation Tales Yogyakarta',
      slug: 'graduation-tales-yogyakarta',
      description: 'Dokumentasi wisuda personal & grup di spot ikonik Yogyakarta. Tone warna cerah, bersih, dan berkesan.',
      location: 'Sleman & Kota Yogyakarta',
      whatsapp: '6281234567802',
      startingPrice: 350000,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
      status: PhotographerStatus.ACTIVE,
    },
  });

  const photographer3 = await prisma.photographer.create({
    data: {
      categoryId: catFotograferPernikahan.id,
      name: 'Mahligai Wedding Cinema & Photo',
      slug: 'mahligai-wedding-cinema',
      description: 'Tim fotografer & videografer pernikahan profesional spesialis cinematic story-telling di Jabodetabek.',
      location: 'Jakarta Selatan & Tangerang',
      whatsapp: '6281234567803',
      startingPrice: 3500000,
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
      status: PhotographerStatus.ACTIVE,
    },
  });

  const photographer4 = await prisma.photographer.create({
    data: {
      categoryId: catFotograferPernikahan.id,
      name: 'Serenade Love Stories Bandung',
      slug: 'serenade-love-stories',
      description: 'Mengabadikan kehangatan pesta pernikahan dan pre-wedding dengan estetika warm, timeless, and candid.',
      location: 'Bandung & Cimahi',
      whatsapp: '6281234567804',
      startingPrice: 2800000,
      profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop',
      status: PhotographerStatus.ACTIVE,
    },
  });

  console.log('📸 Created 4 photographers across Mahasiswa & Pernikahan categories.');

  // 6. Seed Portfolios for each photographer
  const portfolios = await Promise.all([
    // Photographer 1
    prisma.photographerPortfolio.create({
      data: {
        photographerId: photographer1.id,
        imageUrl: 'https://images.unsplash.com/photo-1627556704302-624286467c65?q=80&w=800&auto=format&fit=crop',
        title: 'Graduation Outdoor Session — USK',
        sortOrder: 1,
      },
    }),
    prisma.photographerPortfolio.create({
      data: {
        photographerId: photographer1.id,
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
        title: 'Sahabat Seperjuangan Wisuda Session',
        sortOrder: 2,
      },
    }),

    // Photographer 2
    prisma.photographerPortfolio.create({
      data: {
        photographerId: photographer2.id,
        imageUrl: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=800&auto=format&fit=crop',
        title: 'Yogyakarta Landmark Graduation Shoot',
        sortOrder: 1,
      },
    }),
    prisma.photographerPortfolio.create({
      data: {
        photographerId: photographer2.id,
        imageUrl: 'https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?q=80&w=800&auto=format&fit=crop',
        title: 'Studio Portrait Kelulusan Sarjana',
        sortOrder: 2,
      },
    }),

    // Photographer 3
    prisma.photographerPortfolio.create({
      data: {
        photographerId: photographer3.id,
        imageUrl: 'https://images.unsplash.com/photo-1519228424268-e6b72a6a1fb0?q=80&w=800&auto=format&fit=crop',
        title: 'The Sacred Vows — Akad Nikah',
        sortOrder: 1,
      },
    }),
    prisma.photographerPortfolio.create({
      data: {
        photographerId: photographer3.id,
        imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop',
        title: 'Grand Ballroom Wedding Reception',
        sortOrder: 2,
      },
    }),

    // Photographer 4
    prisma.photographerPortfolio.create({
      data: {
        photographerId: photographer4.id,
        imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop',
        title: 'Pine Forest Intimate Wedding Bandung',
        sortOrder: 1,
      },
    }),
    prisma.photographerPortfolio.create({
      data: {
        photographerId: photographer4.id,
        imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
        title: 'Golden Hour Pre-wedding Sunset',
        sortOrder: 2,
      },
    }),
  ]);

  console.log(`🖼️  Created ${portfolios.length} portfolio items.`);
  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
