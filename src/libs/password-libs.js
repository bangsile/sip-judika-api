import bcrypt from "bcryptjs";

export const hashPassword = (plainPassword) => {
	const saltRounds = 10; // Jumlah putaran hashing
	const hashedPassword = bcrypt.hash(plainPassword, saltRounds);
	return hashedPassword;
};

export const verifyPassword = async (plainPassword, hashedPassword) => {
	const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
	return isMatch;
};
