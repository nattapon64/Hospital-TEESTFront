import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Bar from '../../Sidebar';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function ReportsumOTU01() {
    const [loadMonth, setLoadMonth] = useState([]);
    const [maxCount, setMaxCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const [input, setInput] = useState({
        month: '',
        year: '',
        txtSName: '',
        month_ID: ""
    });
    const [reportSum, setReportSum] = useState([]);
    const [skip, setSkip] = useState(1);
    const [isSearch, setIsSearch] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [pageInput, setPageInput] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMouth = async () => {
            let token = localStorage.getItem('token');

            try {
                const rs = await axios.get("http://localhost:8000/admin/Tmouth", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLoadMonth(rs.data.mouth);
            } catch (error) {
                console.error("Error fetching month options:", error);
            }
        };
        fetchMouth();

        const today = new Date();
        const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
        setCurrentDate(formattedDate);
    }, []);

    const hdlSearch = async (page = 1) => {
        let token = localStorage.getItem('token');
        setIsLoading(true);

        try {
            const rs = await axios.get(`http://localhost:8000/admin/reportsumOTU01`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    monthOT: input.month_ID,
                    yearOT: input.year,
                    page,
                }
            });

            setReportSum(rs.data.ReportSumOTU01);
            setMaxCount(rs.data.totalRecords);
            setIsSearch(true);
            setSkip(page);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };


    const hdlChange = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const nextPage = () => {
        if (reportSum.length < 20) return;
        hdlSearch(skip + 1);
    };

    const backPage = () => {
        if (skip <= 1) return;
        hdlSearch(skip - 1);
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    const handlePageInputChange = (e) => {
        setPageInput(e.target.value);
    };

    const handlePageInputSubmit = () => {
        const page = parseInt(pageInput, 10);
        if (page && page > 0 && page <= Math.ceil(maxCount / 20)) {
            hdlSearch(page);
        }
    };

    const handleDetailsClick = () => {
        if (selectedUser) {
            navigate(`/ReMoOTDetai02/${selectedUser.CID}`, {
                state: {
                    user: selectedUser,
                    year: input.year,
                    month: loadMonth.find(el => el.ID === input.month_ID)?.Tmonth || ""
                }
            });
        }
    };

    return (
        <div className='flex'>
            <Bar />
            <div className="container mx-auto mt-8 px-5">
                <h1 className="text-2xl font-bold mb-4">บันทึกรายการเงินค่าตอบแทน(OT) รายบุคคล</h1>
                <tr>
                    <td>
                        <label htmlFor="lblDatein" className="text-left font-semibold flex m-5">วันที่บันทึก: {currentDate}</label>
                    </td>
                </tr>
                <div className='flex gap-5'>
                    <div>
                        <label htmlFor="month" className="mr-2">ประจำเดือน :</label>
                        <select
                            name="month_ID"
                            value={input.month_ID}
                            onChange={hdlChange}
                            className="border rounded px-3 py-1 outline-none"
                        >
                            {loadMonth && loadMonth.map((el, index) => (
                                <option key={index} value={el.ID}>
                                    {el.Tmonth === null ? "เลือกเดือน" : el.Tmonth}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="year" className="mr-2">ปี พ.ศ. :</label>
                        <select
                            name="year"
                            id="year"
                            value={input.year}
                            onChange={hdlChange}
                            className="border rounded px-3 py-1 outline-none"
                        >
                            <option value="">กรุณาเลือกปี</option>
                            <option value="2567">2567</option>
                            <option value="2566">2566</option>
                            <option value="2565">2565</option>
                            <option value="2564">2564</option>
                            <option value="2563">2563</option>
                            <option value="2562">2562</option>
                            <option value="2561">2561</option>
                            <option value="2560">2560</option>
                            <option value="2559">2559</option>
                            <option value="2558">2558</option>
                            <option value="2557">2557</option>
                            <option value="2556">2556</option>
                            <option value="2555">2555</option>
                        </select>
                    </div>
                    <button
                        onClick={() => hdlSearch(1)}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex items-center"
                    >
                        <FontAwesomeIcon icon={faSearch} className="mr-2" />
                        ค้นหา
                    </button>
                </div>

                <div className="mt-8">
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="mt-4">
                                        <label htmlFor="txtSName" className="mr-2">ค้นหา ชื่อ - สกุล:</label>
                                        <input
                                            type="text"
                                            id="txtSName"
                                            name="txtSName"
                                            value={input.txtSName}
                                            onChange={hdlChange}
                                            className="border rounded px-3 py-1 outline-none"
                                            style={{ width: '200px' }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-8">
                    <p className="mb-4">จำนวนผู้ใช้ทั้งหมด: <strong>{maxCount}</strong> คน</p>
                    {isLoading ? (
                        <div className="flex items-center justify-center mt-4">
                            <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.83a1 1 0 00-1.7-.7l-3.5 3.5a1 1 0 000 1.41l3.5 3.5a1 1 0 101.41-1.41L11 6.7V4a8 8 0 00-8 8z"></path>
                            </svg>
                            <p className="text-blue-500">Loading...</p>
                        </div>
                    ) : reportSum.length > 0 ? (
                        <table className="w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border border-gray-300 text-center px-4 py-2">ลำดับ</th>
                                    <th className="border border-gray-300 text-center px-4 py-2">รหัสบัตร</th>
                                    <th className="border border-gray-300 text-center px-4 py-2">ชื่อ - นามสกุล</th>
                                    <th className="border border-gray-300 text-center px-4 py-2">เงิน OT</th>
                                    <th className="border border-gray-300 text-center px-4 py-2">เงิน P4P</th>
                                    <th className="border border-gray-300 text-center px-4 py-2">เงิน 30%</th>
                                    <th className="border border-gray-300 text-center px-4 py-2">เงินบริหาร</th>
                                    <th className="border border-gray-300 text-center px-4 py-2">ค่ารักษา</th>
                                    <th className="border border-gray-300 text-center px-4 py-2">เล่าเรียน</th>
                                    <th className="border border-gray-300 text-center px-4 py-2">เงินอื่นๆ</th>
                                    <th className="border border-gray-300 text-center px-4 py-2">เพิ่ม OT</th>
                                    <th className="border border-gray-300 text-center px-4 py-2">รวมทั้งหมด</th>
                                    <th className="border border-gray-300 text-center px-4 py-2">แผนก</th>
                                    <th className="border border-gray-300 text-center px-4 py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportSum.map((el, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                        <td className="border border-gray-300 text-center px-4 py-2">{index + 1 + (skip - 1) * 50}</td>
                                        <td className="border border-gray-300 text-center px-4 py-2">{el?.CID}</td>
                                        <td className="border border-gray-300 px-4 py-2">{el?.username}</td>
                                        <td className="border border-gray-300 text-right px-4 py-2">{el?.SumOfsumOT}</td>
                                        <td className="border border-gray-300 text-right px-4 py-2">{el?.SumOfamountP4P}</td>
                                        <td className="border border-gray-300 text-right px-4 py-2">{el?.SumOfamountP30}</td>
                                        <td className="border border-gray-300 text-right px-4 py-2">{el?.SumOfamountBM}</td>
                                        <td className="border border-gray-300 text-right px-4 py-2">{el?.SumOfamount010}</td>
                                        <td className="border border-gray-300 text-right px-4 py-2">{el?.SumOfamount011}</td>
                                        <td className="border border-gray-300 text-right px-4 py-2">{el?.SumOfamount013}</td>
                                        <td className="border border-gray-300 text-right px-4 py-2">{el?.SumOfamount014}</td>
                                        <td className="border border-gray-300 text-right px-4 py-2">{el?.sumTotap4pl}</td>
                                        <td className="border border-gray-300 text-center px-4 py-2">{el?.office_id}</td>
                                        <td className="border border-gray-300 text-center px-4 py-2">
                                            <button onClick={() => handleSelectUser(el)} className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">
                                                เลือก
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-red-500">ไม่พบข้อมูล</p>
                    )}
                    {isSearch && (
                        <div className="gap-2 flex flex-row float-right mt-4 items-center">
                            <span>หน้า {skip} จากทั้งหมด {Math.ceil(maxCount / 50)}</span>
                            <button
                                onClick={backPage}
                                className={`bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 ${skip <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={skip <= 1 || isLoading}
                            >
                                Back
                            </button>
                            <button
                                onClick={nextPage}
                                className={`bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 ${reportSum.length < 50 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={reportSum.length < 50 || isLoading || (skip * 50 >= maxCount)}
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
                    )}
                </div>
                <div className="mt-8">
                    {selectedUser ? (
                        <div>
                            <p>รหัส: {selectedUser.CID}</p>
                            <p>ชื่อ - สกุล: {selectedUser.username}</p>
                            <button onClick={handleDetailsClick} className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">
                                รายละเอียด
                            </button>
                        </div>
                    ) : (
                        <p>กรุณาเลือกผู้ใช้</p>
                    )}
                </div>
                <div className="mt-8 flex justify-center">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        ส่งออก Excel
                    </button>
                    <span id="lblExcelFile" className="ml-4"></span>
                </div>
            </div>
        </div>
    );
}

export default ReportsumOTU01;
