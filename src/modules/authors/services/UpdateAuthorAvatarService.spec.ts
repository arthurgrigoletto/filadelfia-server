import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateAuthorAvatarService from './UpdateAuthorAvatarService';
import FakeAuthorRepository from '../repositories/fakes/FakeAuthorRepository';

let fakeAuthorsRepository: FakeAuthorRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateAuthorAvatar: UpdateAuthorAvatarService;

describe('UpdateAuthorAvatar', () => {
  beforeEach(() => {
    fakeAuthorsRepository = new FakeAuthorRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateAuthorAvatar = new UpdateAuthorAvatarService(
      fakeAuthorsRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update author avatar', async () => {
    const author = await fakeAuthorsRepository.create('John Doe');

    await updateAuthorAvatar.execute({
      author_id: author.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(author.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar to non existing author', async () => {
    await expect(
      updateAuthorAvatar.execute({
        author_id: 'non-existing-author',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const author = await fakeAuthorsRepository.create('John Doe');

    await updateAuthorAvatar.execute({
      author_id: author.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateAuthorAvatar.execute({
      author_id: author.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(author.avatar).toBe('avatar2.jpg');
  });
});
