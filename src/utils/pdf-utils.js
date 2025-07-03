import fs from "fs";
import path from "path";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { getDeviceNameById } from "../api/device/device-model.js";

export const generatePdfBuffer = async (
  CheckDetail,
  start_time,
  end_time,
  uid
) => {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "templates",
    "report.pdf"
  );
  const fontPath = path.join(
    process.cwd(),
    "src",
    "templates",
    "NanumGothicBold.otf"
  );
  const existingPdfBytes = fs.readFileSync(templatePath);
  const fontBytes = fs.readFileSync(fontPath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);
  const customFont = await pdfDoc.embedFont(fontBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const [inspectionDate, startTime] = start_time.split(" ");
  const endTimeOnly = end_time.split(" ")[1];

  // 기본 정보
  firstPage.drawText(inspectionDate, {
    x: 170,
    y: 748,
    size: 12,
    font: customFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(uid, {
    x: 435,
    y: 748,
    size: 12,
    font: customFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(startTime, {
    x: 170,
    y: 722,
    size: 12,
    font: customFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(endTimeOnly, {
    x: 430,
    y: 722,
    size: 12,
    font: customFont,
    color: rgb(0, 0, 0),
  });

  let y = 622;
  const rowHeight = 23;

  const enhancedData = await Promise.all(
    CheckDetail.map(async (item) => ({
      ...item,
      deviceName: (await getDeviceNameById(item.device_id)) || "Unknown",
    }))
  );

  enhancedData.forEach((item) => {
    const name =
      typeof item.deviceName === "object"
        ? item.deviceName.device_name
        : item.deviceName;

    firstPage.drawText(name, {
      x: 103,
      y,
      size: 10,
      font: customFont,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(item.value || "", {
      x: 335,
      y,
      size: 10,
      font: customFont,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(item.memo || "", {
      x: 430,
      y,
      size: 10,
      font: customFont,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  });

  return await pdfDoc.save();
};
