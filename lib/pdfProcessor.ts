import { PDFDocument } from "pdf-lib";

export async function processPdf(file: File, mode: string) {
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

  for (let i = 0; i < pages.length; i += perPage) {
    const newPage = newPdf.addPage([595, 842]); // A4

    const chunk = pages.slice(i, i + perPage);

    const cellWidth = 595 / cols;
    const cellHeight = 842 / rows;

    for (let j = 0; j < chunk.length; j++) {
      const p = chunk[j];
      const embedded = await newPdf.embedPage(p);

      const row = Math.floor(j / cols);
      const col = j % cols;

      newPage.drawPage(embedded, {
        x: col * cellWidth,
        y: 842 - (row + 1) * cellHeight,
        width: cellWidth,
        height: cellHeight,
      });
    }
  }

  return await newPdf.save();
}
