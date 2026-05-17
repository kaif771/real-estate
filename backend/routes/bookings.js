const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Workspace = require('../models/Workspace');
const { protect } = require('../middleware/auth');
const { Resend } = require('resend');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { workspaceId, startDate, endDate, guests } = req.body;

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    // Calculate total price (Simplified: assuming price is per day, calculating days difference)
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 1; // at least 1 day
    const totalPrice = days * workspace.price;

    const booking = new Booking({
      workspace: workspaceId,
      user: req.user._id,
      startDate,
      endDate,
      guests,
      totalPrice,
      status: 'pending' // requires owner approval ideally, but pending for now
    });

    const createdBooking = await booking.save();

    // Send email notification if resend is configured
    if (resend) {
      try {
        await resend.emails.send({
          from: 'onboarding@resend.dev', // Default testing domain for resend
          to: req.user.email,
          subject: 'Booking Request Received - FlexoSpaces Clone',
          html: `<p>Hi ${req.user.name},</p><p>Your booking request for <strong>${workspace.title}</strong> has been received and is currently pending approval.</p>`
        });
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
      }
    }

    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/bookings/my-bookings
// @desc    Get logged in user bookings
// @access  Private
router.get('/my-bookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('workspace', 'title location images price');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
