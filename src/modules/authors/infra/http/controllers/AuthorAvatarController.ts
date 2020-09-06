import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateAuthorAvatarService from '@modules/authors/services/UpdateAuthorAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAuthorAvatar = container.resolve(UpdateAuthorAvatarService);

    const author = await updateAuthorAvatar.execute({
      author_id: request.params.author_id,
      avatarFileName: request.file.filename,
    });

    return response.json(classToClass(author, { groups: ['authors'] }));
  }
}
