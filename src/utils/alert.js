import Swal from 'sweetalert2';

/**
 * Professional alert utility using SweetAlert2
 */
export const showAlert = {
  /**
   * Success alert
   */
  success: (title, message = '') => {
    return Swal?.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonColor: '#10b981',
      confirmButtonText: 'Great!',
      timer: 3000,
      timerProgressBar: true
    });
  },

  /**
   * Error alert
   */
  error: (title, message = '') => {
    return Swal?.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'OK'
    });
  },

  /**
   * Warning alert
   */
  warning: (title, message = '') => {
    return Swal?.fire({
      icon: 'warning',
      title: title,
      text: message,
      confirmButtonColor: '#f59e0b',
      confirmButtonText: 'Understood'
    });
  },

  /**
   * Info alert
   */
  info: (title, message = '') => {
    return Swal?.fire({
      icon: 'info',
      title: title,
      text: message,
      confirmButtonColor: '#3b82f6',
      confirmButtonText: 'Got it'
    });
  },

  /**
   * Confirmation dialog
   */
  confirm: (title, message = '', confirmText = 'Yes', cancelText = 'No') => {
    return Swal?.fire({
      icon: 'question',
      title: title,
      text: message,
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: confirmText,
      cancelButtonText: cancelText
    });
  },

  /**
   * Payment success alert with animation
   */
  paymentSuccess: (amount, transactionId = '') => {
    return Swal?.fire({
      icon: 'success',
      title: 'Payment Successful!',
      html: `
        <div class="text-center">
          <p class="text-lg mb-2">Amount: <strong>৳${amount}</strong></p>
          ${transactionId ? `<p class="text-sm text-gray-600">Transaction ID: ${transactionId}</p>` : ''}
        </div>
      `,
      confirmButtonColor: '#10b981',
      confirmButtonText: 'Continue',
      timer: 5000,
      timerProgressBar: true
    });
  },

  /**
   * Payment error alert
   */
  paymentError: (message = 'Payment failed. Please try again.') => {
    return Swal?.fire({
      icon: 'error',
      title: 'Payment Failed',
      text: message,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Try Again'
    });
  },

  /**
   * Booking confirmation alert
   */
  bookingConfirmed: (bookingId, date = '') => {
    return Swal?.fire({
      icon: 'success',
      title: 'Booking Confirmed!',
      html: `
        <div class="text-center">
          <p class="text-lg mb-2">Your booking has been confirmed</p>
          <p class="text-sm text-gray-600">Booking ID: <strong>${bookingId}</strong></p>
          ${date ? `<p class="text-sm text-gray-600 mt-1">Date: ${date}</p>` : ''}
        </div>
      `,
      confirmButtonColor: '#10b981',
      confirmButtonText: 'View Details',
      timer: 5000,
      timerProgressBar: true
    });
  },

  /**
   * Add to favorites alert
   */
  addedToFavorites: () => {
    return Swal?.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Added to Favorites',
      showConfirmButton: false,
      timer: 1500,
      toast: true
    });
  },

  /**
   * Remove from favorites alert
   */
  removedFromFavorites: () => {
    return Swal?.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Removed from Favorites',
      showConfirmButton: false,
      timer: 1500,
      toast: true
    });
  },

  /**
   * Loading alert
   */
  loading: (title = 'Processing...') => {
    return Swal?.fire({
      title: title,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
        Swal?.showLoading();
      }
    });
  },

  /**
   * Close any open alert
   */
  close: () => {
    Swal?.close();
  }
};

export default showAlert;