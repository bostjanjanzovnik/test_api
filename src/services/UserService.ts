import { v4 } from 'uuid';
import { CreateUserRequest, UpdateUserRequest, User } from '../interfaces/User';
import UserRepository from '../repositories/UserRepository';
import { HandledError } from '../errors/HandledError';
import { ErrorType } from '../interfaces/HandledError';
import PostService from './PostService';

class UserService {
    async index(): Promise<User[]> {
        try {
            return UserRepository.getAll();
        } catch (e) {
            throw new HandledError(ErrorType.Database, 'Failed to retrieve data.');
        }
    }

    async get(id: string): Promise<User> {
        let result: User | null = null;

        try {
            result = await UserRepository.get(id);
        } catch (e) {
            throw new HandledError(ErrorType.Database, 'Failed to retrieve data.');
        }

        if (!result) {
            throw new HandledError(ErrorType.ResourceNotFound, 'User not found.', 404);
        }

        result.posts = await PostService.getByUserId(result.id);

        return result;
    }

    async add(userData: CreateUserRequest): Promise<User> {
        try {
            const user: User = {
              id: v4(),
              name: userData.name,
              surname: userData.surname,
              dateOfBirth: userData.dateOfBirth,
              createdOn: new Date().toISOString()
            };

            return UserRepository.addOrUpdate(user);
        } catch (e) {
            throw new HandledError(ErrorType.Database,'Failed to store data.');
        }
    }

    async update(id: string, userData: UpdateUserRequest): Promise<User> {
        let user = await this.get(id);

        try {
            user.name = userData.name ?? user.name;
            user.surname = userData.surname ?? user.surname;
            user.dateOfBirth = userData.dateOfBirth ?? user.dateOfBirth;

            return UserRepository.addOrUpdate(user);
        } catch (e) {
            throw new HandledError(ErrorType.Database,'Failed to update data.');
        }
    }

    async delete(id: string): Promise<void> {
        try {
            return UserRepository.delete(id);
        } catch (e) {
            throw new HandledError(ErrorType.Database,'Failed to delete data.');
        }
    }
}

export default new UserService();
