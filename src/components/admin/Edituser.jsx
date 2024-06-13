import React, { useEffect, useState } from "react";
import Bar from "../../Sidebar";
import axios from "axios";
import crypto from 'crypto-js';

function Edituser() {
  const [getUser, setGetUser] = useState([]);
  const [searchinput, setsearchinput] = useState({
    search: ""
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

  const [loadRole, setLoadRole] = useState([]);

  useEffect(() => {
    const role = async () => {
      let token = localStorage.getItem("token");

      const rs = await axios.get("http://localhost:8000/admin/roleuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoadRole(rs.data.role);
    };
    role();
  }, []);

  const hdlSearch = async () => {
    console.log(searchinput.search);
    let token = localStorage.getItem("token");
    const rs = await axios.get(
      `http://localhost:8000/admin/user/${searchinput.search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(rs.data);
    setGetUser(rs.data.user);
    setInput(rs.data.user);
  };

  const hdlChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
  };

  // const checkpassword = crypto.AES.decrypt(input.password1 || '', process.env.ENCODE);
  // const orgpassword = checkpassword.toString(crypto.enc.Utf8);

  const hdlSubmit = async (e) => {
    try {
      let token = localStorage.getItem('token');
      const rs = await axios.patch(`http://localhost:8000/admin/updateuser/${input.CID}`, input, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (rs.status === 200) {
        alert("แก้ไขข้อมูลสำเร็จ");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div>
        <div className="flex gap-2">
          <Bar />
          <div className="p-2 bg-teal-200 w-[60%]">
            <div className="flex justify-between my-2">
              <p className="text-3xl font-bold">แก้ไขข้อมูล</p>
              <div className="flex gap-4 items-center">
                <p>ค้นหารหัสบัตรประชาชน</p>
                <input className="rounded-md px-2 py-2" type="text" name="search" onChange={(e) => setsearchinput((prv) => ({ ...prv, [e.target.name]: e.target.value }))} />
                <button className="bg-pink-400 px-5 py-2 rounded-md text-white font-bold" onClick={hdlSearch}>ค้นหา</button>
              </div>
            </div>
            <div className="flex flex-col mt-8 gap-2 ">
              <div className="flex flex-row gap-2">
                <label className="w-[125px]">รหัสบัตรประชาชน :</label>
                <input
                  className="w-[250px] h-[35px] mx-5 rounded-md px-2"
                  type="text"
                  name="CID"
                  maxLength={13}
                  value={input.CID}
                  onChange={hdlChange}
                />
              </div>
              <div className="flex flex-row gap-2">
                <label className="w-[125px]">ชื่อ - นามสกุล :</label>
                <input
                  className="w-[250px] h-[35px] mx-5 rounded-md px-2"
                  type="text"
                  name="username"
                  value={input.username}
                  onChange={hdlChange}
                />
              </div>
              <div className="flex flex-row gap-2">
                <label className="w-[125px]">Username :</label>
                <input
                  className="w-[250px] h-[35px] mx-5 rounded-md px-2"
                  type="text"
                  name="passrname1"
                  value={input.passrname1}
                  onChange={hdlChange}
                />
              </div>
              <div className="flex flex-row gap-2">
                <label className="w-[125px]">รหัสผ่าน :</label>
                <input
                  className="w-[250px] h-[35px] mx-5 rounded-md px-2"
                  type="text"
                  name="password1"
                  minLength={6}
                  value={input.password1}
                  onChange={hdlChange}
                />
              </div>
              <div className="flex flex-row gap-2">
                <label className="w-[125px]">ยืนยันรหัสผ่าน :</label>
                <input
                  className="w-[250px] h-[35px] mx-5 rounded-md px-2"
                  type="password"
                  name="confirmPassword"
                  value={input.confirmPassword}
                  onChange={hdlChange}
                />
              </div>
              <div className="flex flex-row gap-2">
                <label className="w-[125px]">เลขที่ธนาคาร :</label>
                <input
                  className="w-[250px] h-[35px] mx-5 rounded-md px-2"
                  type="text"
                  name="BAnumber"
                  value={input.BAnumber}
                  onChange={hdlChange}
                />
              </div>
              <div className="flex flex-row gap-2">
                <label className="w-[125px]">ค่าตอบแทนเวร :</label>
                <input
                  className="w-[250px] h-[35px] mx-5 rounded-md px-2"
                  type="text"
                  name="GetPay"
                  value={input.GetPay}
                  onChange={hdlChange}
                />
              </div>
              <div>
                <div className="flex flex-row gap-2">
                  <h1 className="w-[125px]">ตำแหน่ง :</h1>
                  <select
                    className="flex justify-center items-center text-center w-[250px] h-[35px] mx-5"
                    name="role"
                    value={input.role}
                    onChange={hdlChange}
                  >
                    {loadRole &&
                      loadRole.map((el) => (
                        <option value={el.typeuserID}>{el.typeuserName}</option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-7 px-10">
                <button
                  onClick={hdlSubmit}
                  className="bg-blue-500 hover:bg-white hover:text-teal-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-100"
                >
                  แก้ไขข้อมูล
                </button>
                <button
                  onClick={hdlReload}
                  className="bg-blue-500 hover:bg-white hover:text-teal-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-100"
                >
                  ยกเลิก
                </button>
              </div>
              <p className="fixed right-10 bottom-5 text-gray-300">
                โรงพยาบาลศูนย์สกลนคร
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edituser;
