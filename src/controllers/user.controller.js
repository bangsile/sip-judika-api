import { hashPassword } from "../libs/password-libs.js";
import prisma from "../libs/prisma-libs.js";

export const getUser = async (req, res) => {
	try {
		const user = await prisma.user.findMany();
		if (user.length === 0) {
			return res
				.status(404)
				.json({ success: false, message: "Belum Ada Data User" });
		}
		return res.status(200).json({ success: true, data: user });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
};

export const getUserById = async (req, res) => {
	try {
		let { id } = req.params;
		id = parseInt(id)
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User tidak ditemukan" });
		}
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
};

export const createUser = async (req, res) => {
	try {
		const { nama, username, password, role } = req.body;
		const hashedPassword = await hashPassword(password)
		const user = await prisma.user.create({
			data: {
				nama,
				username,
				password: hashedPassword,
				role,
			},
		});
		return res.status(201).json({
			success: true,
			message: "User berhasil ditambahkan",
			data: user,
		});
	} catch (error) {
		if (error.code === "P2002") {
			return res
				.status(409)
				.json({ success: false, message: "Username sudah terdaftar" });
		} else {
			return res
				.status(500)
				.json({ success: false, message: "Internal Server Error" });
		}
	}
};

export const updateUser = async (req, res) => {
	try {
		let { id } = req.params;
		id = parseInt(id)
		const { nama, username, password, role } = req.body;

		const userExist = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		if (!userExist) {
			return res
				.status(404)
				.json({ success: false, message: "User tidak ditemukan" });
		}

		const user = await prisma.user.update({
			where: {
				id,
			},
			data: {
				nama,
				username,
				password,
				role
			},
		});
		res.status(200).json({ success: true, data: user });
	} catch (error) {
		if (error.code === "P2002") {
			return res
				.status(409)
				.json({ success: false, message: "Username sudah terdaftar" });
		}
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

export const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;
		id = parseInt(id)

    const userExist = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		if (!userExist) {
			return res
				.status(404)
				.json({ success: false, message: "User tidak ditemukan" });
		}

    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ success: true, message: "User berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};