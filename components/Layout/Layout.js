import { Box } from "@mui/material";

// import Header from "../Header/Header";
import HeaderV2 from "../Header/HeaderV2";
import Footer from "../Footer/Footer";

import BackToTop from "../BackToTop/BackToTop";
import { SettingConfig, GlobalConfig } from "../../context";

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        maxWidth: "100%",
        minWidth: "100%",
        minHeight: "100vh",
      }}
    >
      <SettingConfig>
        <GlobalConfig>
          <HeaderV2 />

          {/* <Header /> */}
          <Box
            sx={{
              flexGrow: 1,
              width: "100%",
            }}
          >
            <BackToTop />
            {children}
          </Box>
          <Footer />
        </GlobalConfig>
      </SettingConfig>
    </Box>
  );
};

export default Layout;
