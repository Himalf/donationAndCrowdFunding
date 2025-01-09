import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { User } from 'src/users/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Donation {
  @PrimaryGeneratedColumn()
  donation_id: number;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  donated_at: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
  @ManyToOne(() => User, (user) => user.donation)
  user: User;
  @OneToMany(() => Campaign, (campaign) => campaign.donation)
  campaign: Campaign;
}
