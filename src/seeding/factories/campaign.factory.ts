import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { CampaignStatus } from 'src/campaigns/dto/campaignStatus.enum';

export const campaignFactory = setSeederFactory(Campaign, () => {
  const campaign = new Campaign();
  campaign.title = faker.lorem.sentence();
  campaign.description = faker.lorem.sentences(3);
  campaign.goal_amount = parseInt(
    faker.finance.amount({ min: 1000, max: 100000 }),
  );
  campaign.start_date = faker.date.past().toISOString(); // Fixed past() call
  campaign.end_date = faker.date
    .future({ refDate: new Date(campaign.start_date) }) // Fixed future() call
    .toISOString();
  campaign.status = faker.helpers.arrayElement([
    CampaignStatus.ACTIVE,
    CampaignStatus.CANCELED,
    CampaignStatus.COMPLETED,
  ]);
  return campaign;
});
