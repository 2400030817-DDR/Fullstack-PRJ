import express from 'express';
import { pool } from '../config/db.js';

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM donations ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {
      donorName,
      donorEmail,
      donorPhone,
      donationType,
      amount,
      itemCategory,
      quantity,
      description,
      location,
      status
    } = req.body;

    if (!donorName || !donationType) {
      return res.status(400).json({
        message: 'donorName and donationType are required'
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO donations
      (donor_name, donor_email, donor_phone, donation_type, amount, item_category, quantity, description, location, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        donorName,
        donorEmail || null,
        donorPhone || null,
        donationType,
        amount ?? null,
        itemCategory || null,
        quantity ?? null,
        description || null,
        location || null,
        status || 'pending'
      ]
    );

    const [rows] = await pool.execute(
      'SELECT * FROM donations WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
