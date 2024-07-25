import React, { useEffect, useState } from "react";
import Bar from "../../Sidebar";
import axios from "axios";
import CryptoJS from "crypto-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faLock, faBank, faMoneyBillWave, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";

function Edituser() {
  const [getUser, setGetUser] = useState({});
  const [searchinput, setSearchInput] = useState({ search: "" });
  const [input, setInput] = useState({
    CID: "",
    username: "",
    passrname1: "",
    password1: "",
    confirmPassword: "",
    BAnumber: "",
    GetPay: "",
    typeuserID: "",
    statedit: 0,
    group30ID: "0",
    GSgroup30ID: "0",
    admin: "0",
    superuser: "0"
  });

  const [loadRole, setLoadRole] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8000/admin/roleuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoadRole(response.data.role);
      } catch (err) {
        console.error("Error fetching roles:", err);
      }
    };
    fetchRoles();
  }, []);

  const hdlSearch = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:8000/admin/user?CID=${searchinput.search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const user = response.data.user;
        setGetUser(user);
        setInput({
          ...user,
          CID: user.CID || "",
          username: user.username || "",
          passrname1: user.passrname1 || "",
          password1: "",
          confirmPassword: "",
          BAnumber: user.BAnumber || "",
          statedit: user.statedit || "0",
          group30ID: user.group30ID || "0",
          GSgroup30ID: user.GSgroup30ID || "0",
          GetPay: user.GetPay || "",
          roleID: user.roleID || "",
          admin: user.admin || "0",
          superuser: user.superuser || "0",
        });
        if (user.password1) {
          const decrypted = CryptoJS.AES.decrypt(user.password1, "skn@10710");
          const originalPassword = decrypted.toString(CryptoJS.enc.Utf8);
          setInput((prevInput) => ({
            ...prevInput,
            password1: originalPassword,
          }));
        }
      }
    } catch (err) {
      console.error("API error:", err.response ? err.response.data : err.message);
      alert('Error fetching user data');
    }
  };

  const hdlChange = (e) => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
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
      admin: "0",
      superuser: "0"
    });
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    if (input.password1 !== input.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`http://localhost:8000/admin/updateuser/${input.CID}`, input, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        alert("ข้อมูลถูกแก้ไขสำเร็จ");
        hdlReload();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Bar />
      <div className="flex-1 p-6 bg-teal-50">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between mb-6">
            <p className="text-3xl font-bold text-gray-800">แก้ไขข้อมูล</p>
            <div className="flex items-center gap-4">
              <label htmlFor="search" className="text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faSearch} />
                ค้นหารหัสบัตรประชาชน
              </label>
              <input
                id="search"
                className="rounded-md border border-gray-300 px-4 py-2"
                type="text"
                name="search"
                value={searchinput.search}
                onChange={(e) => setSearchInput({ search: e.target.value })}
              />
              <button
                className="bg-pink-500 text-white font-bold px-4 py-2 rounded-md hover:bg-pink-600 flex items-center gap-2"
                onClick={hdlSearch}
              >
                <FontAwesomeIcon icon={faSearch} />
                ค้นหา
              </button>
            </div>
          </div>

          <form onSubmit={hdlSubmit} className="space-y-4">
            {/* Form Fields */}
            <div className="flex items-center gap-4">
              <label htmlFor="CID" className="w-40 text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} />
                รหัสบัตรประชาชน :
              </label>
              <input
                id="CID"
                className="flex-1 border border-gray-300 rounded-md px-4 py-2"
                type="text"
                name="CID"
                maxLength={13}
                value={input.CID}
                onChange={hdlChange}
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="username" className="w-40 text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} />
                ชื่อ - นามสกุล :
              </label>
              <input
                id="username"
                className="flex-1 border border-gray-300 rounded-md px-4 py-2"
                type="text"
                name="username"
                value={input.username}
                onChange={hdlChange}
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="passrname1" className="w-40 text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} />
                Username :
              </label>
              <input
                id="passrname1"
                className="flex-1 border border-gray-300 rounded-md px-4 py-2"
                type="text"
                name="passrname1"
                value={input.passrname1}
                onChange={hdlChange}
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="password1" className="w-40 text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faLock} />
                รหัสผ่าน :
              </label>
              <input
                id="password1"
                className="flex-1 border border-gray-300 rounded-md px-4 py-2"
                type="text"
                name="password1"
                minLength={6}
                value={input.password1}
                onChange={hdlChange}
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="confirmPassword" className="w-40 text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faLock} />
                ยืนยันรหัสผ่าน :
              </label>
              <input
                id="confirmPassword"
                className="flex-1 border border-gray-300 rounded-md px-4 py-2"
                type="password"
                name="confirmPassword"
                value={input.confirmPassword}
                onChange={hdlChange}
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="BAnumber" className="w-40 text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faBank} />
                เลขที่ธนาคาร :
              </label>
              <input
                id="BAnumber"
                className="flex-1 border border-gray-300 rounded-md px-4 py-2"
                type="text"
                name="BAnumber"
                value={input.BAnumber}
                onChange={hdlChange}
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="GetPay" className="w-40 text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faMoneyBillWave} />
                ค่าตอบแทนเวร :
              </label>
              <input
                id="GetPay"
                className="flex-1 border border-gray-300 rounded-md px-4 py-2"
                type="text"
                name="GetPay"
                value={input.GetPay}
                onChange={hdlChange}
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="role" className="w-40 text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faEdit} />
                ตำแหน่ง :
              </label>
              <select
                id="role"
                className="flex-1 border border-gray-300 rounded-md px-4 py-2"
                name="roleID"
                value={input.roleID}
                onChange={hdlChange}
              >
                {loadRole && loadRole.map((el) => (
                  <option key={el.typeuserID} value={el.typeuserID}>
                    {el.typeuserName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faEdit} />
                แก้ไขข้อมูล
              </button>
              <button
                type="button"
                onClick={hdlReload}
                className="bg-gray-500 text-white font-bold px-4 py-2 rounded-md hover:bg-gray-600 flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faTimes} />
                ยกเลิก
              </button>
            </div>
          </form>
        </div>

        <p className="fixed right-10 bottom-5 text-gray-500">
          โรงพยาบาลศูนย์สกลนคร
        </p>
      </div>
    </div>
  );
}

export default Edituser;
