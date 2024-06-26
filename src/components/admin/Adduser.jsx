import React, { useEffect, useRef, useState } from "react";
import Bar from "../../Sidebar";
// import { Key } from "lucide-react";
import axios from "axios";

function Adduser() {
  const [input, setInput] = useState({
    CID: "",
    username: "",
    passrname1: "",
    password1: "",
    confirmPassword: "",
    BAnumber: "",
    statedit: 0,
    group30ID: "0",
    GSgroup30ID : "0",
    GetPay: "",
    roleID : "",
    admin : "0",
    superuser : "0"
  });
  const [loadRole, setLoadRole] = useState("");

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

  //   console.log(loadRole);

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();

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
        alert("Create user success");
        location.reload();
      }
      // console.log(rs);
    } catch (err) {
      alert(err.massage);
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
      role: "",
    });
    document.querySelector('select[name="role"]').selectedIndex = 0;
  };
  return (
    <div>
      <div>
        <div className="flex gap-2">
          <Bar />
          <div className="p-2 bg-teal-200 w-[60%]">
            <p className="m-6 text-3xl font-bold">เพิ่มข้อมูลผู้ใช้งาน</p>
            <div className="flex flex-col gap-2 pl-6">
              <div className="flex flex-row gap-2">
                <label className="w-[125px]">รหัสบัตรประชาชน :</label>
                <input
                  className="w-[250px] h-[35px] mx-5 rounded-l"
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
                  className="w-[250px] h-[35px] mx-5 rounded-l"
                  type="text"
                  name="username"
                  value={input.username}
                  onChange={hdlChange}
                />
              </div>
              <div className="flex flex-row gap-2">
                <label className="w-[125px]">ชื่อผู้ใช้ :</label>
                <input
                  className="w-[250px] h-[35px] mx-5 rounded-l"
                  type="text"
                  name="passrname1"
                  value={input.passrname1}
                  onChange={hdlChange}
                />
              </div>
              <div className="flex flex-row gap-2">
                <label className="w-[125px]">รหัสผ่าน :</label>
                <input
                  className="w-[250px] h-[35px] mx-5 rounded-l"
                  type="password"
                  name="password1"
                  minLength={6}
                  value={input.password1}
                  onChange={hdlChange}
                />
              </div>
              <div className="flex flex-row gap-2">
                <label className="w-[125px]">ยืนยันรหัสผ่าน :</label>
                <input
                  className="w-[250px] h-[35px] mx-5 rounded-l"
                  type="password"
                  name="confirmPassword"
                  value={input.confirmPassword}
                  onChange={hdlChange}
                />
              </div>
              <div className="flex flex-row gap-2">
                <label className="w-[125px]">เลขที่ธนาคาร :</label>
                <input
                  className="w-[250px] h-[35px] mx-5 rounded-l"
                  type="text"
                  name="BAnumber"
                  value={input.BAnumber}
                  onChange={hdlChange}
                />
              </div>
              <div className="flex flex-row gap-2">
                <label className="w-[125px]">ค่าตอบแทนเวร :</label>
                <input
                  className="w-[250px] h-[35px] mx-5 rounded-l"
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
                    name="roleID"
                    onChange={hdlChange}
                  >
                    {loadRole &&
                      loadRole.map((el) => (
                        <option key={el.typeuserID} value={el.typeuserID}>{el.typeuserName}</option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-7 px-10">
                <button
                  onClick={hdlSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300"
                >
                  สมัคร
                </button>
                <button
                  onClick={hdlReload}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300"
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

export default Adduser;
