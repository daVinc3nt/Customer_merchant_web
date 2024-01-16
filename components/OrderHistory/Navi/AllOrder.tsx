import React from 'react'
import DetailOrder from './DetailOrder'
import Fakedata from './FakeData'
const AllOrder = () => {
  return (
    <>
        <DetailOrder
        rows={Object.values(Fakedata)}
        />
    </>
  )
}

export default AllOrder