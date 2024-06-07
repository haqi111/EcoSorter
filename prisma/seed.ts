import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
    const user1 = await prisma.users.create({
        data: {
          fullname: 'pistachio cookie',
          username: 'pistachio',
          email: 'pistachio@gmail.com',
          password:'superadmin'
         
        },
    });

    const user2 = await prisma.users.create({
        data: {
            fullname: 'gingerbread cookie',
            username: 'gingerbread',
            email: 'gingerbread@gmail.com',
            password:'superadmin'
           
          },
    });
    const dataTps = await prisma.dataTps.createMany({
      data: [
        {
          tahun: 2021,
          provinsi: 'D.I. Yogyakarta',
          kabupatenKota: 'Kota Yogyakarta',
          namaFasilitas: 'TPA Banyuroto',
          jenis: 'TPA Pemda (Non Regional)',
          open: '08:00',
          close: '17:00',
          status: 'Active',
          sampahMasuk: 1000.5,
          sampahMasukLandfill: 800.2,
        },
        {
          tahun: 2021,
          provinsi: 'D.I. Yogyakarta',
          kabupatenKota: 'Kab. Kulon Progo',
          namaFasilitas: 'TPA Wukirsari',
          jenis: 'TPA Pemda (Non Regional)',
          open: '07:00',
          close: '16:00',
          status: 'Active',
          sampahMasuk: 1230.75,
          sampahMasukLandfill: 3211.3,
        },
        {
          tahun: 2021,
          provinsi: 'D.I. Yogyakarta',
          kabupatenKota: 'Kab. Sleman',
          namaFasilitas: 'TPST Piyungan (Regional)',
          jenis: 'TPA Regional',
          open: '07:00',
          close: '16:00',
          status: 'Inactive',
          sampahMasuk: 6523.75,
          sampahMasukLandfill: 1111.3,
        },
        {
          tahun: 2022,
          provinsi: 'D.I. Yogyakarta',
          kabupatenKota: 'Kab. Kulon Progo',
          namaFasilitas: 'TPST Piyungan (Regional)',
          jenis: 'TPA Regional',
          open: '07:00',
          close: '16:00',
          status: 'Inactive',
          sampahMasuk: 2312.75,
          sampahMasukLandfill: 1233.3,
        },
        {
          tahun: 2022,
          provinsi: 'D.I. Yogyakarta',
          kabupatenKota: 'Kab. Gunungkidul',
          namaFasilitas: 'TPST Piyungan (Regional)',
          jenis: 'TPA Regional',
          open: '07:00',
          close: '16:00',
          status: 'Inactive',
          sampahMasuk: 1500.75,
          sampahMasukLandfill: 1200.3,
        },
        {
          tahun: 2022,
          provinsi: 'D.I. Yogyakarta',
          kabupatenKota: 'Kota Yogyakarta',
          namaFasilitas: 'TPA Banyuroto',
          jenis: 'TPA Pemda (Non Regional)',
          open: '07:00',
          close: '16:00',
          status: 'Active',
          sampahMasuk: 1500.75,
          sampahMasukLandfill: 1200.3,
        },
      ],
    });
    
}

seed().catch((e) => {
    throw e;
  }).finally(async () => {
    await prisma.$disconnect();
  });
