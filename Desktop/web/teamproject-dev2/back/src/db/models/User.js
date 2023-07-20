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

	static async findById(user_id) {
		const user = await UserModel.findById(user_id);
		console.log(user);
		return user;
	}

	static async findAll() {
		const users = await UserModel.find({});
		return users;
	}

	static async update(user_id, updates) {
		const updateUser = await UserModel.findByIdAndUpdate(user_id, updates, {
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

	static async delete(user_id) {
		const deletedUser = await UserModel.findByIdAndDelete(user_id);
		return deletedUser;
	}
}

export { User };
