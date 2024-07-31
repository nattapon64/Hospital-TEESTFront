import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bar from "../../Sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ClipLoader } from 'react-spinners';

const ReportUser = () => {
    const [typeUserID, setTypeUserID] = useState('');
    const [userTypes, setUserTypes] = useState([]);
    const [users, setUsers] = useState([]);
    const [maxCount, setMaxCount] = useState(0);
    const [skip, setSkip] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isSearch, setIsSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserTypes = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8000/admin/roleuser", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.data?.role) {
                    setUserTypes(response.data.role);
                } else {
                    console.error('Invalid response structure:', response.data);
                }
            } catch (error) {
                console.error('Error fetching user types:', error);
                setError('Failed to fetch user types.');
            }
        };
        fetchUserTypes();
    }, []);

    const handleSearch = async (skipValue = 1) => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            if (!typeUserID) {
                throw new Error("Typeuser is not defined");
            }
            const response = await axios.get(`http://localhost:8000/admin/reportuser/${typeUserID}?page=${skipValue}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data) {
                const { data = [], total = 0 } = response.data;
                setMaxCount(total);
                setUsers(data);
                setTotalPages(Math.ceil(total / 20)); // Assuming 20 items per page
                setIsSearch(true);
            } else {
                setUsers([]);
            }
        } catch (error) {
            console.error('Error searching users:', error);
            setUsers([]);
            setError('Failed to fetch users.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isSearch) {
            handleSearch(skip);
        }
    }, [isSearch, typeUserID, skip]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setSkip(page);
        }
    };

    const renderPagination = () => {
        const pageLimit = 5; // Number of pages to show at once
        const halfPageLimit = Math.floor(pageLimit / 2);
        let startPage = Math.max(1, skip - halfPageLimit);
        let endPage = Math.min(totalPages, skip + halfPageLimit);

        if (endPage - startPage < pageLimit - 1) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + pageLimit - 1);
            } else if (endPage === totalPages) {
                startPage = Math.max(1, endPage - pageLimit + 1);
            }
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <li key={i}>
                    <button
                        onClick={() => handlePageChange(i)}
                        className={`flex items-center justify-center px-3 h-8 leading-tight ${i === skip
                            ? 'text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                            }`}
                    >
                        {i}
                    </button>
                </li>
            );
        }

        return (
            <nav aria-label="Page navigation example">
                <ul className="flex items-center -space-x-px h-8 text-sm">
                    <li>
                        <button
                            onClick={() => handlePageChange(1)}
                            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${skip <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={skip <= 1}
                        >
                            First
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handlePageChange(skip - 1)}
                            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${skip <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={skip <= 1}
                        >
                            <span className="sr-only">Previous</span>
                            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                            </svg>
                        </button>
                    </li>
                    {pages}
                    <li>
                        <button
                            onClick={() => handlePageChange(skip + 1)}
                            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${skip >= totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={skip >= totalPages}
                        >
                            <span className="sr-only">Next</span>
                            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${skip >= totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={skip >= totalPages}
                        >
                            Last
                        </button>
                    </li>
                </ul>
            </nav>
        );
    };

    return (
        <div className="flex gap-4">
            <Bar />
            <div className='w-full p-6'>
                <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-3xl font-bold mb-6">รายงานผู้ใช้</h2>
                    <div className="mb-6">
                        <label htmlFor="ddlTypeUser" className="block text-gray-700 font-semibold mb-2">เลือกประเภทผู้ใช้:</label>
                        <div className="flex items-center">
                            <select
                                id="ddlTypeUser"
                                value={typeUserID}
                                onChange={(e) => setTypeUserID(e.target.value)}
                                className="flex-grow mr-4 p-2 border rounded-md border-gray-300 shadow-sm"
                            >
                                <option value="">-- เลือกประเภทผู้ใช้ --</option>
                                {userTypes.map((type) => (
                                    <option key={type.typeuserID} value={type.typeuserID}>
                                        {type.typeuserName}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={() => setIsSearch(true)}
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center shadow-md"
                                disabled={isLoading}
                            >
                                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                                ค้นหา
                            </button>
                        </div>
                    </div>
                </div>
                <p className="mb-4 text-lg">จำนวนผู้ใช้ทั้งหมด: <strong className='text-blue-600'>{maxCount}</strong> คน</p>
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
                    </div>
                ) : error ? (
                    <p className="text-red-500 text-lg">{error}</p>
                ) : users.length > 0 ? (
                    <table className="w-full table-auto border-collapse border border-gray-200 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">CID</th>
                                <th className="border border-gray-300 px-4 py-2">ชื่อผู้ใช้</th>
                                <th className="border border-gray-300 px-4 py-2">Passrname1</th>
                                <th className="border border-gray-300 px-4 py-2">Password1</th>
                                <th className="border border-gray-300 px-4 py-2">Statedit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                    <td className="border border-gray-300 px-4 py-2">{user.CID}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.passrname1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.password1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.statedit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-red-500 text-lg">No users found</p>
                )}
                {isSearch && renderPagination()}
            </div>
        </div>
    );
};

export default ReportUser;
