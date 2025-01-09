import { Campaign } from 'src/campaigns/entities/campaign.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Update {
  @PrimaryGeneratedColumn()
  update_id: number;
  @Column()
  message: string;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  posted_at: Date;
  @ManyToOne(() => Campaign, (campaign) => campaign.update)
  campaign: Campaign;
}
