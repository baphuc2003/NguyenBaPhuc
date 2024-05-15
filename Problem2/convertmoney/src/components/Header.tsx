import React from "react";
import logo from "../public/images/logo.png";
import "../styles/header.css";
export default function Header() {
  return (
    <>
      <div className="header">
        <div className="head_t_l">
          <img src={logo} alt="" className="object-cover" />
        </div>
        <div className="head_t_r">
          <ul>
            <li>Giá</li>
            <li>Trợ giúp</li>
            <li>Đăng nhập</li>
            <li>Đăng ký</li>
          </ul>
        </div>
      </div>
    </>
  );
}
