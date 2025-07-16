import path from "path";
import fs from "fs";
import { findPdfPathBySessionId } from "./pdf-service.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const getPdfBySessionId = async (req, res) => {
  const { sessionId } = req.params;

  const pdfPath = await findPdfPathBySessionId(sessionId);

  if (!pdfPath) {
    throw new AppError(
      "해당 세션에 대한 PDF 경로가 없습니다.",
      404,
      "PDF_NOT_FOUND_IN_DB",
      { sessionId }
    );
  }

  const filePath = path.join(process.cwd(), pdfPath);

  if (!fs.existsSync(filePath)) {
    throw new AppError(
      "PDF 파일이 디스크에 존재하지 않습니다.",
      404,
      "PDF_FILE_MISSING",
      { filePath }
    );
  }

  res.sendFile(filePath);
};
