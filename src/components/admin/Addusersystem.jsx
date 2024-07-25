import React, { useEffect, useState } from 'react';
import Bar from "../../Sidebar";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

function Addusersystem() {
    const [sumUsersystem, setSumUsersystem] = useState([]);
    const [searchInput, setSearchInput] = useState({ searchID: "", username: "" });
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
        superuser: "0",
        office_id: "",
        typeuserName: ""
    });

    const [loadAddusersystem, setLoadAddusersystem] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const hdlChange = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const hdlSearchInputChange = (e) => {
        setSearchInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        const fetchAddusersystem = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("http://localhost:8000/admin/addusersystem", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setLoadAddusersystem(response.data.Addusersystem);
            } catch (error) {
                console.error("Error fetching addusersystem data:", error);
                toast.error("เกิดข้อผิดพลาดในการดึงข้อมูลหน่วยงาน");
            }
        };
        fetchAddusersystem();
    }, []);

    const hdlSearch = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        const { username, searchID } = searchInput;

        try {
            const response = await axios.get(
                `http://localhost:8000/admin/user?card=${searchID}&username=${username}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const user = response.data.user || null;
            if (user && (user.CID || user.username)) {
                setSelectedUser(user);
                setInput((prev) => ({ ...prev, ...user }));
            } else {
                setSelectedUser(null);
                toast.info("ไม่พบข้อมูลที่ตรงกับเงื่อนไข กรุณากรอกข้อมูลให้ครบ");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้");
        } finally {
            setLoading(false);
        }
    };

    const hdlAddUserSystem = async () => {
        const { CID, username, typeuserName, office_id } = input;

        if (!CID || !username || !typeuserName || !office_id) {
            toast.error("กรุณากรอกข้อมูลที่จำเป็นทั้งหมด");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:8000/admin/postaddusersystem", input, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                toast.success("สร้างผู้ใช้สำเร็จ");
                window.location.reload();
            }
        } catch (err) {
            toast.error("เกิดข้อผิดพลาดในการสร้างผู้ใช้");
            console.error("Error creating user:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex'>
            <Bar />
            <div className='flex flex-col mx-4 my-4 max-w-[1000px] w-full gap-4 shadow-lg p-4 bg-white rounded-lg border border-gray-300'>
                <h1 className="text-xl font-semibold text-gray-800 mb-4">เพิ่มข้อมูลผู้ใช้</h1>
                <div className='flex flex-wrap gap-4'>
                    <div className="flex flex-col w-full sm:w-1/2">
                        <label className="text-sm font-medium text-gray-600">รหัสบัตรประชาชน :</label>
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-cyan-600 focus:outline-none focus:ring-1 focus:ring-cyan-600 transition pl-10"
                                placeholder="กรอกรหัสบัตรประชาชนที่นี่..."
                                name="searchID"
                                value={searchInput.searchID}
                                onChange={hdlSearchInputChange}
                            />
                            <FontAwesomeIcon icon={faSearch} className="absolute left-2 top-2 text-gray-600 text-lg" />
                        </div>
                    </div>
                    <div className="flex flex-col w-full sm:w-1/2">
                        <label className="text-sm font-medium text-gray-600">ชื่อ - นามสกุล :</label>
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-cyan-600 focus:outline-none focus:ring-1 focus:ring-cyan-600 transition pl-10"
                                placeholder="กรอกชื่อ - นามสกุลที่นี่..."
                                name="username"
                                value={searchInput.username}
                                onChange={hdlSearchInputChange}
                            />
                            <FontAwesomeIcon icon={faSearch} className="absolute left-2 top-2 text-gray-600 text-lg" />
                        </div>
                    </div>
                    <button
                        className={`self-end bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600 transition flex items-center ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={hdlSearch}
                        disabled={loading}
                    >
                        <FontAwesomeIcon icon={faSearch} className="mr-1 text-lg" />
                        ค้นหา
                    </button>
                </div>
                <div className="flex flex-col gap-4 mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">รหัสบัตร :</label>
                        <p className="bg-white p-2 border border-gray-300 rounded-md text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                            {selectedUser ? selectedUser.CID : "ไม่พบข้อมูล"}
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">ชื่อ - นามสกุล :</label>
                        <p className="bg-white p-2 border border-gray-300 rounded-md text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                            {selectedUser ? selectedUser.username : "ไม่พบข้อมูล"}
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">ประเภทเจ้าหน้าที่ :</label>
                        <p className="bg-white p-2 border border-gray-300 rounded-md text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                            {selectedUser ? selectedUser.typeuserName : "ไม่พบข้อมูล"}
                        </p>
                    </div>
                </div>
                <div className='flex gap-4 mt-4'>
                    <button
                        className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition flex items-center ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={hdlAddUserSystem}
                        disabled={loading}
                    >
                        <FontAwesomeIcon icon={faSave} className="mr-1 text-lg" />
                        บันทึก
                    </button>
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 transition flex items-center"
                        onClick={() => window.location.reload()}
                    >
                        <FontAwesomeIcon icon={faTimes} className="mr-1 text-lg" />
                        ยกเลิก
                    </button>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Addusersystem;
