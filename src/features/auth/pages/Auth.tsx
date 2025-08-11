import { useState } from "react";
import Modal from "react-modal";
import type { CSSProperties } from "react";

import LoginView from "../component/LoginView";
import RegisterView from "../component/RegisterView";
import { IoCloseOutline } from "react-icons/io5";

Modal.setAppElement("#root");

type AuthProps = {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function Auth({ isOpen, setIsOpen }: AuthProps) {
  const [isLoginView, setIsLoginView] = useState(true)

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.53)",
            zIndex: 9999,
          },
          content: {
            inset: "50% auto auto 50%",
            transform: "translate(-50%, -50%)",
            padding: 0,
            border: "none",
            borderRadius: "20px",
            overflow: "visible",
            width: "800px",
            maxHeight: "90vh",
          },
        }}
      >
        <div style={styles.container}>
          {isLoginView ? (
            <LoginView setIsLoginView={setIsLoginView} />
          ) : (
            <RegisterView setIsLoginView={setIsLoginView} />
          )}

          <div style={styles.right}>
            <img
              src="/assets/mascot.png"
              alt="Tiki mascot"
              style={styles.mascot}
            />
            <div style={styles.rightTextContainer}>
              <div style={styles.rightTitle}>Mua sắm tại Tiki</div>
              <div style={styles.rightSubTitle}>Siêu ưu đãi mỗi ngày</div>
            </div>
          </div>
        </div>

        <IoCloseOutline style={styles.closeButton} onClick={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}

export default Auth;

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    width: "100%",
    fontFamily: "sans-serif",
    backgroundColor: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
  },
  right: {
    backgroundColor: "#DEEBFF",
    padding: "40px 20px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "20px",
  },
  mascot: {
    width: 200,
    height: 200,
    marginBottom: "20px",
  },
  rightTextContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  rightTitle: {
    color: "#0A68FF",
    fontWeight: "500",
    fontSize: 18,
  },
  rightSubTitle: {
    color: "#0A68FF",
    fontSize: 14,
  },
  closeButton: {
    position: "absolute",
    top: "-15px",
    right: "-15px",
    background: "white",
    borderRadius: "50%",
    width: "42px",
    height: "42px",
    cursor: "pointer",
    color: "gray",
    zIndex: -10,
  },
};
