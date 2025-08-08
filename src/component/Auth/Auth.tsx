import { useState } from "react";
import type { CSSProperties } from "react";

import LoginView from "./LoginView";
import RegisterView from "./RegisterView";

function Auth() {
  const [isloginView, setIsLoginView] = useState(true)
  return (
    <div style={styles.container}>
      {isloginView ?
        <LoginView 
        setIsLoginView = {setIsLoginView}
        />
        :
        <RegisterView 
        setIsLoginView = {setIsLoginView}
        />
      }


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
}

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