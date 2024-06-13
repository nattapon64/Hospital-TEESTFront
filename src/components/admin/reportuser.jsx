import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bar from "../../Sidebar";

const ReportUser = () => {
    const [typeUserID, setTypeUserID] = useState('');
    const [userTypes, setUserTypes] = useState([]);
    const [users, setUsers] = useState([]);
    const [maxCount, setMaxCount] = useState(0);
    const [skipstudent, setSkipstudent] = useState(0);
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        const fetchUserTypes = async () => {
            try {
                let token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8000/admin/roleuser", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('API response for user types:', response);
                if (response.data && response.data.role) {
                    setUserTypes(response.data.role);
                } else {
                    console.error('Invalid response structure:', response.data);
                }
            } catch (error) {
                console.error('Error fetching user types:', error);
            }
        };
        fetchUserTypes();
    }, []);

    const handleSearch = async (skip = 0) => {
        try {
            let token = localStorage.getItem("token");
            if (!typeUserID) {
                throw new Error("Typeuser is not defined");
            }
            const response = await axios.get(`http://localhost:8000/admin/reportuser/${typeUserID}?skip=${skip}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('API response for users:', response);
            if (response.data && response.data.user) {
                setMaxCount(response.data.totalCount || 0);
                setUsers(response.data.user);
                setIsSearch(true);
            } else {
                console.error('Invalid user data:', response.data);
                setUsers([]);
            }
        } catch (error) {
            console.error('Error searching users:', error);
            setUsers([]);
        }
    };

    useEffect(() => {
        if (isSearch) {
            handleSearch(skipstudent);
        }
    }, [skipstudent]);

    const nextPage = () => {
        setSkipstudent((skip) => skip + 10);
    };

    const backPage = () => {
        setSkipstudent((skip) => Math.max(0, skip - 10));
    };

    return (
        <div className="flex gap-2">
            <Bar />
            <div className='w-full'>
                <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-xl font-bold mb-6">รายงานผู้ใช้</h2>
                    <div className="mb-4">
                        <label htmlFor="ddlTypeUser" className="block text-gray-700 font-semibold mb-2">เลือกประเภทผู้ใช้:</label>
                        <div className="flex">
                            <select
                                id="ddlTypeUser"
                                value={typeUserID}
                                onChange={(e) => setTypeUserID(e.target.value)}
                                className="flex-grow mr-4 p-2 border rounded"
                            >
                                <option value="">-- เลือกประเภทผู้ใช้ --</option>
                                {userTypes.map((type) => (
                                    <option key={type.typeuserID} value={type.typeuserID}>
                                        {type.typeuserName}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={() => handleSearch()}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                            >
                                ค้นหา
                            </button>
                        </div>
                    </div>
                </div>
                <p className="mb-4">จำนวนผู้ใช้ทั้งหมด: <strong>{maxCount}</strong> คน</p>
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
                <div className="gap-2 flex flex-row float-right">
                    <button 
                        onClick={backPage} 
                        className={`btn btn-outline btn-error ${skipstudent <= 0 ? 'disabled:opacity-50' : ''}`}
                        disabled={skipstudent <= 0}
                    >
                        back
                    </button>
                    <button 
                        onClick={nextPage} 
                        className={`btn btn-outline btn-success ${skipstudent + 10 >= maxCount ? 'disabled:opacity-50' : ''}`}
                        disabled={skipstudent + 10 >= maxCount}
                    >
                        next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportUser;
