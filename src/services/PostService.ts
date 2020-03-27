import { v4 } from 'uuid';
import { HandledError } from '../errors/HandledError';
import { ErrorType } from '../interfaces/HandledError';
import { CreatePostRequest, Post } from '../interfaces/Post';
import UserRepository from '../repositories/UserRepository';
import PostRepository from '../repositories/PostRepository';

class PostService {
    async getByUserId(userId: string): Promise<Post[]> {
        const query: any = {
            query: {
                match_phrase: {
                    userId: {
                        query: userId
                    },
                },
            },
        };

        try {
            return PostRepository.getAll(query);
        } catch (e) {
            throw new HandledError(ErrorType.Database, 'Failed to retrieve data.');
        }
    }

    async add(postData: CreatePostRequest): Promise<Post> {
        const user = await UserRepository.get(postData.userId);

        if (!user) {
            throw new HandledError(ErrorType.ResourceNotFound, 'User does not exists.', 404);
        }

        try {
            const post: Post = {
                id: v4(),
                userId: postData.userId,
                title: postData.title,
                content: postData.content,
                createdOn: new Date().toISOString()
            };

            return PostRepository.addOrUpdate(post);
        } catch (e) {
            throw new HandledError(ErrorType.Database,'Failed to store data.');
        }
    }

    async delete(id: string): Promise<void> {
        try {
            return PostRepository.delete(id);
        } catch (e) {
            throw new HandledError(ErrorType.Database,'Failed to delete data.');
        }
    }
}

export default new PostService();
