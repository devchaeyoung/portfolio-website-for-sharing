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

	static async findById(userId) {
		const user = await UserModel.findById(userId);

		return user;
	}

	static async findAll() {
		const users = await UserModel.find({});
		return users;
	}

	static async update(userId, updates) {
		const updateUser = await UserModel.findByIdAndUpdate(userId, updates, {
			new: true,
		});
		return updateUser;
	}

	static async passwordUpdate(email, hashedPassword) {
		const updatePassword = await UserModel.findOneAndUpdate(
			{ email: email },
			{ $set: { password: hashedPassword } },
			{ new: true },
		).exec();
		return updatePassword;
	}

	static async delete(userId) {
		const deletedUser = await UserModel.findByIdAndDelete(userId);
		return deletedUser;
	}
}

export { User };
