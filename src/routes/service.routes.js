// @desc    Get recommended services for user
// @route   GET /api/services/recommended
// @access  Private
router.get('/recommended', authenticateJWT, async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Get user's booking history
    const userBookings = await Booking.find({ customerId: userId })
      .populate('serviceId')
      .limit(10);

    // Get categories user has booked
    const bookedCategories = [...new Set(
      userBookings.map(b => b.serviceId?.serviceCategory).filter(Boolean)
    )];

    let recommendedServices;

    if (bookedCategories.length > 0) {
      // Recommend services from same categories
      recommendedServices = await Service.find({
        serviceCategory: { $in: bookedCategories },
        isActive: true,
        _id: { $nin: userBookings.map(b => b.serviceId?._id).filter(Boolean) }
      })
      .sort({ 'rating.average': -1 })
      .limit(6);
    } else {
      // No history - show popular services
      recommendedServices = await Service.find({ isActive: true })
        .sort({ 'rating.average': -1, 'rating.count': -1 })
        .limit(6);
    }

    res.json({
      success: true,
      services: recommendedServices,
      reason: bookedCategories.length > 0 
        ? 'Based on your booking history' 
        : 'Popular services'
    });
  } catch (error) {
    next(error);
  }
});
