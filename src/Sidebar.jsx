import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaHome, FaUserPlus, FaUserEdit, FaChartBar, FaFileUpload, FaCog, FaPlusCircle } from 'react-icons/fa';

function Bar() {
  return (
    <div className="flex h-screen">
      <Sidebar className="bg-gray-800">
        <Menu className="border-r border-gray-600">
          <MenuItem component={<Link to="/Main" />} icon={<FaHome />} className="hover:bg-gray-700">
            หน้าหลัก
          </MenuItem>
          <SubMenu label="ข้อมูลผู้ใช้งาน" icon={<FaUserPlus />} className="hover:bg-gray-700">
            <MenuItem component={<Link to="/Adduser" />} icon={<FaUserPlus />} className="hover:bg-gray-600">
              เพิ่มข้อมูลผู้ใช้งาน
            </MenuItem>
            <MenuItem component={<Link to="/Edituser" />} icon={<FaUserEdit />} className="hover:bg-gray-600">
              แก้ไขข้อมูลผู้ใช้งาน
            </MenuItem>
            <MenuItem component={<Link to="/AddUserSystem" />} icon={<FaUserPlus />} className="hover:bg-gray-600">
              ข้อมูลเจ้าหน้าที่
            </MenuItem>
          </SubMenu>
          <SubMenu label="รายงาน" icon={<FaChartBar />} className="hover:bg-gray-700">
            <MenuItem component={<Link to="/Reportuser" />} className="hover:bg-gray-600">
              รายงานแยกตามประเภท
            </MenuItem>
            <MenuItem>รายงานค้นหาตามชื่อ</MenuItem>
            <MenuItem component={<Link to="/Reportsumuser" />} className="hover:bg-gray-600">
              รายงานยอดสรุปเจ้าหน้าที่
            </MenuItem>
            <MenuItem component={<Link to="/ReportsumuseBA" />} className="hover:bg-gray-600">
              รายงานข้อมูลเจ้าหน้าที่
            </MenuItem>
            <MenuItem component={<Link to="/ReportsumOTU01" />} className="hover:bg-gray-600">
              รายงานค่าตอบแทน
            </MenuItem>
            <MenuItem component={<Link to="/ReportsumtypeOT" />} className="hover:bg-gray-600">
              รายงานสรุปประเภท OT
            </MenuItem>
            <MenuItem>รายงานสรุป OT แพทย์</MenuItem>
            <MenuItem>รายงานสรุปภาษี</MenuItem>
            <MenuItem>รายงานข้อมูล P4P ใหม่</MenuItem>
          </SubMenu>
          <SubMenu label="ข้อมูล" icon={<FaFileUpload />} className="hover:bg-gray-700">
            <MenuItem component={<Link to="/UploadExcelDatabase" />} className="hover:bg-gray-600">
              นำข้อมูลเข้าระบบ
            </MenuItem>
            <MenuItem className="hover:bg-gray-600">
              จัดการแสดงผลข้อมูล
            </MenuItem>
          </SubMenu>
          <SubMenu label="สรุป" icon={<FaCog />} className="hover:bg-gray-700">
            <MenuItem className="hover:bg-gray-600">
              สรุปตามประเภทเจ้าหน้าที่
            </MenuItem>
            <MenuItem className="hover:bg-gray-600">
              สรุป P4P ตามรายบุคคล
            </MenuItem>
            <MenuItem className="hover:bg-gray-600">
              สรุป P4P ตามประเภท
            </MenuItem>
          </SubMenu>
          <SubMenu label="อื่นๆ" icon={<FaPlusCircle />} className="hover:bg-gray-700">
            <MenuItem component={<Link to="/AddtypeOT" />} className="hover:bg-gray-600">
              เพิ่มประเภทเงิน OT
            </MenuItem>
            <MenuItem className="hover:bg-gray-600">
              เพิ่มค่าตอบแทน OT
            </MenuItem>
            <MenuItem className="hover:bg-gray-600">
              ค่าตอบแทนตามแผนก
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default Bar;
