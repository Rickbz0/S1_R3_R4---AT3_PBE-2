import multer from "multer";
import path from "path";
import fs from "fs";

export default function createMulter({ pasta, tiposPermitidos, tamanhoArquivo }) {

    const uploadPath = path.resolve(`uploads/${pasta}`);

    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath); 
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const nomeArquivo = Date.now() + ext;
            cb(null, nomeArquivo);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (tiposPermitidos.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Tipo de arquivo não permitido"), false);
        }
    };

    return multer({
        storage,
        fileFilter,
        limits: { fileSize: tamanhoArquivo }
    });
}