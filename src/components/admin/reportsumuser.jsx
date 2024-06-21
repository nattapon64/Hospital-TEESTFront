import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Barr from "../../Sidebar";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function ReportSumUser() {
    const [sumUser, setSumUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSumUser = async () => {
            try {
                let token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("ไม่พบโทเค็น");
                }

                const response = await axios.get('http://localhost:8000/admin/reportsumuser', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // console.log("API response:", response.data); // ล็อกการตอบกลับ
                setSumUser(response.data);
            } catch (err) {
                console.error("Error fetching data:", err); // ล็อกข้อผิดพลาด
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSumUser();
    }, []);

    useEffect(() => {
        // console.log("sumUser state:", sumUser); // ล็อกสถานะหลังจากตั้งค่า
    }, [sumUser]);

    if (loading) {
        return <p>กำลังโหลด...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    // ตรวจสอบว่า sumUser มีข้อมูลก่อนสร้างตัวแปร data
    const totalUsers = sumUser.reduce((acc, curr) => acc + curr.CountOfCID, 0);

    const data = sumUser.length > 0 ? {
        labels: sumUser.map(sums => sums.typeuserName),
        datasets: [
            {
                label: 'จำนวนผู้ใช้ทั้งหมด',
                data: sumUser.map(sums => sums.CountOfCID),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    } : null;

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className='flex'>
            <Barr/>
            <div className='flex flex-col w-[70%] gap-10'>
                {sumUser.length > 0 ? (
                    <>
                        <table className="w-full table-auto border-collapse border border-gray-200 mt-4">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-200 px-4 py-2">รหัสประเภทผู้ใช้</th>
                                    <th className="border border-gray-200 px-4 py-2">รายละเอียดประเภทผู้ใช้</th>
                                    <th className="border border-gray-200 px-4 py-2">จำนวนผู้ใช้ทั้งหมด</th>
                                    <th className="border border-gray-200 px-4 py-2">เปอร์เซ็นต์</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sumUser.map((sums, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                        <td className="border border-gray-200 px-4 py-2">{sums.typeuserID}</td>
                                        <td className="border border-gray-200 px-4 py-2">{sums.typeuserName}</td>
                                        <td className="border border-gray-200 px-4 py-2">{sums.CountOfCID}</td>
                                        <td className="border border-gray-200 px-4 py-2">{((sums.CountOfCID / totalUsers) * 100).toFixed(2)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {data && <Bar data={data} options={options} />}
                    </>
                ) : (
                    <p className="text-red-500">ไม่พบข้อมูลสรุป</p>
                )}
            </div>
        </div>
    );
}

export default ReportSumUser;
