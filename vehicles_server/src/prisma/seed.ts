import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.vehicle.createMany({
    data: [
      {
        plate: 'ABC1234',
        renavam_code: '12345678901',
        model: 'Corolla',
        brand: 'Toyota',
        year: 2020,
      },
      {
        plate: 'XYZ5678',
        renavam_code: '98765432100',
        model: 'Civic',
        brand: 'Honda',
        year: 2021,
      },
      {
        plate: 'DEF4321',
        renavam_code: '23456789012',
        model: 'Focus',
        brand: 'Ford',
        year: 2019,
      },
      {
        plate: 'GHI8765',
        renavam_code: '34567890123',
        model: 'Cruze',
        brand: 'Chevrolet',
        year: 2018,
      },
      {
        plate: 'JKL3456',
        renavam_code: '45678901234',
        model: 'Fusion',
        brand: 'Ford',
        year: 2020,
      },
      {
        plate: 'MNO6543',
        renavam_code: '56789012345',
        model: 'Jetta',
        brand: 'Volkswagen',
        year: 2021,
      },
      {
        plate: 'PQR2345',
        renavam_code: '67890123456',
        model: 'Sentra',
        brand: 'Nissan',
        year: 2017,
      },
      {
        plate: 'STU5432',
        renavam_code: '78901234567',
        model: 'Elantra',
        brand: 'Hyundai',
        year: 2022,
      },
      {
        plate: 'VWX7654',
        renavam_code: '89012345678',
        model: 'Cerato',
        brand: 'Kia',
        year: 2016,
      },
      {
        plate: 'YZA9876',
        renavam_code: '90123456789',
        model: '308',
        brand: 'Peugeot',
        year: 2015,
      },
    ],
  });

  console.log('🚗 10 Vehicles seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
