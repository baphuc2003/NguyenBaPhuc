import React from "react";
import "../style/Login.css";
interface FormLoginProps {
  handleSignin: (event: any) => Promise<void>;
  dataForm: {
    email: string;
    password: string;
  };
  setDataForm: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
    }>
  >;
}

export default function FormLogin({
  handleSignin,
  dataForm,
  setDataForm,
}: FormLoginProps) {
  //   const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  //   const [dataForm, setDataForm] = useState({
  //     email: "",
  //     password: "",
  //   });

  //   const handleSignin = async (event: any) => {
  //     event.preventDefault();
  //     try {
  //       const res = await axios.post(
  //         "http://localhost:4000/users/login",
  //         dataForm
  //       );
  //       if (res.data) {
  //         // window.history.replaceState(null, "", "/");
  //         window.location.href = "/";
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: "Email hoặc mật khẩu chưa chính xác",
  //       });
  //     }
  //   };
  return (
    <>
      <div className="container_form">
        <form action="">
          <div className="header">
            <div className="t_head">
              <h1>Đăng nhập</h1>
            </div>
          </div>
          <div className="main_inp">
            <input
              type="email"
              placeholder="Email"
              className="email"
              value={dataForm.email}
              onChange={(e) =>
                setDataForm({ ...dataForm, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="password"
              value={dataForm.password}
              onChange={(e) =>
                setDataForm({ ...dataForm, password: e.target.value })
              }
            />

            <div className="des">
              <a href="http://localhost:3000/forgot-password">Quên mật khẩu</a>
              <p>
                Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin
                liện hệ bạn lên này.
              </p>
              <p>
                Bằng cách nhấp vào Đăng ký, bạn đồng ý với{" "}
                <span> Điều khoản, Chính sách quyền riêng tư</span> và
                <span> Chính sách cookie</span> của chúng tôi.
              </p>
            </div>
          </div>
          <div className="foo_btn">
            <button onClick={(e) => handleSignin(e)}>Đăng nhập</button>
          </div>
        </form>
      </div>
    </>
  );
}
