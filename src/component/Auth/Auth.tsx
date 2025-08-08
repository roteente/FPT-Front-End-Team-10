import React from "react";
import type { CSSProperties } from "react";
import { FaAngleLeft } from "react-icons/fa6";

function Auth() {
  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <FaAngleLeft style={styles.leftIcons} />

        <h2 style={styles.title}>Đăng nhập bằng email</h2>
        <p style={styles.desc}>Nhập email và mật khẩu tài khoản Tiki</p>

        <div style={styles.inputContainer}>
          <input
            type="email"
            placeholder="acb@email.com"
            style={styles.input}
          />

          <div style={styles.passwordWrapper}>
            <input
              type="password"
              placeholder="Mật khẩu"
              style={styles.input}
            />
            <span style={styles.showPassword}>Hiện</span>
          </div>
        </div>

        <button style={styles.loginBtn}>Đăng nhập</button>

        <div style={styles.links}>
          <a href="#" style={styles.link}>Quên mật khẩu?</a>
          <div style={styles.groupNonAcount}>
            Chưa có tài khoản?
            <a href="#" style={styles.link}>Tạo tài khoản</a>
          </div>
        </div>
      </div>

      <div style={styles.right}>
        <img
          src="/mascot.png"
          alt="Tiki mascot"
          style={styles.mascot}
        />
        <div style={styles.rightTextContainer}>
          <div style={styles.rightTitle}>Mua sắm tại Tiki</div>
          <div style={styles.rightSubTitle}>Siêu ưu đãi mỗi ngày</div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    width: "800px",
    margin: "50px auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "20px",
    overflow: "hidden",
    fontFamily: "sans-serif",
  },
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
  backBtn: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
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
  right: {
    backgroundColor: "#DEEBFF",
    padding: "40px 20px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: "20px"
  },
  mascot: {
    width: 200,
    height: 200,
    marginBottom: "20px",
  },
  rightTextContainer: {
    display: "flex",
    flexDirection: 'column',
    gap: 10,
  },
  rightTitle: {
    color: "#0A68FF",
    fontWeight: '500',
    fontSize: 18,
  },
  rightSubTitle: {
    color: "#0A68FF",
    fontSize: 14,
  }
};