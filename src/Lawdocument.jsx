import React from "react";
import { useNavigate , Link } from "react-router-dom";

// const navigate = useNavigate()
// const hdlSubmit = () => {
//   navigate("/")
// };

function Lawdocument() {
  return (
    <div className="flex flex-col gap-4 m-6">
      <div className="text-2xl">หมวด 3 ความผิดเกี่ยวกับเอกสาร</div>
      <div>
        มาตรา 264 ผู้ใดทำเอกสารปลอมขึ้นทั้งฉบับหรือแต่ส่วนหนึ่งส่วนใด
        เติมหรือตัดทอนข้อความ หรือแก้ไขด้วยประการใดๆ ในเอกสารที่แท้จริง
        หรือประทับตราปลอม หรือลงลายมือชื่อปลอมในเอกสาร
        โดยประการที่น่าจะเกิดความเสียหายแก่ผู้อื่นหรือประชาชน
        ถ้าได้กระทำเพื่อให้ผู้หนึ่งผู้ใดหลงเชื่อว่าเป็นเอกสารที่แท้จริง
        ผู้นั้นกระทำความผิดฐานปลอมเอกสารต้องระวางโทษจำคุกไม่เกินสามปี
        หรือปรับไม่เกินหกพันบาท หรือทั้งจำทั้งปรับ
        ผู้ใดกรอกข้อความลงในแผ่นกระดาษหรือวัตถุอื่นใด
        ซึ่งมีลายมือชื่อของผู้อื่นโดยไม่ได้รับความยินยอม
        หรือโดยฝ่าฝืนคำสั่งของผู้อื่นนั้น
        ถ้าได้กระทำเพื่อนำเอาเอกสารนั้นไปใช้ในกิจการที่อาจเกิดเสียหายแก่ผู้หนึ่งผู้ใดหรือประชาชน
        ให้ถือว่าผู้นั้นปลอมเอกสาร ต้องระวางโทษเช่นเดียวกัน{" "}
      </div>
      <div className="flex justify-end">
        <button
          // onClick={hdlSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <Link to="/">กลับหน้าหลัก</Link>
        </button>
      </div>
    </div>
  );
}

export default Lawdocument;
