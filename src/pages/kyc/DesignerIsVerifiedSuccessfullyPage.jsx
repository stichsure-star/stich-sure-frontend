import React from 'react'
import DesignerIsVerified from '../../components/DesignerIsVerified'

const DesignerIsVerifiedSuccessfullyPage = ({onNext ,onPrev}) => {
  return (
    <div>
      <DesignerIsVerified onNext ={onNext}  onPrev={onPrev}/>
    </div>
  )
}

export default DesignerIsVerifiedSuccessfullyPage
