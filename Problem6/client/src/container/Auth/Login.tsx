import React, { useContext, useState } from "react";
import FormLogin from "../../components/FormLogin";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../../App";
import { AxiosImplement } from "../../Services/AxiosService";

export default function Login() {
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });
  const axios = useContext(UserContext) as AxiosImplement;

  const handleSignin = async (event: any) => {
    event.preventDefault();
    try {
      const res = await axios.post("/user/login", dataForm);
      if (res.status === 200) {
        localStorage.setItem("user_id", res.data?.user_id);
        localStorage.setItem("access_token", res.data?.result?.access_token);
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email hoặc mật khẩu chưa chính xác",
      });
    }
  };
  return (
    <>
      <FormLogin
        handleSignin={handleSignin}
        dataForm={dataForm}
        setDataForm={setDataForm}
      />
    </>
  );
}
