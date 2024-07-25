import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bar from "../../Sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

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

    const nextPage = () => {
        if (skip < totalPages) {
            setSkip((prevSkip) => prevSkip + 1);
        }
    };

    const backPage = () => {
        if (skip > 1) {
            setSkip((prevSkip) => Math.max(1, prevSkip - 1));
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setSkip(page);
        }
    };

    return (
        <div className="flex gap-4">
            <Bar />
            <div className='w-full p-6'>
                <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold mb-6">รายงานผู้ใช้</h2>
                    <div className="mb-4">
                        <label htmlFor="ddlTypeUser" className="block text-gray-700 font-semibold mb-2">เลือกประเภทผู้ใช้:</label>
                        <div className="flex items-center">
                            <select
                                id="ddlTypeUser"
                                value={typeUserID}
                                onChange={(e) => setTypeUserID(e.target.value)}
                                className="flex-grow mr-4 p-2 border rounded-md border-gray-300"
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
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center"
                                disabled={isLoading}
                            >
                                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                                ค้นหา
                            </button>
                        </div>
                    </div>
                </div>
                <p className="mb-4">จำนวนผู้ใช้ทั้งหมด: <strong>{maxCount}</strong> คน</p>
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <div className="loader">Loading...</div> {/* Add a loader CSS class here */}
                    </div>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : users.length > 0 ? (
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
                {isSearch && (
                    <div className="flex items-center justify-between mt-4">
                        <button
                            onClick={backPage}
                            className={`bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 flex items-center ${skip <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={skip <= 1 || isLoading}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                            Back
                        </button>
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-4">Page {skip} of {totalPages}</span>
                            <input
                                type="number"
                                value={skip}
                                onChange={(e) => handlePageChange(Number(e.target.value))}
                                min={1}
                                max={totalPages}
                                className="w-16 p-2 border rounded-md border-gray-300"
                            />
                        </div>
                        <button
                            onClick={nextPage}
                            className={`bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 flex items-center ${skip >= totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={skip >= totalPages || isLoading}
                        >
                            <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportUser;
