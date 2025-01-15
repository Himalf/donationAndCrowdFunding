import { Update } from 'src/updates/entities/update.entity';
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
export const updatesFactory = setSeederFactory(Update, () => {
  const updates = new Update();
  updates.message = faker.lorem.sentences(3);
  return updates;
});
