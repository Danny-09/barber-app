import dataSource from 'src/config/typeorm.config';
import { Role } from "src/users/entities/role.entity"; 

async function seedRoles() {
  try {
    // Inicializa la conexión si aún no está establecida
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    const roleRepository = dataSource.getRepository(Role);

    const rolesData = [
      { name: 'SuperAdmin' },
      { name: 'Barber' },
      { name: 'Customer' },
    ];

    await roleRepository.save(rolesData);
    console.log('Roles seeded successfully');
  } catch (error) {
    console.error('Error seeding roles:', error);
  } finally {

    await dataSource.destroy();
    process.exit(0);
  }
}

seedRoles();
