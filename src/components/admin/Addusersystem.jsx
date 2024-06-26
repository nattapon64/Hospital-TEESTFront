import React, { useEffect, useState } from 'react';
import Bar from "../../Sidebar";
import axios from "axios";

function Addusersystem() {
    const [sumUsersystem, setSumUsersystem] = useState([]);
    const [searchinput, setSearchInput] = useState({
        searchID: "",
        username: ""
    });
    const [search, setsearch] = useState([])
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
        office_id: ""
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
            // console.log(rs.data.Addusersystem)
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

    const hdlAddusystem = async () => {
        try {
            const token = localStorage.getItem("token");
            const rs = await axios.post("http://localhost:8000/admin/postaddusersystem", input,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            if (rs.status === 200) {
                alert("Create user success");
                // location.reload();
            }
            console.log(rs);
            console.log(input.office_id)
        } catch (err) {
            alert(err)
        }
    }

    console.log([sumUsersystem])
    return (
        <div className='flex'>
            <Bar />
            <div className='flex flex-col mx-10 my-5 w-full gap-5'>
                <label className="text-xl font-semibold">ข้อมูลผู้ใช้ระบบเพิ่มข้อมูลการเงิน</label>
                <div className='flex gap-5'>
                    <label className="flex flex-col">
                        รหัสบัตรประชาชน :
                        <input
                            type="text"
                            className="w-64 p-2 h-[30px] border-2 border-black rounded-md focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                            placeholder="Enter text here..."
                            name="searchID"
                            value={searchinput.searchID}
                            onChange={hdlSearchInputChange}
                        />
                    </label>
                    <label className="flex flex-col">
                        ชื่อ - นามสกุล :
                        <input
                            type="text"
                            className="w-64 p-2 h-[30px] border-2 border-black rounded-md focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                            placeholder="Enter text here..."
                            name="username"
                            value={searchinput.username}
                            onChange={hdlSearchInputChange}
                        />
                    </label>
                    <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300 transition" onClick={hdlSearch}>
                        ค้นหา
                    </button>
                </div>
                <form>
                    {search.length !== 0 ? (
                        <table className="w-full table-auto border-collapse border border-gray-200 mt-4">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-200 px-4 py-2">รหัสบัตร</th>
                                    <th className="border border-gray-200 px-4 py-2">ชื่อ - นามสกุล</th>
                                    <th className="border border-gray-200 px-4 py-2">ประเภทเจ้าหน้าที่</th>
                                    <th className="border border-gray-200 px-4 py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {search.map((sumUsersystem, index) => (
                                    <tr key={sumUsersystem.CID} className="bg-white">
                                        <td className="text-center border border-gray-200 px-4 py-2">{sumUsersystem.CID}</td>
                                        <td className="text-center border border-gray-200 px-4 py-2">{sumUsersystem.username}</td>
                                        <td className="text-center border border-gray-200 px-4 py-2">{sumUsersystem.typeuserName}</td>
                                        <td className="text-center border border-gray-200 px-4 py-2"><button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded">เลือก</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>ไม่พบข้อมูลผู้ใช้งาน</p>
                    )}
                </form>

                <div className='flex flex-col gap-3'>
                    <label>
                        รหัสบัตร :
                        <input type="text" value={input.CID} onChange={hdlChange} name="CID" className="ml-2 border p-1 rounded" />
                    </label>
                    <label>
                        ชื่อ - นามสกุล :
                        <input type="text" value={input.username} onChange={hdlChange} name="username" className="ml-2 border p-1 rounded" />
                    </label>
                    <label>
                        ประเภทเจ้าหน้าที่ :
                        <input type="text" value={input.typeuserName} onChange={hdlChange} name="typeuserName" className="ml-2 border p-1 rounded" />
                    </label>
                </div>

                <div className='flex items-center mt-3'>
                    <label>รายชื่อหน่วยงาน :</label>

                    <select
                        className="flex justify-center items-center text-center w-[250px] h-[35px] mx-5 border rounded"
                        name="office_id"
                        value={input.office_id}
                        onChange={hdlChange}
                    >
                        <option value="" disabled>
                            กรุณาเลือก
                        </option>
                        {loadAddusersystem.map((el) => (
                            <option key={el.office_id} value={el.office_id}>{el.office_name}</option>
                        ))}
                    </select>
                </div>

                <div className='flex gap-5 mt-5'>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-300 transition" onClick={hdlAddusystem}>บันทึก</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-300 transition">ยกเลิก</button>
                </div>
            </div>
        </div>
    );
}

export default Addusersystem;
