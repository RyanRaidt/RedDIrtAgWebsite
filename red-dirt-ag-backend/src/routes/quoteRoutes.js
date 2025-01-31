import express from "express";
import { PrismaClient } from "@prisma/client";
import { sendQuoteEmail } from "../utils/emailService.js";

const router = express.Router();
const prisma = new PrismaClient();

// Generate Quote & Send via Email
router.post("/", async (req, res) => {
  try {
    const { drillSize, rowUnits, seedTowers, email } = req.body;
    const baseCostPerUnit = 50;
    const totalCost = drillSize * rowUnits * baseCostPerUnit + seedTowers * 100;

    const newQuote = await prisma.quote.create({
      data: { drillSize, rowUnits, seedTowers, totalCost },
    });

    await sendQuoteEmail(email, newQuote);

    res.json({
      message: "Quote generated and emailed successfully!",
      quote: newQuote,
    });
  } catch (error) {
    res.status(500).json({ error: "Error processing quote" });
  }
});

export default router;
