import { UserService } from '../../../src/application/services/userService';
import { User } from '../../../src/domain/entities/user';
import { UserRepository } from '../../../src/domain/repositories/userRepository';

// Mock del UserRepository
class MockUserRepository implements UserRepository {
  private users: User[] = [];

  async createUser(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }
}

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockUserRepository;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    userService = new UserService(userRepository);
  });

  it('should create a new user', async () => {
    const user: User = { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password' };
    const createdUser = await userService.createUser(user);
    expect(createdUser).toEqual(user);
  });

  it('should get a user by ID', async () => {
    const user: User = { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password' };
    await userService.createUser(user);
    const fetchedUser = await userService.getUserById('1');
    expect(fetchedUser).toEqual(user);
  });

  it('should get all users', async () => {
    const user1: User = { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password' };
    const user2: User = { id: '2', name: 'Jane Doe', email: 'jane@example.com', password: 'password' };
    await userService.createUser(user1);
    await userService.createUser(user2);
    const users = await userService.getAllUsers();
    expect(users).toEqual([user1, user2]);
  });
});
