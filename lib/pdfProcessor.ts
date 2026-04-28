import { PDFDocument } from "pdf-lib";

export async function processPdf(
  file: File,
  mode: string,
  orientation: "portrait" | "landscape" = "portrait"
) {
  const bytes = await file.arrayBuffer();

  const pdfDoc = await PDFDocument.load(bytes);
  const newPdf = await PDFDocument.create();

  const pages = pdfDoc.getPages();

  let perPage = 9;
  let cols = 3;
  let rows = 3;

  if (mode === "2x2") {
    perPage = 4;
    cols = 2;
    rows = 2;
  } else if (mode === "1x2") {
    perPage = 2;
    cols = 1;
    rows = 2;
  }

  const A4_WIDTH = 595;
  const A4_HEIGHT = 842;

  const pageW = orientation === "landscape" ? A4_HEIGHT : A4_WIDTH;
  const pageH = orientation === "landscape" ? A4_WIDTH : A4_HEIGHT;

  if (mode === "1x2" && orientation === "landscape") {
    cols = 2;
    rows = 1;
  }

  for (let i = 0; i < pages.length; i += perPage) {
    const newPage = newPdf.addPage([pageW, pageH]); // A4

    const chunk = pages.slice(i, i + perPage);

    const cellWidth = pageW / cols;
    const cellHeight = pageH / rows;

    for (let j = 0; j < chunk.length; j++) {
      const p = chunk[j];
      const embedded = await newPdf.embedPage(p);

      const row = Math.floor(j / cols);
      const col = j % cols;

      newPage.drawPage(embedded, {
        x: col * cellWidth,
        y: pageH - (row + 1) * cellHeight,
        width: cellWidth,
        height: cellHeight,
      });
    }
  }

  return {
    pdfBytes: await newPdf.save(),
    originalPageCount: pages.length,
  };
}
