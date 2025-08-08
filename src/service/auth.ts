import axiosInstance from "./axiosInstance";

async function Login(email: string, password: string) {
  try {
    const res = await axiosInstance.post("/login", {
      email,
      password
    });

    // Trả về dữ liệu nhận được
    return res.data.accessToken;
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error.response?.data;
  }
}

async function register(email: string, password: string, confirmPassword: string) {
  try {
    const res = await axiosInstance.post("/register", {
      email,
      password,
      confirmPassword,
      role: "user"
    });

    // Trả về dữ liệu nhận được
    return res.data.accessToken;
  } catch (error: any) {
    console.error("register failed:", error.response?.data || error.message);
    throw error.response?.data;
  }
}



export { 
    Login,
    register
};