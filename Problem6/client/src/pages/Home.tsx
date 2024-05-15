import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../App";
import { AxiosImplement } from "../Services/AxiosService";
import "../style/Home.css";
import { io, Socket } from "socket.io-client";
import Swal from "sweetalert2";

interface User {
  _id: string;
  name: string;
  point: number;
}

export default function Home() {
  const [listUser, setListUser] = useState<User[]>([]);
  const user_id = localStorage.getItem("user_id") as string;
  const axios = useContext(UserContext) as AxiosImplement;
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    async function getListUser() {
      try {
        const res = await axios.get("/user/get-list-user");
        const arrUser: User[] = res.data?.result;
        const sortListUser = arrUser.sort((a, b) => b.point - a.point);
        setListUser(sortListUser);
      } catch (error) {
        console.log(error);
      }
    }
    getListUser();
  }, [axios]);

  useEffect(() => {
    socketRef.current = io("http://localhost:4000");

    socketRef.current.on("connect", () => {
      socketRef.current?.emit("join", user_id);
    });

    socketRef.current.on(
      "likedupdate",
      ({
        user_id: updatedUserId,
        count,
      }: {
        user_id: string;
        count: number;
      }) => {
        setListUser((prevListUser) => {
          const updatedListUser = prevListUser.map((user) => {
            if (user._id === updatedUserId) {
              return { ...user, point: count };
            }
            return user;
          });
          const sortListUser = updatedListUser.sort(
            (a, b) => b.point - a.point
          );
          return sortListUser;
        });
        if (count !== undefined) {
          //call api to update the point
          handleUpdatePoint(updatedUserId, count);
        }
      }
    );

    return () => {
      socketRef.current?.disconnect();
    };
  }, [user_id]);

  const handleIncrease = () => {
    const access_token = localStorage.getItem("access_token");
    // socketRef.current?.emit("liked", user_id);
    const user = listUser.filter((user) => {
      return user._id === user_id;
    });
    const currentPoint = user[0].point;
    socketRef.current?.emit("liked", { user_id, currentPoint, access_token });
    socketRef.current?.on("loginRequired", ({ message }) => {
      if (message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please login again",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/login";
          }
        });
      }
    });
  };

  const handleUpdatePoint = async (userId: string, point: number) => {
    try {
      await axios.put("/user/update-point", userId, { point });
    } catch (error) {}
  };

  return (
    <>
      <h1>Top 10 user’s scores</h1>
      <div className="table_show">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Point</th>
            </tr>
          </thead>
          <tbody>
            {listUser.map((user) => (
              <tr key={user._id}>
                <td className="td">{user._id}</td>
                <td className="td">{user.name}</td>
                <td className="td_2">{user.point}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="func">
        <button onClick={handleIncrease}>Increase</button>
      </div>
    </>
  );
}
