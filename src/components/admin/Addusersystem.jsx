import React, { useEffect, useState } from 'react';
import Bar from "../../Sidebar";
import axios from "axios";

function Addusersystem() {
    const [sumUsersystem, setSumUsersystem] = useState([]);
    const [searchinput, setSearchInput] = useState({
        searchID: "",
        username: ""
    });
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

    const [loadAddusersystem, setLoadAddusersystem] = useState([]);

    const hdlChange = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const hdlSearchInputChange = (e) => {
        setSearchInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        const addusersystem = async () => {
            let token = localStorage.getItem("token");

            const rs = await axios.get("http://localhost:8000/admin/addusersystem", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLoadAddusersystem(rs.data.Addusersystem);
        };
        addusersystem();
    }, []);

    const hdlSearch = async () => {
        let token = localStorage.getItem("token");

        const username = searchinput.username
        const card = searchinput.searchID

        try {
            const rs = await axios.get(
                `http://localhost:8000/admin/user?card=${card}&username=${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            // console.log(rs.data.user); // ตรวจสอบข้อมูลที่ตอบกลับจาก API
            const user = rs.data.user || [];
console.log(user)
            setSumUsersystem(user);
            // console.log(user)
            if (user !== "") {
                setInput(user);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    console.log([sumUsersystem])

    return (
        <div className='flex'>
            <Bar />
            <div className='flex flex-col mx-10 my-5 w-full gap-5'>
                <label>ข้อมูลผู้ใข้ระบบเพิ่มข้อมูลการเงิน</label>
                <div className='flex gap-5'>
                    <label>รหัสบัตรประชาชน</label>
                    <input
                        type="text"
                        className="w-64 p-2 h-[30px] border-2 border-black rounded-md focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                        placeholder="Enter text here..."
                        name="searchID"
                        onChange={hdlSearchInputChange}
                    />
                    <label>ชื่อ - นามสกุล</label>
                    <input
                        type="text"
                        className="w-64 p-2 h-[30px] border-2 border-black rounded-md focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                        placeholder="Enter text here..."
                        name="username"
                        onChange={hdlSearchInputChange}
                    />
                    <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300 transition" onClick={hdlSearch}>
                        ค้นหา
                    </button>
                </div>
                {/* <p className="mb-4">จำนวนผู้ใช้ทั้งหมด: <strong>{[sumUsersystem]}</strong> คน</p> */}
                <table className="w-full table-auto border-collapse border border-gray-200 mt-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-200 px-4 py-2">รหัสบัตร</th>
                                <th className="border border-gray-200 px-4 py-2">ชื่อ - นามสกุล</th>
                                <th className="border border-gray-200 px-4 py-2">ประเภทเจ้าหน้าที่</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={1} className="bg-white">
                                <td className="text-center border border-gray-200 px-4 py-2">{sumUsersystem.CID}</td>
                                <td className="text-center border border-gray-200 px-4 py-2">{sumUsersystem.username}</td>
                                <td className="text-center border border-gray-200 px-4 py-2">{sumUsersystem.typeuserName}</td>
                            </tr>
                        </tbody>
                    </table>
                {/* {sumUsersystem.length > 0 ? (
                    <table className="w-full table-auto border-collapse border border-gray-200 mt-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-200 px-4 py-2">รหัสบัตร</th>
                                <th className="border border-gray-200 px-4 py-2">ชื่อ - นามสกุล</th>
                                <th className="border border-gray-200 px-4 py-2">ประเภทเจ้าหน้าที่</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={1} className="bg-white">
                                <td className="text-center border border-gray-200 px-4 py-2">{sumUsersystem.CID}</td>
                                <td className="text-center border border-gray-200 px-4 py-2">{sumUsersystem.username}</td>
                                <td className="text-center border border-gray-200 px-4 py-2">{sumUsersystem.typeuserName}</td>
                            </tr>
                        </tbody>
                    </table>
                ): (
                    <p className="text-red-500">ไม่พบข้อมูล</p>
                )

                } */}

                <div className='flex flex-col'>
                    <label>รหัสบัตร :</label>
                    <label>ชื่อ - นามสกุล :</label>
                    <label>ประเภทเจ้าหน้าที่ :</label>
                </div>
                <div className='flex'>
                    <label>รายชื่อหน่วยงาน  :</label>
                    <select
                        className="flex justify-center items-center text-center w-[250px] h-[35px] mx-5"
                        name="roleID"
                        onChange={hdlChange}
                    >
                        {loadAddusersystem &&
                            loadAddusersystem.map((el) => (
                                <option key={el.office_id} value={el.office_id}>{el.office_name}</option>
                            ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Addusersystem;
