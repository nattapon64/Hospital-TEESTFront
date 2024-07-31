import React, { useEffect, useState } from "react";
import Bar from "../../Sidebar";
import axios from "axios";
import CryptoJS from "crypto-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faLock, faBank, faMoneyBillWave, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function Edituser() {
  const [getUser, setGetUser] = useState({});
  const [searchInput, setSearchInput] = useState({ search: "" });
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
  const [loading, setLoading] = useState(false);

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
        toast.error("Error fetching roles");
      }
    };
    fetchRoles();
  }, []);

  const hdlSearch = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/admin/userID/ID?CID=${searchInput.search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API Response:", response.data); // Log the response
      if (response.status === 200) {
        const user = response.data.user || {}; // Ensure user is always an object
        console.log("User Data:", user); // Log the user data
        setGetUser(user);
        setInput({
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
          typeuserID: user.typeuserID || "",
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
      } else {
        toast.warning("No user found");
      }
    } catch (err) {
      console.error("API error:", err.response ? err.response.data : err.message);
      toast.error("Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  const hdlChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
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
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`http://localhost:8000/admin/updateuser/${input.CID}`, input, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        toast.success("ข้อมูลถูกแก้ไขสำเร็จ");
        hdlReload();
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(input.typeuserID)
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
                value={searchInput.search}
                onChange={(e) => setSearchInput({ search: e.target.value })}
              />
              <button
                className={`bg-pink-500 text-white font-bold px-4 py-2 rounded-md hover:bg-pink-600 flex items-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={hdlSearch}
                disabled={loading}
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
                หมายเลขบัญชี :
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
                เงินเดือน :
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
              <label htmlFor="roleID" className="w-40 text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} />
                สิทธิ์ผู้ใช้ :
              </label>
              <select
                id="roleID"
                className="flex-1 border border-gray-300 rounded-md px-4 py-2"
                name="typeuserID"
                value={input.typeuserID}
                onChange={hdlChange}
              >
                <option disabled value="">Select Role</option>
                {loadRole.map((role) => (
                  <option hidden={role.typeuserID === "00"} key={role.typeuserID} value={role.typeuserID}>
                    {role.typeuserName}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="flex items-center gap-4">
              <label htmlFor="admin" className="w-40 text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} />
                Admin :
              </label>
              <input
                id="admin"
                className="border border-gray-300 rounded-md px-4 py-2"
                type="checkbox"
                name="admin"
                checked={input.admin === "1"}
                onChange={(e) => setInput((prev) => ({ ...prev, admin: e.target.checked ? "1" : "0" }))}
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="superuser" className="w-40 text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} />
                Superuser :
              </label>
              <input
                id="superuser"
                className="border border-gray-300 rounded-md px-4 py-2"
                type="checkbox"
                name="superuser"
                checked={input.superuser === "1"}
                onChange={(e) => setInput((prev) => ({ ...prev, superuser: e.target.checked ? "1" : "0" }))}
              />
            </div> */}
            <div className="flex justify-between">
              <button
                type="submit"
                className={`bg-green-500 text-white font-bold px-4 py-2 rounded-md hover:bg-green-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                <FontAwesomeIcon icon={faEdit} />
                แก้ไข
              </button>
              <button
                type="button"
                onClick={hdlReload}
                className="bg-gray-500 text-white font-bold px-4 py-2 rounded-md hover:bg-gray-600"
              >
                <FontAwesomeIcon icon={faTimes} />
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edituser;
