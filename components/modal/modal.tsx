import React from "react";
import ReactModal from "react-modal";
import { TSeparateThemeType } from "../../features/types";
import { useTheme } from "../../features/useTheme";

interface IModalProps extends React.PropsWithChildren {
  isOpen: boolean;
  onRequestClose: () => void;
}

const Modal = ({ children, isOpen, onRequestClose }: IModalProps) => {
  const { theme, toggleTheme } = useTheme();

  const [modalStyles, setModalStyles] = React.useState<
    TSeparateThemeType | Record<string, any>
  >({});

  React.useEffect(() => {
    if (!theme) {
      setModalStyles({});
      return;
    }
    const { props: styles } = theme;

    const modalStyles = {
      overlay: { backgroundColor: "rgba(255, 255, 255, 0.5)" },
      content: {
        color: styles.text,
        background: styles.background,
        border: styles.text,
        borderRadius: "10px",
        maxWidth: "500px",
        padding: "30px",
        margin: "auto",
      },
    };
    setModalStyles(modalStyles as any);
  }, [theme]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Star Information"
      ariaHideApp={false}
      style={modalStyles ? modalStyles : {}}
    >
      <button onClick={toggleTheme}>Toggle the theme</button>
      {children}
    </ReactModal>
  );
};

export default Modal;
