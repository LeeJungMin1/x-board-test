import path from "path";
import fs from "fs";
import { findPdfPathBySessionId } from "./pdf-service.js";
import { handleError } from "../../utils/common-utils/error-handler.js";

export const getPdfBySessionId = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const pdfPath = await findPdfPathBySessionId(sessionId);

    if (!pdfPath) {
      return res.status(404).json({
        errorCode: "PDF_NOT_FOUND_IN_DB",
        message: "해당 세션에 대한 PDF 경로가 없습니다.",
      });
    }

    const filePath = path.join(process.cwd(), pdfPath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        errorCode: "PDF_FILE_MISSING",
        message: "PDF 파일이 디스크에 존재하지 않습니다.",
      });
    }

    res.sendFile(filePath);
  } catch (error) {
    return handleError(res, error, 500, "PDF_FETCH_FAILED");
  }
};
