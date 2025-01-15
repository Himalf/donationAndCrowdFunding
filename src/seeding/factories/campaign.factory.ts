import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker/.';
import { CampaignStatus } from 'src/campaigns/dto/campaignStatus.enum';
import { User } from 'src/users/entities/user.entity';
export const campaignFactory = setSeederFactory(Campaign, () => {
  const campaign = new Campaign();
  campaign.title = faker.lorem.sentence();
  campaign.description = faker.lorem.sentences(3);
  campaign.goal_amount = parseFloat(
    faker.finance.amount({ min: 1000, max: 100000 }),
  );
  campaign.start_date = faker.date.past({ years: 1 }).toISOString();
  campaign.end_date = faker.date
    .future({ years: 1, refDate: campaign.start_date })
    .toString();
  campaign.status = faker.helpers.arrayElement([
    CampaignStatus.ACTIVE,
    CampaignStatus.CANCELED,
    CampaignStatus.COMPLETED,
  ]);
  return campaign;
});
