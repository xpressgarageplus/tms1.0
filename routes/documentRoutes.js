const express = require('express');
const router = express.Router();
const { Document } = require('../models');
const { Op } = require('sequelize');
const multer = require('multer');

// Setup multer for file uploads
const upload = multer({ dest: 'uploads/' });

// GET /api/documents — list documents with pagination, search, filters
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const {
      type,
      search,
      sortField = 'createdAt',
      sortOrder = 'DESC'
    } = req.query;

    const where = {};

    // Filter by associatedWith type
    if (type) {
      where.associatedWith = type;
    }

    // Case-insensitive search (filename or referenceId)
    if (search) {
      where[Op.or] = [
        { filename: { [Op.iLike]: `%${search}%` } },
        { referenceId: { [Op.iLike]: `%${search}%` } }
      ];
    }

    // Validate sort field to prevent injection
    const allowedFields = ['createdAt', 'filename', 'associatedWith'];
    const orderBy = allowedFields.includes(sortField) ? sortField : 'createdAt';
    const direction = ['ASC', 'DESC'].includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'DESC';

    const { count, rows: documents } = await Document.findAndCountAll({
      where,
      limit,
      offset,
      order: [[orderBy, direction]]
    });

    const totalPages = Math.ceil(count / limit);
    res.json({ documents, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// POST /api/documents/upload — upload new document
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const {
      uploadedBy,
      associatedWith,
      referenceId,
      category,
      folder,
      tags
    } = req.body;

    const { filename, originalname, mimetype, size } = req.file;

    await Document.create({
      filename,
      originalname,
      uploadedBy,
      associatedWith,
      referenceId,
      category,
      folder,
      tags,
      mimetype,
      size
    });

    res.status(200).json({ message: 'Document uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
