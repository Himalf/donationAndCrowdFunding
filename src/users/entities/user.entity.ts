import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../dto/userRole.enum';
import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { Donation } from 'src/donations/entities/donation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;
  @Column()
  name: string;
  @Column()
  address: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;
  @Column()
  profile_image: string;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_at: Date;

  @OneToMany(() => Campaign, (campaign) => campaign.user)
  campaign: Campaign[];
  @OneToMany(() => Donation, (donation) => donation.user)
  donation: Donation;
  @Column({ nullable: true })
  resetOtp: string;
  @Column({ nullable: true, type: 'timestamp' })
  otpExpiresAt: Date;
}
