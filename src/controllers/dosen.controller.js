import { hashPassword } from "../libs/password-libs.js";
import prisma from "../libs/prisma-libs.js";

export const getDosen = async (req, res) => {
	try {
		const dosen = await prisma.dosen.findMany();
		if (dosen.length === 0) {
			return res
				.status(404)
				.json({ success: false, message: "Belum ada data Dosen" });
		}
		return res.status(200).json({ success: true, data: dosen });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
};

export const getDosenByNidn = async (req, res) => {
	try {
		const { nidn } = req.params;
		const dosen = await prisma.dosen.findUnique({
			where: {
				nidn,
			},
		});
		if (!dosen) {
			return res
				.status(404)
				.json({ success: false, message: "Dosen tidak ditemukan" });
		} 
    return res.status(200).json({ success: true, data: dosen });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
};

export const createDosen = async (req, res) => {
	try {
		const { nama, nidn, password, role } = req.body;
		const hashedPassword = await hashPassword(password);
		const dosen = await prisma.dosen.create({
			data: {
				nama,
				nidn,
				password: hashedPassword,
				role,
			},
		});
		return res.status(201).json({
			success: true,
			message: "Dosen berhasil ditambahkan",
			data: dosen,
		});
	} catch (error) {
		if (error.code === "P2002") {
			return res
				.status(409)
				.json({ success: false, message: "NIDN sudah terdaftar" });
		} else {
			return res
				.status(500)
				.json({ success: false, message: "Internal Server Error" });
		}
	}
};

export const updateDosen = async (req, res) => {
	try {
		const thisNidn = req.params.nidn;
		const { nama, nidn, password, role } = req.body;

		const dosenExist = await prisma.dosen.findUnique({
			where: {
				nidn: thisNidn,
			},
		});

		if (!dosenExist) {
			return res
				.status(404)
				.json({ success: false, message: "Dosen tidak ditemukan" });
		}

		const dosen = await prisma.dosen.update({
			where: {
				nidn: thisNidn,
			},
			data: {
				nama,
				nidn,
				// password,
				// role,
			},
		});
		res.status(200).json({ success: true, data: dosen });
	} catch (error) {
		if (error.code === "P2002") {
			return res
				.status(409)
				.json({ success: false, message: "NIDN sudah terdaftar" });
		}
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

export const deleteDosen = async (req, res) => {
	try {
		const { nidn } = req.params;

		const dosenExist = await prisma.dosen.findUnique({
			where: {
				nidn,
			},
		});

		if (!dosenExist) {
			return res
				.status(404)
				.json({ success: false, message: "Dosen tidak ditemukan" });
		}

		const dosen = await prisma.dosen.delete({
			where: {
				nidn,
			},
		});
		res.status(200).json({ success: true, message: "Dosen berhasil dihapus" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};
