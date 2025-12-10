import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import showAlert from '../../../utils/alert';

const StripePaymentForm = ({ amount, onSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    district: '',
    thana: '',
    address: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setProcessing] = useState(false);
  const [testMode, setTestMode] = useState(true);

  // Stripe test card numbers for mock mode
  const TEST_CARDS = {
    success: '4242424242424242',
    decline: '4000000000000002',
    insufficient: '4000000000009995'
  };

  const districtOptions = [
    { value: 'dhaka', label: 'Dhaka' },
    { value: 'chittagong', label: 'Chittagong' },
    { value: 'sylhet', label: 'Sylhet' },
    { value: 'rajshahi', label: 'Rajshahi' },
    { value: 'khulna', label: 'Khulna' },
    { value: 'barisal', label: 'Barisal' },
    { value: 'rangpur', label: 'Rangpur' },
    { value: 'mymensingh', label: 'Mymensingh' }
  ];

  const thanaOptions = {
    dhaka: [
      { value: 'gulshan', label: 'Gulshan' },
      { value: 'dhanmondi', label: 'Dhanmondi' },
      { value: 'mirpur', label: 'Mirpur' },
      { value: 'uttara', label: 'Uttara' }
    ],
    chittagong: [
      { value: 'agrabad', label: 'Agrabad' },
      { value: 'panchlaish', label: 'Panchlaish' }
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value?.replace(/\s/g, '')?.replace(/(\d{4})/g, '$1 ')?.trim();
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else if (name === 'expiryDate') {
      // Auto-format expiry date
      const formattedValue = value?.replace(/\D/g, '')?.replace(/(\d{2})(\d)/, '$1/$2')?.slice(0, 5);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const cleanCardNumber = formData?.cardNumber?.replace(/\s/g, '');
    
    if (!cleanCardNumber || cleanCardNumber?.length !== 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    if (!formData?.cardName || formData?.cardName?.length < 3) {
      newErrors.cardName = 'Please enter the full name on card';
    }
    if (!formData?.expiryDate || !/^\d{2}\/\d{2}$/?.test(formData?.expiryDate)) {
      newErrors.expiryDate = 'Please enter expiry date in MM/YY format';
    } else {
      // Validate expiry date is not in the past
      const [month, year] = formData?.expiryDate?.split('/');
      const expiry = new Date(`20${year}`, month - 1);
      const now = new Date();
      if (expiry < now) {
        newErrors.expiryDate = 'Card has expired';
      }
    }
    if (!formData?.cvv || formData?.cvv?.length < 3) {
      newErrors.cvv = 'Please enter a valid 3-digit CVV';
    }
    if (!formData?.district) {
      newErrors.district = 'Please select your district';
    }
    if (!formData?.address || formData?.address?.length < 10) {
      newErrors.address = 'Please enter a complete billing address';
    }
    return newErrors;
  };

  const simulateStripePayment = (cardNumber) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const cleanCard = cardNumber.replace(/\s/g, '');
        
        if (cleanCard === TEST_CARDS.success) {
          resolve({
            success: true,
            transactionId: `pi_test_${Date.now()}`,
            message: 'Payment succeeded'
          });
        } else if (cleanCard === TEST_CARDS.decline) {
          reject({
            success: false,
            code: 'card_declined',
            message: 'Your card was declined'
          });
        } else if (cleanCard === TEST_CARDS.insufficient) {
          reject({
            success: false,
            code: 'insufficient_funds',
            message: 'Insufficient funds'
          });
        } else {
          // Other cards - 90% success rate
          if (Math.random() > 0.1) {
            resolve({
              success: true,
              transactionId: `pi_test_${Date.now()}`,
              message: 'Payment succeeded'
            });
          } else {
            reject({
              success: false,
              code: 'generic_decline',
              message: 'Payment failed. Please try again'
            });
          }
        }
      }, 2000);
    });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors)?.length > 0) {
      setErrors(validationErrors);
      showAlert?.error('Validation Error', 'Please check all required fields');
      return;
    }

    setProcessing(true);
    showAlert?.loading('Processing payment securely...');

    try {
      // Simulate Stripe payment processing
      const result = await simulateStripePayment(formData?.cardNumber);
      
      showAlert?.close();
      setProcessing(false);

      // Payment succeeded
      showAlert?.paymentSuccess(amount, result?.transactionId)?.then(() => {
        onSuccess?.({ 
          transactionId: result?.transactionId,
          amount,
          cardLast4: formData?.cardNumber?.slice(-4),
          cardBrand: 'visa',
          timestamp: new Date()?.toISOString(),
          billingAddress: {
            district: formData?.district,
            thana: formData?.thana,
            address: formData?.address
          }
        });
      });
    } catch (error) {
      showAlert?.close();
      setProcessing(false);
      
      // Handle different error types
      let errorMessage = 'Payment failed. Please try again.';
      if (error?.code === 'card_declined') {
        errorMessage = 'Your card was declined. Please use a different card.';
      } else if (error?.code === 'insufficient_funds') {
        errorMessage = 'Insufficient funds. Please use a different payment method.';
      }
      
      showAlert?.paymentError(errorMessage);
    }
  };

  const fillTestCard = (cardType) => {
    const testCards = {
      success: {
        cardNumber: '4242 4242 4242 4242',
        cardName: 'Test User',
        expiryDate: '12/25',
        cvv: '123'
      },
      decline: {
        cardNumber: '4000 0000 0000 0002',
        cardName: 'Test User',
        expiryDate: '12/25',
        cvv: '123'
      }
    };
    
    setFormData(prev => ({ ...prev, ...testCards?.[cardType] }));
    showAlert?.info('Test Card Filled', `Using ${cardType === 'success' ? 'successful' : 'declined'} test card`);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">Payment Details</h3>
        <div className="flex items-center gap-2">
          <Icon name="Lock" size={16} color="var(--color-success)" />
          <span className="text-xs text-success font-medium">Secure Payment</span>
        </div>
      </div>

      {/* Test Mode Banner */}
      {testMode && (
        <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="AlertTriangle" size={20} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-warning mb-2">Test Mode - Stripe Mock</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Use test card numbers below. No real charges will be made.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillTestCard('success')}
                >
                  ✅ Use Success Card
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillTestCard('decline')}
                >
                  ❌ Use Decline Card
                </Button>
              </div>
              <div className="mt-3 text-xs text-muted-foreground space-y-1">
                <p>• Success: <code className="px-1 py-0.5 bg-background rounded">4242 4242 4242 4242</code></p>
                <p>• Decline: <code className="px-1 py-0.5 bg-background rounded">4000 0000 0000 0002</code></p>
                <p>• Insufficient: <code className="px-1 py-0.5 bg-background rounded">4000 0000 0000 9995</code></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Card Details */}
      <div className="space-y-4">
        <Input
          label="Card Number"
          type="text"
          name="cardNumber"
          placeholder="4242 4242 4242 4242"
          value={formData?.cardNumber}
          onChange={handleInputChange}
          error={errors?.cardNumber}
          maxLength={19}
          required
        />

        <Input
          label="Cardholder Name"
          type="text"
          name="cardName"
          placeholder="Name as it appears on card"
          value={formData?.cardName}
          onChange={handleInputChange}
          error={errors?.cardName}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Expiry Date"
            type="text"
            name="expiryDate"
            placeholder="MM/YY"
            value={formData?.expiryDate}
            onChange={handleInputChange}
            error={errors?.expiryDate}
            maxLength={5}
            required
          />

          <Input
            label="CVV"
            type="text"
            name="cvv"
            placeholder="123"
            value={formData?.cvv}
            onChange={handleInputChange}
            error={errors?.cvv}
            maxLength={4}
            required
          />
        </div>
      </div>

      {/* Billing Address */}
      <div className="pt-4 border-t border-border space-y-4">
        <h4 className="text-sm font-heading font-semibold text-foreground">Billing Address</h4>

        <Select
          label="District"
          options={districtOptions}
          value={formData?.district}
          onChange={(value) => handleSelectChange('district', value)}
          error={errors?.district}
          placeholder="Select your district"
          required
        />

        {formData?.district && thanaOptions?.[formData?.district] && (
          <Select
            label="Thana"
            options={thanaOptions?.[formData?.district]}
            value={formData?.thana}
            onChange={(value) => handleSelectChange('thana', value)}
            placeholder="Select your thana"
          />
        )}

        <Input
          label="Street Address"
          type="text"
          name="address"
          placeholder="House/Flat number, Street name"
          value={formData?.address}
          onChange={handleInputChange}
          error={errors?.address}
          required
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4 border-t border-border">
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isProcessing}
          iconName="CreditCard"
          iconPosition="left"
        >
          {isProcessing ? 'Processing Payment...' : `Pay ৳${amount?.toLocaleString()}`}
        </Button>
      </div>

      {/* Security Note */}
      <div className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg">
        <Icon name="Shield" size={16} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground">
          Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data. Powered by Stripe.
        </p>
      </div>
    </form>
  );
};

export default StripePaymentForm;