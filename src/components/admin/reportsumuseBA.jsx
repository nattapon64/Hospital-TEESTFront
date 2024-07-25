import React, { useEffect, useState } from 'react';
import Bar from '../../Sidebar';
import axios from 'axios';

function ReportSumUseBA() {
    const [selectedOption, setSelectedOption] = useState('');
    const [users, setUsers] = useState([]);
    const [maxCount, setMaxCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInput, setPageInput] = useState('');
    const [pageSize] = useState(50); // Adjust the page size here

    useEffect(() => {
        fetchData();
    }, [selectedOption, currentPage]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const endpoint = selectedOption === 'no_account' ? 'reportsumuseBA_NULL' : 'reportsumuseBA_NOTNULL';
            const token = localStorage.getItem("token");

            const response = await axios.get(`http://localhost:8000/admin/${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    page: currentPage,
                    limit: pageSize // Ensure limit is sent to API
                }
            });

            setUsers(response.data.results || []);
            setMaxCount(response.data.maxCount || 0);
        } catch (error) {
            console.error('Error fetching data:', error);
            setUsers([]);
            setMaxCount(0);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = () => {
        fetchData();
    };

    const handlePageChange = (delta) => {
        setCurrentPage(prevPage => Math.max(1, Math.min(prevPage + delta, Math.ceil(maxCount / pageSize))));
    };

    const handlePageInputChange = (e) => {
        setPageInput(e.target.value);
    };

    const handlePageInputSubmit = () => {
        const page = parseInt(pageInput, 10);
        if (page && page > 0 && page <= Math.ceil(maxCount / pageSize)) {
            setCurrentPage(page);
        }
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
                    <input
                        type="text"
                        className='border border-gray-300 px-2 py-1 rounded-md mr-2'
                        placeholder='ค้นหาชื่อผู้ใช้งาน'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button
                        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300'
                        onClick={handleSearch}
                    >
                        ค้นหา
                    </button>
                </div>
                <p className="mb-4">จำนวนผู้ใช้ทั้งหมด: <strong>{maxCount}</strong> คน</p>
                {isLoading ? (
                    <div className="flex items-center justify-center mt-4">
                        <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.83a1 1 0 00-1.7-.7l-3.5 3.5a1 1 0 000 1.41l3.5 3.5a1 1 0 101.41-1.41L11 6.7V4a8 8 0 00-8 8z"></path>
                        </svg>
                        <p className="text-blue-500">Loading...</p>
                    </div>
                ) : users.length > 0 ? (
                    <table className="w-full table-auto border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-200 px-4 py-2">เลขที่บัตร</th>
                                <th className="border border-gray-200 px-4 py-2">ชื่อ - สกุล</th>
                                <th className="border border-gray-200 px-4 py-2">เลขที่ธนาคาร</th>
                                <th className="border border-gray-200 px-4 py-2">ค่าเวร</th>
                                <th className="border border-gray-200 px-4 py-2">ประเภทเจ้าหน้าที่</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                    <td className="border border-gray-200 px-4 py-2">{user.CID}</td>
                                    <td className="border border-gray-200 px-4 py-2">{user.username}</td>
                                    <td className="border border-gray-200 px-4 py-2">{user.BAnumber}</td>
                                    <td className="border border-gray-200 px-4 py-2">{user.Getpay}</td>
                                    <td className="border border-gray-200 px-4 py-2">{user.typeuserName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-red-500">ไม่พบผู้ใช้งาน</p>
                )}
                <div className="flex items-center gap-2 mt-4">
                    <span>หน้า {currentPage} จากทั้งหมด {Math.ceil(maxCount / pageSize)}</span>
                    <button
                        onClick={() => handlePageChange(-1)}
                        className={`bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={currentPage <= 1 || isLoading}
                    >
                        Back
                    </button>
                    <button
                        onClick={() => handlePageChange(1)}
                        className={`bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 ${currentPage * pageSize >= maxCount ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={currentPage * pageSize >= maxCount || isLoading}
                    >
                        Next
                    </button>
                    <input
                        type="number"
                        value={pageInput}
                        onChange={handlePageInputChange}
                        className="border rounded px-3 py-1 outline-none"
                        placeholder="Go to page"
                    />
                    <button
                        onClick={handlePageInputSubmit}
                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
                    >
                        Go
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReportSumUseBA;
