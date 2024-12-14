import React from 'react'

function IssuedWeaponsCard({total}) {
  return (
    <div className='text-white p-3'>
    <h1 className="fs-4 fw-normal m-0">Issuded Weapons</h1>
    <span className="fs-6">you can find here issued weapons</span>
    <h1 className="fs-1 fw-bold mt-3 mb-0">Total {total}</h1>
    <p className="fs-6 text-secondary m-0">92% weapons are issued</p>
    <button className="g-btn fs-6 p-2 px-5 mx-0 mt-2">View Details</button>
</div>
  )
}

export default IssuedWeaponsCard