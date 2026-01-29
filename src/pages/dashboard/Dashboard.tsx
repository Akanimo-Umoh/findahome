import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/services/auth.service";

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState("Loading user data...");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first");
      navigate("/login");
      return;
    }

    async function fetchUser() {
      try {
        const data = await getCurrentUser(token!);

        if (data.success) {
          setUserInfo(`Logged in as ${data.user.name} (${data.user.email})`);
        } else {
          alert("Session expired");
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        alert("Session expired");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{ fontFamily: "Arial", textAlign: "center", marginTop: "40px" }}
    >
      <h2>Welcome to your dashboard</h2>
      <p>{userInfo}</p>
      <button
        onClick={handleLogout}
        style={{ padding: "8px 16px", cursor: "pointer" }}
      >
        Logout
      </button>
    </div>
  );
}
