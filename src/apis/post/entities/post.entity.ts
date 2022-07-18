import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Image } from 'src/apis/image/entities/image.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @ManyToOne(() => User)
  @Field(() => User)
  writer: User;

  @Column()
  @Field(() => String)
  description: string;

  @JoinColumn()
  @Field(() => Image)
  mainImage: Image;

  @ManyToOne(() => Image)
  @Field(() => [Image])
  subImages: Image[];

  @Column()
  @Field(() => String)
  category: string;

  @CreateDateColumn()
  @Field(() => Date)
  uploadedAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  editedAt: Date;

  @Column({ default: 0 })
  @Field(() => Int)
  viewCount: number;

  @JoinTable()
  @ManyToMany(() => User, (likedUsers) => likedUsers.dibsPosts)
  @Field(() => [User], { nullable: true })
  likedUsers: User[];
}
