import React, { useEffect, useState } from "react";
import Bar from "../../Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser, FaLock, FaCreditCard, FaMoneyBill } from "react-icons/fa";

function Adduser() {
  const [input, setInput] = useState({
    CID: "",
    username: "",
    passrname1: "",
    password1: "",
    confirmPassword: "",
    BAnumber: "",
    GetPay: "",
    roleID: "",
  });
  const [loadRole, setLoadRole] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const role = async () => {
      let token = localStorage.getItem("token");
      try {
        const rs = await axios.get("http://localhost:8000/admin/roleuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoadRole(rs.data.role);
      } catch (error) {
        toast.error("Failed to load roles");
      }
    };
    role();
  }, []);

  const hdlChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const checkEmptyFields = () => {
    const fields = [
      { name: "CID", label: "รหัสบัตรประชาชน" },
      { name: "username", label: "ชื่อ - นามสกุล" },
      { name: "passrname1", label: "ชื่อผู้ใช้" },
      { name: "password1", label: "รหัสผ่าน" },
      { name: "confirmPassword", label: "ยืนยันรหัสผ่าน" },
      { name: "BAnumber", label: "เลขที่ธนาคาร" },
      { name: "GetPay", label: "ค่าตอบแทนเวร" },
      { name: "roleID", label: "ตำแหน่ง" }
    ];

    for (let field of fields) {
      if (!input[field.name]) {
        toast.error(`กรุณากรอก ${field.label}`);
        document.getElementById(`${field.name}`).focus();
        return false;
      }
    }
    return true;
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();

    if (!checkEmptyFields()) {
      return;
    }

    if (input.password1 !== input.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const rs = await axios.post(
        "http://localhost:8000/auth/register",
        input,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (rs.status === 200) {
        toast.success("User created successfully");
        setInput({
          CID: "",
          username: "",
          passrname1: "",
          password1: "",
          confirmPassword: "",
          BAnumber: "",
          GetPay: "",
          roleID: "",
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const hdlReload = () => {
    setInput({
      CID: "",
      username: "",
      passrname1: "",
      password1: "",
      confirmPassword: "",
      BAnumber: "",
      GetPay: "",
      roleID: "",
    });
    document.querySelector('select[name="roleID"]').selectedIndex = 0;
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <Bar />
      <div className="flex-1 p-4 bg-gray-100">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <p className="text-2xl font-bold text-gray-800 mb-6">เพิ่มข้อมูลผู้ใช้งาน</p>
          <form className="flex flex-col gap-4">
            {/* Input fields */}
            {[
              { label: "รหัสบัตรประชาชน", name: "CID", type: "text", maxLength: 13, icon: <FaCreditCard /> },
              { label: "ชื่อ - นามสกุล", name: "username", type: "text", icon: <FaUser /> },
              { label: "ชื่อผู้ใช้", name: "passrname1", type: "text", icon: <FaUser /> },
              { label: "รหัสผ่าน", name: "password1", type: "password", minLength: 6, icon: <FaLock /> },
              { label: "ยืนยันรหัสผ่าน", name: "confirmPassword", type: "password", icon: <FaLock /> },
              { label: "เลขที่ธนาคาร", name: "BAnumber", type: "text", icon: <FaCreditCard /> },
              { label: "ค่าตอบแทนเวร", name: "GetPay", type: "text", icon: <FaMoneyBill /> },
            ].map(({ label, name, type, maxLength, minLength, icon }, idx) => (
              <div key={idx} className="flex items-center gap-3 border border-gray-300 rounded-md overflow-hidden shadow-sm">
                <div className="bg-gray-200 p-3">{icon}</div>
                <div className="flex-1 p-2">
                  <label className="block text-gray-700 mb-1 text-sm">{label}</label>
                  <input
                    className="w-full h-[35px] rounded-r-md border border-gray-300 px-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type={type}
                    name={name}
                    id={name}
                    value={input[name]}
                    onChange={hdlChange}
                    placeholder={`กรุณากรอก${label}`}
                    maxLength={maxLength}
                    minLength={minLength}
                  />
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 border border-gray-300 rounded-md overflow-hidden shadow-sm">
              <div className="bg-gray-200 p-3"><FaUser /></div>
              <div className="flex-1 p-2">
                <label className="block text-gray-700 mb-1 text-sm">ตำแหน่ง</label>
                <select
                  className="w-full h-[35px] rounded-r-md border border-gray-300 px-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="roleID"
                  id="roleID"
                  value={input.roleID}
                  onChange={hdlChange}
                >
                  <option disabled value="">เลือกตำแหน่ง</option>
                  {loadRole.map((el) => (
                    <option key={el.typeuserID} value={el.typeuserID}>
                      {el.typeuserName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={hdlSubmit}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
              >
                {loading ? "Processing..." : "สมัคร"}
              </button>
              <button
                onClick={hdlReload}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
              >
                ยกเลิก
              </button>
            </div>
          </form>
          <p className="fixed right-4 bottom-4 text-gray-400 text-sm">
            โรงพยาบาลศูนย์สกลนคร
          </p>
        </div>
      </div>
    </div>
  );
}

export default Adduser;
