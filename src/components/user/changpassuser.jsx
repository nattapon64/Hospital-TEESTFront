import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Baruser from './Baruser';
import useAuth from '../../hooks/useAuth';
import AuthContexts from '../../contexts/AuthContexts';

function Changpassuser() {
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

    const { user } = useAuth(AuthContexts)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setError("");
            try {
                const CID = user?.CID
                console.log(CID)
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No token found");

                const response = await axios.get(`http://localhost:8000/user/getUserID?CID=${CID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    const user = response.data.user;
                    setInput({
                        ...user,
                        password1: "",
                        confirmPassword: ""
                    });
                console.log(response)
                } else {
                    throw new Error("Failed to fetch user data");
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Failed to fetch user data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const hdlChange = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (input.password1 !== input.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (!input.password1 || !input.confirmPassword) {
            setError("Please fill out all password fields");
            return;
        }

        setLoading(true);
        setError(""); // Clear previous errors

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token found");

            const response = await axios.patch(`http://localhost:8000/user/updatepass/${input.CID}`,
                { password1: input.password1 },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status === 200) {
                alert("Password updated successfully");
                setInput({
                    ...input,
                    password1: "",
                    confirmPassword: ""
                });
            } else {
                throw new Error("Failed to update password");
            }
        } catch (err) {
            console.error("Error updating password:", err);
            setError("Error updating password");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setInput({
            ...input,
            password1: "",
            confirmPassword: ""
        });
        setError(""); // Clear error when canceling
    };

    return (
        <div className='flex'>
            <div>
                <Baruser />
            </div>
            <div className="flex flex-col justify-center items-center w-full space-y-6 text-center py-8">
                <div className="text-2xl font-semibold">แบบฟอร์มการเปลี่ยนรหัสผ่าน</div>
                {error && <div className="text-red-500">{error}</div>} {/* Display general errors */}
                <div className="flex flex-col gap-4 w-full max-w-md">
                    <div className="flex flex-row justify-between items-center gap-2">
                        <label htmlFor="CID" className="w-1/3 text-right">รหัสบัตรประชาชน :</label>
                        <span className="w-2/3">{input.CID}</span>
                    </div>
                    <div className="flex flex-row justify-between items-center gap-2">
                        <label htmlFor="username" className="w-1/3 text-right">ชื่อ - นามสกุล :</label>
                        <span className="w-2/3">{input.username}</span>
                    </div>
                    <div className="flex flex-row justify-between items-center gap-2">
                        <label htmlFor="passrname1" className="w-1/3 text-right">Username :</label>
                        <span className="w-2/3">{input.passrname1}</span>
                    </div>
                    <div className="flex flex-row justify-between items-center gap-2">
                        <label htmlFor="password1" className="w-1/3 text-right">รหัสผ่านใหม่ :</label>
                        <input
                            type="password"
                            id="password1"
                            name="password1"
                            className="border-2 border-gray-300 w-2/3 h-10 rounded px-3"
                            value={input.password1}
                            onChange={hdlChange}
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center gap-2">
                        <label htmlFor="confirmPassword" className="w-1/3 text-right">ยืนยันรหัสผ่านอีกครั้ง :</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="border-2 border-gray-300 w-2/3 h-10 rounded px-3"
                            value={input.confirmPassword}
                            onChange={hdlChange}
                        />
                    </div>
                </div>
                <div className="flex gap-6 pt-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'กำลังบันทึก...' : 'บันทึก'}
                    </button>
                    <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300"
                        onClick={handleCancel}
                    >
                        ยกเลิก
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Changpassuser;
