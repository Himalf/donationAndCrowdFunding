import { faker } from '@faker-js/faker';
import { UserRole } from 'src/users/dto/userRole.enum';
import { User } from 'src/users/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import * as bcrypt from 'bcryptjs';

export const UsersFactory = setSeederFactory(User, async () => {
  const user = new User();

  // Generate a random password first
  const rawPassword = faker.internet.password();

  // Hash the password
  const salt = await bcrypt.genSalt(10); // Fixed bcrypt genSalt
  const hashedPassword = await bcrypt.hash(rawPassword, salt);

  // Set the user properties
  user.password = hashedPassword;
  user.name = faker.person.fullName();
  user.address = faker.location.city();
  user.email = faker.internet.email();
  user.role = faker.helpers.arrayElement([
    UserRole.admin,
    UserRole.donor,
    UserRole.organizer,
  ]);
  user.profile_image = faker.image.avatar();

  return user;
});
