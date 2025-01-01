import { hashPassword } from "../libs/password-libs.js";
import prisma from "../libs/prisma-libs.js";

export const getMahasiswa = async (req, res) => {
	try {
		const mahasiswa = await prisma.mahasiswa.findMany();
		if (mahasiswa.length === 0) {
			return res
				.status(404)
				.json({ success: false, message: "Belum ada data Mahasiswa" });
		}
		return res.status(200).json({ success: true, data: mahasiswa });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
};

export const getMahasiswaByNpm = async (req, res) => {
	try {
		const { npm } = req.params;
		const mahasiswa = await prisma.mahasiswa.findUnique({
			where: {
				npm,
			},
		});
		if (!mahasiswa) {
			return res
				.status(404)
				.json({ success: false, message: "Mahasiswa tidak ditemukan" });
		}
		return res.status(200).json({ success: true, data: mahasiswa });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
};

export const createMahasiswa = async (req, res) => {
	try {
		const { nama, npm, password, no_hp } = req.body;
		const hashedPassword = await hashPassword(password);
		const mahasiswa = await prisma.mahasiswa.create({
			data: {
				nama,
				npm,
				password: hashedPassword,
				no_hp,
			},
		});
		return res.status(201).json({
			success: true,
			message: "Mahasiswa berhasil ditambahkan",
			data: mahasiswa,
		});
	} catch (error) {
		if (error.code === "P2002") {
			return res
				.status(409)
				.json({ success: false, message: "NPM sudah terdaftar" });
		} else {
			return res
				.status(500)
				.json({ success: false, message: "Internal Server Error" });
		}
	}
};

export const updateMahasiswa = async (req, res) => {
	try {
		const thisNpm = req.params.npm;
		const { nama, npm, no_hp } = req.body;

		const mahasiswaExist = await prisma.mahasiswa.findUnique({
			where: {
				npm: thisNpm,
			},
		});

		if (!mahasiswaExist) {
			return res
				.status(404)
				.json({ success: false, message: "Mahasiswa tidak ditemukan" });
		}

		const mahasiswa = await prisma.mahasiswa.update({
			where: {
				npm: thisNpm,
			},
			data: {
				nama,
				npm,
				no_hp,
			},
		});
		res.status(200).json({ success: true, data: mahasiswa });
	} catch (error) {
		if (error.code === "P2002") {
			return res
				.status(409)
				.json({ success: false, message: "NPM sudah terdaftar" });
		}
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

export const deleteMahasiswa = async (req, res) => {
	try {
		const { npm } = req.params;

		const mahasiswaExist = await prisma.mahasiswa.findUnique({
			where: {
				npm,
			},
		});

		if (!mahasiswaExist) {
			return res
				.status(404)
				.json({ success: false, message: "Mahasiswa tidak ditemukan" });
		}

		const mahasiswa = await prisma.mahasiswa.delete({
			where: {
				npm,
			},
		});
		res
			.status(200)
			.json({ success: true, message: "Mahasiswa berhasil dihapus" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};
