import { faker } from '@faker-js/faker';
import { UserRole } from 'src/users/dto/userRole.enum';
import { User } from 'src/users/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
export const UsersFactory = setSeederFactory(User, () => {
  const user = new User();
  user.name = faker.person.fullName();
  user.address = faker.location.city();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.role = faker.helpers.arrayElement([
    UserRole.admin,
    UserRole.donor,
    UserRole.organizer,
  ]);
  user.profile_image = faker.image.avatar();
  return user;
});
