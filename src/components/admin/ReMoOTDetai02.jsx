import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

function ReMoOTDetai02({ year, month }) {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;
    const [selectedRow, setSelectedRow] = useState(null);
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        typeot_ID: '',
        typeot_nameL: '',
        Expr1: '',
        amountOT: '',
        officeId: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [loadAddusersystem, setLoadAddusersystem] = useState([]);

    const pageYear = location.state?.year || year;
    const pageMonth = location.state?.month || month;

    useEffect(() => {
        const fetchUserSystems = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("http://localhost:8000/admin/addusersystem", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setLoadAddusersystem(response.data.Addusersystem);
                setError(null);
            } catch (error) {
                console.error("Error fetching addusersystem:", error);
                setError('Failed to fetch user systems.');
            }
        };
        fetchUserSystems();
    }, []);

    useEffect(() => {
        if (user) {
            fetchData(user.CID, pageMonth, pageYear);
        }
    }, [user, pageMonth, pageYear]);

    const fetchData = async (CID, monthOT, yearOT) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`http://localhost:8000/admin/ReMoOTDetai02User1?monthOTThai=${monthOT}&yearOT=${yearOT}&CID=${CID}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setData(response.data.results);
            setError(null);
        } catch (err) {
            console.error('Error fetching data', err);
            setError('Error fetching data.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.patch(`http://localhost:8000/admin/updateReMoOTDetai02/${form.typeot_ID}`, form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("แก้ไขข้อมูลสำเร็จ");
            setError(null);
        } catch (err) {
            toast.error("Error updating data.");
            setError('Error updating data.');
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`http://localhost:8000/admin/DeleteAddtypeOT/${form.typeot_ID}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("ลบข้อมูลสำเร็จ", {
                onClose: () => window.location.reload(),
                autoClose: 2000,
            });
            setError(null);
        } catch (err) {
            toast.error("An error occurred while deleting data");
            setError('Error deleting data.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleSelectRow = (index) => {
        const row = data[index];
        setSelectedRow(index);
        setForm({
            typeot_ID: row?.typeot_ID || '',
            typeot_nameL: row?.typeot_nameL || '',
            Expr1: row?.Expr1 || '',
            amountOT: getFirstNonEmptyValue(row),
            officeId: row?.officeId || '',
        });
    };

    const getFirstNonEmptyValue = (row) => {
        return row?.sumOT || row?.amountP4P || row?.amountP30 || row?.amount013 || row?.amount014 || '';
    };

    const handleBack = () => {
        navigate('/reportsumOTU01');
    };

    const totalExpr1 = data.reduce((sum, el) => sum + (parseFloat(el.Expr1) || 0), 0);

    return (
        <div className="container mx-auto mt-8 px-5">
            <h1 className="text-2xl font-bold mb-4">รายละเอียด OT รายบุคคล</h1>
            {loading ? (
                <div className="flex items-center justify-center mt-4">
                    <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.83a1 1 0 00-1.7-.7l-3.5 3.5a1 1 0 000 1.41l3.5 3.5a1 1 0 101.41-1.41L11 6.7V4a8 8 0 00-8 8z"></path>
                    </svg>
                    <p className="text-blue-500">Loading...</p>
                </div>
            ) : (
                user && (
                    <div>
                        <p>รหัส: {user.CID}</p>
                        <p>ชื่อ - สกุล: {user.username}</p>
                        <p>ประจำเดือน: {pageMonth}</p>
                        <p>ปี พ.ศ.: {pageYear}</p>
                        {error && <div className="text-red-500">{error}</div>}
                        <div className="mt-4">
                            <table className="table-auto w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr>
                                        {['ลำดับ', 'รหัสบัตร', 'รหัสOT', 'รายการค่าตอบแทน', 'ยอดเงิน OT', 'ยอดเงิน P4P', 'ยอดเงิน 30%', 'เพิ่ม OT', 'เงินอื่นๆ', 'แผนก', 'ยอดรวม', ''].map((header) => (
                                            <th key={header} className="border border-gray-300 text-center px-4 py-2">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((el, index) => (
                                        <tr key={el.ID} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                            <td className="border border-gray-300 text-center px-4 py-2">{index + 1}</td>
                                            <td className="border border-gray-300 text-center px-4 py-2">{el?.ID}</td>
                                            <td className="border border-gray-300 px-4 py-2">{el?.typeot_ID}</td>
                                            <td className="border border-gray-300 text-left px-4 py-2">{el?.typeot_nameL}</td>
                                            <td className="border border-gray-300 text-right px-4 py-2">{el?.sumOT}</td>
                                            <td className="border border-gray-300 text-right px-4 py-2">{el?.amountP4P}</td>
                                            <td className="border border-gray-300 text-right px-4 py-2">{el?.amountP30}</td>
                                            <td className="border border-gray-300 text-right px-4 py-2">{el?.amount013}</td>
                                            <td className="border border-gray-300 text-right px-4 py-2">{el?.amount014}</td>
                                            <td className="border border-gray-300 text-right px-4 py-2">{el?.office_id}</td>
                                            <td className="border border-gray-300 text-center px-4 py-2">{el?.Expr1}</td>
                                            <td className="border border-gray-300 text-center px-4 py-2">
                                                <button onClick={() => handleSelectRow(index)} className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">
                                                    เลือก
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-4 bg-gray-100 border border-gray-300 p-4">
                                <h2 className="text-lg font-semibold">ยอดเงินรวม:</h2>
                                <p className="text-xl font-bold">{totalExpr1}</p>
                            </div>
                            {selectedRow !== null && (
                                <div className="mt-4">
                                    <input
                                        type="text"
                                        name="typeot_ID"
                                        value={form.typeot_ID}
                                        onChange={handleChange}
                                        className="border rounded px-3 py-1 mr-2"
                                        placeholder="รหัส"
                                    />
                                    <input
                                        type="text"
                                        name="typeot_nameL"
                                        value={form.typeot_nameL}
                                        onChange={handleChange}
                                        className="border rounded px-3 py-1 mr-2"
                                        placeholder="รายการ"
                                    />
                                    <input
                                        type="text"
                                        name="officeId"
                                        value={form.officeId}
                                        onChange={handleChange}
                                        className="border rounded px-3 py-1 mr-2"
                                        placeholder="แผนก"
                                    />
                                    {form.amountOT !== '' && (
                                        <input
                                            type="text"
                                            name="amountOT"
                                            value={form.amountOT}
                                            onChange={handleChange}
                                            className="border rounded px-3 py-1 mr-2"
                                            placeholder="ยอดเงิน"
                                        />
                                    )}
                                    <input
                                        type="number"
                                        name="Expr1"
                                        value={form.Expr1}
                                        onChange={handleChange}
                                        className="border rounded px-3 py-1 mr-2"
                                        placeholder="ยอดรวม"
                                    />
                                    <div className='flex items-center mt-3'>
                                        <label className="font-medium">รายชื่อหน่วยงาน :</label>
                                        <select
                                            className="flex justify-center items-center text-center w-[250px] h-[35px] mx-5 border-2 border-gray-300 rounded-md focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                                            name="officeId"
                                            value={form.officeId}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>กรุณาเลือก</option>
                                            {loadAddusersystem.map((el) => (
                                                <option key={el.office_id} value={el.office_id}>
                                                    {el.office_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='flex my-5'>
                                        <button
                                            onClick={handleUpdate}
                                            className={`bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 mr-2 ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={updating}
                                        >
                                            บันทึกข้อมูล
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                                        >
                                            ลบข้อมูล
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleBack}
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mt-4 flex items-center"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                            Back
                        </button>
                    </div>
                )
            )}
        </div>
    );
}

export default ReMoOTDetai02;