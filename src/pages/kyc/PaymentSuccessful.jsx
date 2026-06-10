import React from 'react'
import DesignerPayment from '../Designer/profile/DesignerPayment'

const PaymentSuccessful = ({onNext, onPrev}) => {
  return (
    <div>
        <DesignerPayment onNext={onNext} onPrev={onPrev}/>
      
    </div>
  )
}

export default PaymentSuccessful
