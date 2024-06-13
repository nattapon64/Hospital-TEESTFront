import React from 'react'
import Baruser from './Baruser';

function reportUserOT() {
  return (
    <div className='flex'>
        <div>
        <Baruser/>
        </div>
        <div className='flex flex-col justify-center text-center items-center w-full space-y-4'>
            <div>รายงานแสดงเงินค่าตอบแทน(OT) และเงิน P4P เจ้าหน้าที่โรงพยาบาลสกลนคร</div>
            <div className='flex flex-row gap-9'>
                <div>รหัสบัตร : </div>
                <div>ชื่อ - สกุล : </div>
                <div>ประเภท : </div>
            </div>
            <div></div>
            <div></div>
        </div>
    </div>
  )
}

export default reportUserOT