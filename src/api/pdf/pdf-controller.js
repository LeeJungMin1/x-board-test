import path from "path";
import fs from "fs";
import { findPdfPathBySessionId } from "./pdf-service.js";

export const getPdfBySessionId = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const pdfPath = await findPdfPathBySessionId(sessionId);

    if (!pdfPath) {
      return res.status(404).json({ error: "PDF not found for this session" });
    }

    const filePath = path.join(process.cwd(), pdfPath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "PDF file not found on disk" });
    }

    res.sendFile(filePath);
  } catch (error) {
    console.error("Error fetching PDF:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
