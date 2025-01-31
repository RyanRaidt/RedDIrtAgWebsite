import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Function to generate PDF and send email
export const sendQuoteEmail = async (recipientEmail, quoteData) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const pdfPath = path.join("quotes", `quote_${quoteData.id}.pdf`);

    // Ensure the quotes directory exists
    if (!fs.existsSync("quotes")) {
      fs.mkdirSync("quotes");
    }

    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    // PDF content
    doc.fontSize(20).text("Quote from Red Dirt Ag", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Drill Size: ${quoteData.drillSize}`);
    doc.text(`Row Units: ${quoteData.rowUnits}`);
    doc.text(`Seed Towers: ${quoteData.seedTowers}`);
    doc.text(`Total Cost: $${quoteData.totalCost.toFixed(2)}`);
    doc.end();

    writeStream.on("finish", async () => {
      // Configure email transport
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Email details
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: "Your Quote from Red Dirt Ag",
        text: "Please find your quote attached.",
        attachments: [{ filename: `quote_${quoteData.id}.pdf`, path: pdfPath }],
      };

      try {
        await transporter.sendMail(mailOptions);
        resolve("Email sent successfully!");
      } catch (error) {
        reject("Error sending email: " + error.message);
      }
    });

    writeStream.on("error", reject);
  });
};
