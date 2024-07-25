import React, { useEffect, useState } from 'react';
import Bar from '../../Sidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddTypeOT() {
    const [input, setInput] = useState({
        typeot_ID: "",
        typeot_nameL: "",
        typeot_nameS: ""
    });
    const [addtypeOT, setAddtypeOT] = useState([]);
    const [iddel, setIddel] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    };

    const hdlAddTypeOT = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const rs = await axios.post("http://localhost:8000/admin/postAddtypeOT", input, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (rs.status === 200) {
                toast.success("เพิ่มข้อมูลสำเร็จ", {
                    onClose: () => window.location.reload(),
                    autoClose: 2000,
                });
            }
        } catch (err) {
            toast.error("An error occurred");
        }
    };

    useEffect(() => {
        const getAddTypeOT = async () => {
            try {
                const token = localStorage.getItem("token");
                const rs = await axios.get("http://localhost:8000/admin/getAddtypeOT", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setAddtypeOT(rs.data.AddtypeOT);
            } catch (err) {
                toast.error("An error occurred while fetching data");
            }
        };
        getAddTypeOT();
    }, []);

    const hdlDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            const rs = await axios.delete(`http://localhost:8000/admin/DeleteAddtypeOT/${iddel}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (rs.status === 200) {
                toast.success("ลบข้อมูลสำเร็จ", {
                    onClose: () => window.location.reload(),
                    autoClose: 2000,
                });
            }
        } catch (err) {
            toast.error("An error occurred while deleting data");
        }
    };

    const handleSelect = (typeot_ID) => {
        setIddel(typeot_ID);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Bar />
            <div className="flex-grow p-8">
                <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <ToastContainer />
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        เพิ่มข้อมูลประเภทรายการเงิน OT
                    </h2>
                    <form onSubmit={hdlAddTypeOT}>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                รหัสเงิน OT:
                            </label>
                            <input
                                type="text"
                                name="typeot_ID"
                                value={input.typeot_ID}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="กรอกรหัสเงิน OT"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                รายการเงิน OT แบบยาว:
                            </label>
                            <input
                                type="text"
                                name="typeot_nameL"
                                value={input.typeot_nameL}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="กรอกรายการเงิน OT แบบยาว"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                รายการเงิน OT แบบสั้น:
                            </label>
                            <input
                                type="text"
                                name="typeot_nameS"
                                value={input.typeot_nameS}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="กรอกรายการเงิน OT แบบสั้น"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-200"
                            >
                                บันทึก
                            </button>
                            <button
                                type="button"
                                className="w-full py-3 px-4 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition duration-200 ml-4"
                                onClick={() => setInput({ typeot_ID: "", typeot_nameL: "", typeot_nameS: "" })}
                            >
                                ยกเลิก
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-8">
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">รหัสเงิน OT</th>
                                <th className="px-4 py-2 border">รายการ OT แบบเต็ม</th>
                                <th className="px-4 py-2 border">รายการ OT แบบย่อ</th>
                                <th className="px-4 py-2 border">เลือก</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addtypeOT.map((type, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border">{type.typeot_ID}</td>
                                    <td className="px-4 py-2 border">{type.typeot_nameL}</td>
                                    <td className="px-4 py-2 border">{type.typeot_nameS}</td>
                                    <td className="px-4 py-2 border">
                                        <button
                                            onClick={() => handleSelect(type.typeot_ID)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-200"
                                        >
                                            เลือก
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {iddel && (
                        <div className="mt-4 flex items-center">
                            <button
                                onClick={hdlDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-200"
                            >
                                ลบข้อมูล
                            </button>
                            <div className="ml-4">
                                <p className="text-gray-700">รหัส: {iddel}</p>
                                <p className="text-gray-700">รายการเงิน OT: {addtypeOT.find(item => item.typeot_ID === iddel)?.typeot_nameL}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddTypeOT;
