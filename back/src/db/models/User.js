import { UserModel } from "../schemas/user";

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
    static async findById(user_id) {
        const user = await UserModel.findById(user_id);

        return user;
    }

    static async findAll() {
        const users = await UserModel.find({});
        return users;
    }

    static async update({ user_id, fieldToUpdate, newValue }) {
        const filter = { _id: user_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedUser = await UserModel.findByIdAndUpdate(
            filter,
            update,
            option
        );
        return updatedUser;
    }
    static async passwordUpdate({ userEmail, hashedPassword }) {
        const filter = { email: userEmail };
        const update = { password: hashedPassword };
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
