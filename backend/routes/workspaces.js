const express = require('express');
const router = express.Router();
const Workspace = require('../models/Workspace');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/workspaces
// @desc    Get all workspaces (with filters)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { city, minCapacity, minArea, maxPrice, type } = req.query;
    let query = { status: 'available' };

    if (city) query['location.city'] = new RegExp(city, 'i');
    if (minCapacity) query.capacity = { $gte: Number(minCapacity) };
    if (minArea) query.areaSize = { $gte: Number(minArea) };
    if (maxPrice) query.price = { $lte: Number(maxPrice) };
    if (type) query.type = type;

    const workspaces = await Workspace.find(query).populate('owner', 'name email company');
    res.json(workspaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/workspaces/:id
// @desc    Get single workspace
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id).populate('owner', 'name email company');
    if (workspace) {
      res.json(workspace);
    } else {
      res.status(404).json({ message: 'Workspace not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/workspaces
// @desc    Create a workspace
// @access  Private/SpaceOwner
router.post('/', protect, authorize('space_owner', 'admin'), async (req, res) => {
  try {
    const workspace = new Workspace({
      ...req.body,
      owner: req.user._id
    });

    const createdWorkspace = await workspace.save();
    res.status(201).json(createdWorkspace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/workspaces/:id
// @desc    Update a workspace
// @access  Private/SpaceOwner
router.put('/:id', protect, authorize('space_owner', 'admin'), async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    // Check if the user is the owner
    if (workspace.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to update this workspace' });
    }

    const updatedWorkspace = await Workspace.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedWorkspace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
