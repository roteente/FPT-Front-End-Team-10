import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import type { CSSProperties } from "react";
import { register } from "../../service/auth";


type RegisterViewProps = {
    setIsLoginView: React.Dispatch<React.SetStateAction<boolean>>;
};

function RegisterView({ setIsLoginView }: RegisterViewProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = async () => {
        // Kiểm tra email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Email không đúng định dạng");
            return;
        }

        if (!password.trim() || !confirmPassword.trim()) {
            alert("Vui lòng nhập đầy đủ mật khẩu");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu và xác nhận mật khẩu không khớp");
            return;
        }

        try {
            const accessToken = await register(email, password, confirmPassword);
            console.log("Access Token:", accessToken);
            alert("Đăng ký thành công!");
            localStorage.setItem("accessToken", accessToken);
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div style={styles.left}>
            <FaAngleLeft style={styles.leftIcons} />

            <h2 style={styles.title}>Tạo tài khoản mới</h2>
            <p style={styles.desc}>Nhập email và mật khẩu để đăng ký</p>

            <div style={styles.inputContainer}>
                <input
                    type="email"
                    placeholder="acb@email.com"
                    style={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div style={styles.passwordWrapper}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mật khẩu"
                        style={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        style={styles.showPassword}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "Ẩn" : "Hiện"}
                    </span>
                </div>

                <div style={styles.passwordWrapper}>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Xác nhận mật khẩu"
                        style={styles.input}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span
                        style={styles.showPassword}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? "Ẩn" : "Hiện"}
                    </span>
                </div>
            </div>

            <button style={styles.loginBtn} onClick={handleRegister}>
                Đăng ký
            </button>
            <div style={styles.links}>
                <div style={styles.groupNonAcount}>
                    Đã có tài khoản?
                    <div style={styles.link} onClick={() => { setIsLoginView(true) }}>Đăng Nhập</div>
                </div>
            </div>
        </div>
    );
}

const styles: { [key: string]: CSSProperties } = {
    left: {
        flex: 1,
        padding: "30px",
        position: "relative",
    },
    leftIcons: {
        width: "24px",
        height: "24px",
        color: "gray"
    },
    title: {
        marginTop: "10px",
        fontSize: "24px"
    },
    desc: {
        color: "#555",
        fontSize: "15px"
    },
    inputContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    input: {
        width: "100%",
        paddingBottom: "10px",
        paddingTop: "10px",
        fontSize: "14px",
        border: "none",
        borderBottom: "1px solid #ccc",
        outline: "none",
    },
    passwordWrapper: {
        display: "flex",
    },
    showPassword: {
        borderBottom: "1px solid #ccc",
        alignContent: "center",
        fontSize: "14px",
        color: "#007bff",
        cursor: "pointer",
    },
    loginBtn: {
        width: "100%",
        backgroundColor: "#FF424E",
        color: "white",
        padding: "12px",
        marginTop: "30px",
        border: "none",
        borderRadius: "4px",
        fontSize: "20px",
        cursor: "pointer",
    },
    links: {
        display: "flex",
        flexDirection: "column",
        marginTop: "20px",
        fontSize: "14px",
    },
    groupNonAcount: {
        display: "flex",
        flexDirection: "row",
        fontSize: 13,
        gap: 10
    },
    link: {
        color: "#007bff",
        textDecoration: "none",
        fontSize: 13
    },
};

export default RegisterView;