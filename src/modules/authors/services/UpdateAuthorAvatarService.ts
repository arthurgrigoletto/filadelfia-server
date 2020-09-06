import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import HttpStatusCode from '@shared/errors/StatusCodes';
import User from '../infra/typeorm/entities/Author';
import IAuthorRepository from '../repositories/IAuthorRepository';

interface IRequest {
  author_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('AuthorRepository') private authorsRepository: IAuthorRepository,
    @inject('StorageProvider') private storageRepository: IStorageProvider,
  ) {}

  public async execute({ author_id, avatarFileName }: IRequest): Promise<User> {
    const author = await this.authorsRepository.findById(author_id);

    if (!author) {
      throw new AppError(
        'You can only change avatar of existing authors',
        HttpStatusCode.NOT_FOUND,
      );
    }

    if (author.avatar) {
      await this.storageRepository.deleteFile(author.avatar);
    }

    const filename = await this.storageRepository.saveFile(avatarFileName);

    author.avatar = filename;

    await this.authorsRepository.save(author);

    return author;
  }
}

export default UpdateUserAvatarService;
