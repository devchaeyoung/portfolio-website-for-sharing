import { UserModel } from "../schemas/user";
const ObjectId = require("mongoose").Types.ObjectId;
class User {
    static async create({ newUser }) {
        const createdNewUser = await UserModel.create(newUser);
        return createdNewUser;
    }

    static async findByEmail({ email }) {
        const user = await UserModel.findOne({ email });
        return user;
    }

    static async findOne(user_id) {
        const user = await UserModel.findOne({ id: user_id });
        return user;
    }
    static async findById(userId) {
        const user = await UserModel.findOne({ id: userId });
        return user;
    }

    static async findAll() {
        const users = await UserModel.find({});
        return users;
    }

    static async update({ user_id, fieldToUpdate, newValue }) {
        const filter = { id: user_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedUser = await UserModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedUser;
    }
    static async passwordUpdate({ userEmail, newPassword }) {
        const filter = { email: userEmail };
        const update = { password: newPassword };
        const option = { returnOriginal: false };
        const updatedUser = await UserModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedUser;
    }
    static async delete(user_id) {
        const deletedUser = await UserModel.findByIdAndDelete({
            _id: user_id,
        });
        return deletedUser;
    }
}

export { User };
