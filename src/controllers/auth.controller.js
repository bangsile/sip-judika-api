import prisma from "../libs/prisma-libs.js";
import { hashPassword, verifyPassword } from "../libs/password-libs.js";

export const loginUser = async (req, res) => {
	try {
    console.log("mashookk")
		const { username, password } = req.body;
    console.log(req.body)
    console.log(username, password)
		const user = await prisma.user.findUnique({
			where: {
				username,
			},
		});
    console.log(user)
		if (user && (await verifyPassword(password, user.password))){
      console.log(user)
      return res.status(200).json({ success: true, data: { id: user.id, nama: user.nama, username: user.username, role: user.role} });
    };
    return res.status(401).json({ success: false, message: "Username atau Password Salah" });
	} catch (error) {}
};

export const loginMahasiswa = async (req, res) => {
	try {
    console.log("mashookk mhs")
		const { username, password } = req.body;
    console.log(req.body)
    console.log(username, password)
		const user = await prisma.mahasiswa.findUnique({
			where: {
				npm: username,
			},
		});
    console.log(user)
		if (user && (await verifyPassword(password, user.password))){
      console.log(user)
      return res.status(200).json({ success: true, data: { id: user.id, nama: user.nama, username: user.npm, role: user.role, detail: {no_hp: user.no_hp}} });
    };
    return res.status(401).json({ success: false, message: "Username atau Password Salah" });
	} catch (error) {}
};
export const loginDosen = async (req, res) => {
	try {
    console.log("mashookk mhs")
		const { username, password } = req.body;
    console.log(req.body)
    console.log(username, password)
		const user = await prisma.dosen.findUnique({
			where: {
				nidn: username,
			},
		});
    console.log(user)
		if (user && (await verifyPassword(password, user.password))){
      console.log(user)
      return res.status(200).json({ success: true, data: { id: user.id, nama: user.nama, username: user.nidn, role: user.role, detail: {no_hp: user.no_hp}} });
    };
    return res.status(401).json({ success: false, message: "Username atau Password Salah" });
	} catch (error) {}
};
