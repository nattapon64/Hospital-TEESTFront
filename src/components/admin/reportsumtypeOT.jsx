import React from 'react';
import Bar from '../../Sidebar';

function ReportSumTypeOT() {
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()}`;

    return (
        <div className='flex'>
            <Bar />
            <div className='ml-8'>
                <h3 className='text-2xl font-bold mb-4'>รายการสรุปประเภทค่าตอบแทน(OT)</h3>
                <p className='text-gray-700 mt-2'>วันทีบันทึก : {formattedDate}</p>
            </div>
        </div>
    );
}

export default ReportSumTypeOT;
