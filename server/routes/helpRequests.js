import express from 'express';
import { pool } from '../config/db.js';

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM help_requests ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {
      requesterName,
      requesterEmail,
      requesterPhone,
      requestType,
      description,
      location,
      urgency,
      status
    } = req.body;

    if (!requesterName || !requestType || !description) {
      return res.status(400).json({
        message: 'requesterName, requestType, and description are required'
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO help_requests
      (requester_name, requester_email, requester_phone, request_type, description, location, urgency, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        requesterName,
        requesterEmail || null,
        requesterPhone || null,
        requestType,
        description,
        location || null,
        urgency || 'medium',
        status || 'open'
      ]
    );

    const [rows] = await pool.execute(
      'SELECT * FROM help_requests WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
