
import React, { useState } from 'react';
import { X, QrCode, Check, Printer, IndianRupee } from 'lucide-react';
import PaymentOption from './PaymentOption';

interface PaymentModalProps {
  photo: string;
  onClose: () => void;
  onSuccess: () => void;
}

const PAYMENT_OPTIONS = [
  { id: 'qr', name: 'QR Code', icon: <QrCode className="w-6 h-6" /> },
  { id: 'gpay', name: 'Google Pay', icon: <span className="flex items-center justify-center w-6 h-6 text-blue-500 font-bold">G</span> },
  { id: 'phonepe', name: 'PhonePe', icon: <span className="flex items-center justify-center w-6 h-6 text-purple-500 font-bold">P</span> },
  { id: 'paytm', name: 'Paytm', icon: <span className="flex items-center justify-center w-6 h-6 text-blue-400 font-bold">P</span> }
];

const PaymentModal: React.FC<PaymentModalProps> = ({ photo, onClose, onSuccess }) => {
  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_OPTIONS[0].id);
  const [paymentStep, setPaymentStep] = useState<'select' | 'process' | 'success'>('select');
  
  const handleContinue = () => {
    setPaymentStep('process');
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep('success');
    }, 2000);
  };

  const handleFinish = () => {
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md mx-auto bg-card rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-background/80 hover:bg-background/100 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="pt-6 px-6 pb-4 border-b border-border">
          <h2 className="text-xl font-medium">Print Photo</h2>
          <p className="text-sm text-muted-foreground mt-1">₹5 per photo print</p>
        </div>
        
        <div className="p-6">
          {paymentStep === 'select' && (
            <>
              <div className="relative w-40 mx-auto aspect-[3/4] rounded-md overflow-hidden mb-6 photo-shadow">
                <img 
                  src={photo} 
                  alt="Photo to print" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2">
                  <span className="flex items-center justify-center w-6 h-6 bg-accent text-white rounded-full text-xs">
                    <Printer className="w-3 h-3" />
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Select payment method</h3>
                <div className="grid grid-cols-2 gap-3">
                  {PAYMENT_OPTIONS.map((option) => (
                    <PaymentOption
                      key={option.id}
                      id={option.id}
                      name={option.name}
                      icon={option.icon}
                      selected={selectedPayment === option.id}
                      onSelect={() => setSelectedPayment(option.id)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <div className="flex items-center">
                  <IndianRupee className="w-4 h-4 mr-1 text-muted-foreground" />
                  <span className="font-medium">5.00</span>
                </div>
                <button
                  onClick={handleContinue}
                  className="px-5 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Continue
                </button>
              </div>
            </>
          )}
          
          {paymentStep === 'process' && (
            <div className="py-10 flex flex-col items-center justify-center">
              <div className="w-32 h-32 mb-6 relative">
                {selectedPayment === 'qr' ? (
                  <div className="bg-white p-2 rounded-lg">
                    <img 
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAXNSR0IArs4c6QAABApJREFUeF7t3MGu2zAMhGH3/R+601qHFE3s2JrfBJE9ppGsWT6Csr3kx+vH6+fL//748fr5d/uL9fD4+/o+/3n7ub7e+D6f41uvrddbH2c9t15bP0+9x/rv/NxbP6///uu/13+vP2Xra63f168Zf++9tmCsn68AVqDW9/nzRD9Pva7X639fP0/9fP37Q0C8AaWe11+LQNREVeA0UFKFkByrgGkgVcAkx3oPKZDkmGQnOVaBJDlWIFYBJDkJkK//xHppbOqvT9SnG7qlX/rl7QWScEkZbQ6IaUmVKqj2aA/VWFJE7dGear6kirZcK4ZqlyTHRqZc1FiFSy1RDU0oVbHcpBqqXZIc01jVLomp2qXaJTlWOzXm1iFswGd7KoK0pOqXaoiUSSqozVC1T3KsBkuOKZsU0ZZrqDZpD9UuibFql8RQ7ZIcq10SY61D7NpoSSGlZXJTtafa1R6qPZJjtUdvOXW7qhiqmxpDFcjGS+JjukAyaQ3BQGM/ZSl9UjYZSQMi/VI/JUfKKEOpQHqrKb3SM7VPamcFTwXSGw33rQKl9kkZP60KJA3RGIqdnpbpjV5cG7t2SC/UPqmgapfEVGIqFVT7JMZSQbVPYip1VP+1dXn9pTJSA7WH9kuqUb/cRKLPBM6NTFJBASYjSi20uaSCKaBkMAHLPSe10BoEfgFLe8hIaqB7RcZLzxIwiaHURU+6BLI0Lj1PzxNIuqfkXlON9EynDNIlPU9PmwSW7qn5GvsEsBpizbSxaQzVHhlfKqiWqMZGhFJ7JEcqoObJ81I3/bWe5+ZL4Mx4qa16nmRY7ZEcqT2SY7VHciRFVHskx1JEtU9ytA4hGVSL1JKnf81QLUuGVIHUMqmg5EgFkpHUoPRnCokoOUoFksFTgWRw22N9Mx1nJIdPLXgCVk8ktUdyLMdKjqVhEmMVLK1jqoZJAdVAyZFk2HK9DqEGSoYebdhnCVIwKZueVBLIW0/F+NzI1FI9T/qj55laJhWUEUrNpIJqn5ZQZbykUqmAab9nC6ZikpHU0DTGAovGS+OodklN1TK1S3IoI6ndEkO1S2qqlkmO1sGlgnKyVE7tSe2TAqqBcnJSQMlRaqDkmAoo1VDt0pJsnVtPlZNVU8txapfaLTnWuGoPtUtyrHZLjtVuybH2UAGudQi1UCqnlkmO9dZTy6QakmPVLqmGjKT2SY6kgqo92kNiqNolOZQKas/+BZNTpdwmR6q9kmOplVouFZQcqWVSC6mg5FiqJDlK7VNDVXN/k0kqaO2o9lQP1fI0NlJBiaE0UCooMZYKSgXVPqlJW19CfR2Agaf+SJ/UYElxrc3VQHVYY6YWSI6kOtJA1RyNTeqPxmYd4g+tJWQwjNBTnAAAAABJRU5ErkJggg=="
                      alt="QR Code"
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-accent">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent"></div>
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-medium mb-2 text-center">
                {selectedPayment === 'qr' ? 'Scan to pay' : 'Processing payment...'}
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-6">
                {selectedPayment === 'qr' 
                  ? 'Scan the QR code with your payment app' 
                  : 'Please wait while we process your payment'}
              </p>
              
              <div className="flex justify-center items-center mb-2">
                <IndianRupee className="w-4 h-4 mr-1 text-muted-foreground" />
                <span className="font-medium">5.00</span>
              </div>
            </div>
          )}
          
          {paymentStep === 'success' && (
            <div className="py-10 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              
              <h3 className="text-lg font-medium mb-2">Payment Successful</h3>
              <p className="text-sm text-muted-foreground text-center mb-8">
                Your photo is being sent to the printer
              </p>
              
              <button
                onClick={handleFinish}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
