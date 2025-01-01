import prisma from "../libs/prisma-libs.js";

export const getPenelitian = async (req, res) => {
	try {
		const penelitian = await prisma.penelitian.findMany();
		if (penelitian.length === 0) {
			return res
				.status(404)
				.json({ success: false, message: "Belum ada data Penelitian" });
		}
		return res.status(200).json({ success: true, data: penelitian });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
};

export const getPenelitianById = async (req, res) => {
	try {
		let { id } = req.params;
		id = parseInt(id);
		const penelitian = await prisma.penelitian.findUnique({
			where: {
				id,
			},
		});
		if (!penelitian) {
			return res
				.status(404)
				.json({ success: false, message: "Penelitian tidak ditemukan" });
		}
		return res.status(200).json({ success: true, data: penelitian });
	} catch (error) {}
};

export const getPenelitianNpm = async (req, res) => {
	try {
		console.log("mashok");
		const { npm } = req.params;
		console.log(npm);
		const penelitian = await prisma.penelitian.findFirst({
			where: {
				npm: npm,
			},
		});
		if (!penelitian) {
			return res
				.status(404)
				.json({ success: false, message: "Penelitian tidak ditemukan" });
		}
		return res.status(200).json({ success: true, data: penelitian });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
};

export const createPenelitian = async (req, res) => {
	try {
		const {
			judul,
			objek,
			latar_belakang,
			tujuan,
			pembimbing_satu,
			pembimbing_dua,
			daftar_pustaka,
			npm,
			nama,
		} = req.body;

		const penelitian = await prisma.penelitian.create({
			data: {
				judul,
				objek,
				latar_belakang,
				tujuan,
				pembimbing_satu,
				pembimbing_dua,
				daftar_pustaka,
				npm,
				nama,
			},
		});
		return res.status(201).json({
			success: true,
			message: "Penelitian berhasil ditambahkan",
			data: penelitian,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
};


export const updatePenelitian = async (req, res) => {
	try {
		console.log('mashoikk')
		const { id } = req.params;
		const {
			status
		} = req.body;

		const penelitian = await prisma.penelitian.update({
			where: {
				id: parseInt(id),
			},
			data: {
				status
			},
		});
		console.log(penelitian)
		return res.status(200).json({ success: true, data: penelitian });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
};

export const deletePenelitian = async (req, res) => {
	try {
		const { id } = req.params;
		const penelitian = await prisma.penelitian.delete({
			where: {
				id: parseInt(id),
			},
		});
		return res.status(200).json({ success: true, message: "Berhasil meghapus data penelitian" });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
};
