import React, { useState } from 'react'
import Baruser from './Baruser';

function changpassuser() {
    const [input, setInput] = useState({
        CID: "",
        username: "",
        passrname1: "",
        password1: "",
        confirmPassword: "",
        BAnumber: "",
        statedit: 0,
        group30ID: "0",
        GSgroup30ID: "0",
        GetPay: "",
        roleID: "",
        admin: "0",
        superuser: "0"
    });

    const [loadRole, setLoadRole] = useState([]);

    const hdlChange = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className='flex'>
            <div>
                <Baruser />
            </div>
            <div className="flex flex-col justify-center items-center w-full space-y-6 text-center py-8">
    <div className="text-2xl font-semibold">แบบฟอร์มการเปลี่ยนรหัสผ่าน</div>
    <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="flex flex-row justify-between items-center gap-2">
            <label htmlFor="userType" className="w-1/3 text-right">ประเภทผู้ใช้ :</label>
            <input id="userType" className="border-2 border-gray-300 w-2/3 h-10 rounded px-3" />
        </div>
        <div className="flex flex-row justify-between items-center gap-2">
            <label htmlFor="idCard" className="w-1/3 text-right">รหัสบัตรประชาชน :</label>
            <input id="idCard" className="border-2 border-gray-300 w-2/3 h-10 rounded px-3" />
        </div>
        <div className="flex flex-row justify-between items-center gap-2">
            <label htmlFor="fullName" className="w-1/3 text-right">ชื่อ - นามสกุล :</label>
            <input id="fullName" className="border-2 border-gray-300 w-2/3 h-10 rounded px-3" />
        </div>
        <div className="flex flex-row justify-between items-center gap-2">
            <label htmlFor="newPassword" className="w-1/3 text-right">รหัสผ่านใหม่ :</label>
            <input type="password" id="newPassword" className="border-2 border-gray-300 w-2/3 h-10 rounded px-3" />
        </div>
        <div className="flex flex-row justify-between items-center gap-2">
            <label htmlFor="confirmPassword" className="w-1/3 text-right">ยืนยันรหัสผ่านอีกครั้ง :</label>
            <input type="password" id="confirmPassword" className="border-2 border-gray-300 w-2/3 h-10 rounded px-3" />
        </div>
    </div>
    <div className="flex gap-6 pt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300">
            บันทึก
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300">
            ยกเลิก
        </button>
    </div>
</div>

        </div>
    )
}

export default changpassuser