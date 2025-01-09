import { Donation } from 'src/donations/entities/donation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentMethod } from '../dto/paymentMethod.enum';
import { PaymentStatus } from '../dto/paymentstatus.enum';

@Entity()
export class PaymentDetail {
  @PrimaryGeneratedColumn()
  paymentDetail_id: number;
  @OneToOne(() => Donation, (donation) => donation.paymentDetail, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  donation: Donation;
  @Column({ type: 'enum', enum: PaymentMethod })
  payment_method: PaymentMethod;
  @Column({ unique: true })
  transaction_id: number;
  @Column({ type: 'enum', enum: PaymentStatus })
  status: PaymentStatus;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  processed_at: Date;
}
