import React from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";

function Baruser() {
  return (
    <div className="flex h-screen">
      <Sidebar>
        <Menu className="border-r border-b border-slate-300">
        <MenuItem component={<Link to="/Mainuser" />}> หน้าหลัก</MenuItem>
          <MenuItem component={<Link to="/Changpassuser" />}>เปลี่ยนรหัสผ่าน</MenuItem>
          <MenuItem>พิมพ์สลิปเงินเดือน</MenuItem>
          <MenuItem component={<Link to="/ReportUserOT" />}>รายงานข้อมูลค่าตอบแทน</MenuItem>
          <MenuItem>เงินเดือนย้อนหลัง</MenuItem>
          <MenuItem>รายงานภาษี</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default Baruser;
