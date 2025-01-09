import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CampaignStatus } from '../dto/campaignStatus.enum';
import { User } from 'src/users/entities/user.entity';
import { Update } from 'src/updates/entities/update.entity';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  campaign_id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  goal_amount: number;
  @Column()
  start_date: string;
  @Column()
  end_date: string;
  @Column({ type: 'enum', enum: CampaignStatus })
  status: CampaignStatus;
  @ManyToOne(() => User, (user) => user.campaign)
  user: User;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
  @ManyToOne(() => Update, (update) => update.campaign)
  update: Update;
}
