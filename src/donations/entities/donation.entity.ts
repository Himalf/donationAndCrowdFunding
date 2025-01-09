import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { PaymentDetail } from 'src/payment-details/entities/payment-detail.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Donation {
  @PrimaryGeneratedColumn()
  donation_id: number;
  @Column({ type: 'decimal' })
  amount: number;
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
  @ManyToOne(() => Campaign, (campaign) => campaign.donation)
  campaign: Campaign;
  @OneToOne(() => PaymentDetail, (paymentDetail) => paymentDetail.donation)
  paymentDetail: PaymentDetail;
}
