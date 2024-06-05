import { User } from '../../domain/entities/user';
import { UserRepository } from '../../domain/repositories/userRepository';
import mongoose, { Schema, Document, Model } from 'mongoose';

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserMongooseModel: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

export class MongooseUserRepository implements UserRepository {
  async createUser(userData: User): Promise<User> {
    const user = new UserMongooseModel(userData);
    await user.save();
    return user.toObject();
  }

  async getUserById(id: string): Promise<User | null> {
    return await UserMongooseModel.findById(id).lean();
  }

  async getAllUsers(): Promise<User[]> {
    return await UserMongooseModel.find().lean();
  }
}
