import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../boards/entities/board.entity';
import { User } from '../user/entities/user.entity';
import { Accompany, ACC_REQ_STATUS } from './entities/accompany.entity';

@Injectable()
export class AccompanyService {
  constructor(
    @InjectRepository(Accompany)
    private readonly accompanyRepository: Repository<Accompany>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createRequest({ boardId, targetUser }) {
    const boardFound = await this.boardRepository.findOne({
      where: { id: boardId },
    });
    const userFound = await this.userRepository.findOne({
      where: { email: targetUser.email },
    });
    //prettier-ignore
    const request = await this.accompanyRepository.save({
      board: boardFound, reqUser: userFound,
    });
    return request;
  }

  async fetchAll() {
    const requests = await this.accompanyRepository.find({
      relations: ['board', 'reqUser'],
    });
    return requests;
  }

  async accept({ accompanyId }) {
    const reqFound = await this.accompanyRepository.findOne({
      where: { id: accompanyId },
    });
    return await this.accompanyRepository.save({
      ...reqFound,
      reqStatus: ACC_REQ_STATUS.ACCEPTED,
    });
  }

  async refuse({ accompanyId }) {
    const reqFound = await this.accompanyRepository.findOne({
      where: { id: accompanyId },
    });
    return await this.accompanyRepository.save({
      ...reqFound,
      reqStatus: ACC_REQ_STATUS.REFUSED,
    });
  }
}
