// @desc    Check booking availability
// @route   POST /api/bookings/check-availability
// @access  Private
router.post('/check-availability', authenticateJWT, async (req, res, next) => {
  try {
    const { decoratorId, eventDate } = req.body;

    if (!decoratorId || !eventDate) {
      return res.status(400).json({
        success: false,
        message: 'Decorator ID and event date are required'
      });
    }

    const requestedDate = new Date(eventDate);
    
    // Check if decorator has bookings on that date
    const existingBooking = await Booking.findOne({
      decoratorId,
      eventDate: {
        $gte: new Date(requestedDate.setHours(0, 0, 0, 0)),
        $lt: new Date(requestedDate.setHours(23, 59, 59, 999))
      },
      status: { $in: ['confirmed', 'assigned', 'in-progress'] }
    });

    res.json({
      success: true,
      available: !existingBooking,
      message: existingBooking 
        ? 'Decorator is not available on this date' 
        : 'Decorator is available'
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get booking summary before payment
// @route   GET /api/bookings/:id/summary
// @access  Private
router.get('/:id/summary', authenticateJWT, async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('serviceId', 'serviceName cost unit description')
      .populate('decoratorId', 'fullName phone rating')
      .populate('customerId', 'fullName email phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check ownership
    if (booking.customerId._id.toString() !== req.user._id.toString() &&
        req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    res.json({
      success: true,
      booking: {
        ...booking.toObject(),
        subtotal: booking.totalAmount,
        tax: 0, // Add tax calculation if needed
        total: booking.totalAmount
      }
    });
  } catch (error) {
    next(error);
  }
});
