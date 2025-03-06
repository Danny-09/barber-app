import dataSource from 'src/config/typeorm.config';
import { User } from '@/users/entities/user.entity';

async function seedUsers() {
  try {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    const userRepository = dataSource.getRepository(User);

    const usersData = [
      {
        name: 'SuperAdmin', email: 'superadmin@barber.com', password: 'SuperAdmin12', role_id: 1,
        phone: '', address: ''
      },
      {
        name: 'Danilo Abril', email: 'dacojose0@barber.com', password: 'Daniloab12', role_id: 2,
        phone: '6343454780', address: 'Ojo de agua calle 2 S/N'
      },
      {
        name: 'Cristian Molina', email: 'cristianm@baber.com', password: 'cristian12', role_id: 2,
        phone: '6342464865', address: 'Moctezuma Sonora'
      },
      {
        name: 'Luis Reyna', email: 'luisr@baber.com', password: 'luisreyna12', role_id: 2,
        phone: '6334434865', address: 'Moctezuma Sonora'
      },
    ];

    await userRepository.save(usersData);
    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {

    await dataSource.destroy();
    process.exit(0);
  }
}

seedUsers();
