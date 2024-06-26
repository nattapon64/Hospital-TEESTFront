import React, { useEffect, useState } from 'react';
import Bar from '../../Sidebar';
import axios from 'axios';

function ReportSumUseBA() {
    const [selectedOption, setSelectedOption] = useState('');
    const [users, setUsers] = useState([]);
    const [accountType, setAccountType] = useState('');
    const [maxCount, setMaxCount] = useState(0);

    const handleAccountTypeChange = (event) => {
        setAccountType(event.target.value);
    };

    useEffect(() => {
        if (selectedOption === 'no_account') {
            no_account();
        } else if (selectedOption === 'has_account') {
            has_account();
        }
    }, [selectedOption]);

    const no_account = () => {
        let token = localStorage.getItem("token");

        axios.get('http://localhost:8000/admin/reportsumuseBA_NULL', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('API 1 response:', response.data);
                setUsers(response.data); // เก็บข้อมูลที่ดึงมาใน state users
                setMaxCount(response.data.length); // อัปเดต state maxCount
            })
            .catch(error => {
                console.error('API 1 error:', error);
            });
    };

    const has_account = () => {
        let token = localStorage.getItem("token");

        axios.get('http://localhost:8000/admin/reportsumuseBA_NOTNULL', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('API 2 response:', response.data);
                setUsers(response.data); // เก็บข้อมูลที่ดึงมาใน state users
                setMaxCount(response.data.length); // อัปเดต state maxCount
            })
            .catch(error => {
                console.error('API 2 error:', error);
            });
    };

    return (
        <div className='flex'>
            <Bar />
            <div className='flex flex-col items-center w-full p-8 bg-white rounded-lg shadow-lg'>
                <h2 className='text-2xl font-bold mb-4'>รายงานแสดงข้อมูลเลขบัญชีเจ้าหน้าที่</h2>
                <div className='flex items-center mb-4'>
                    <input
                        type="radio"
                        id="no_account"
                        name="account"
                        value="no_account"
                        checked={selectedOption === 'no_account'}
                        onChange={() => setSelectedOption('no_account')}
                    />
                    <label htmlFor="no_account" className='ml-2'>ไม่มีเลขที่บัญชี</label>
                </div>
                <div className='flex items-center mb-4'>
                    <input
                        type="radio"
                        id="has_account"
                        name="account"
                        value="has_account"
                        checked={selectedOption === 'has_account'}
                        onChange={() => setSelectedOption('has_account')}
                    />
                    <label htmlFor="has_account" className='ml-2'>มีเลขที่บัญชี</label>
                </div>
                <div className='flex items-center mb-4'>
                    <input type="text" className='border border-gray-300 px-2 py-1 rounded-md mr-2' placeholder='ค้นหาชื่อผู้ใช้งาน' />
                    <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300'>ค้นหา</button>
                </div>
                <p className="mb-4">จำนวนผู้ใช้ทั้งหมด: <strong>{maxCount}</strong> คน</p>
                <div className='flex items-center mb-4'>
                    <label htmlFor="" className='mr-4'>เลขที่บัตรประชาชน</label>
                    <label htmlFor="">ชื่อ -  สกุล</label>
                    <button className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 ml-4 rounded-md transition duration-300'>แก้ไข</button>
                </div>
                {users.length > 0 ? (
                    <table className="w-full table-auto border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-200 px-4 py-2">CID</th>
                                <th className="border border-gray-200 px-4 py-2">ชื่อผู้ใช้</th>
                                <th className="border border-gray-200 px-4 py-2">Passrname1</th>
                                <th className="border border-gray-200 px-4 py-2">Password1</th>
                                <th className="border border-gray-200 px-4 py-2">Statedit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                    <td className="border border-gray-200 px-4 py-2">{user.CID}</td>
                                    <td className="border border-gray-200 px-4 py-2">{user.username}</td>
                                    <td className="border border-gray-200 px-4 py-2">{user.passrname1}</td>
                                    <td className="border border-gray-200 px-4 py-2">{user.password1}</td>
                                    <td className="border border-gray-200 px-4 py-2">{user.statedit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-red-500">No users found</p>
                )}
            </div>
        </div>
    );
}

export default ReportSumUseBA;
