import { Box, styled } from "@mui/material";

// import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HeaderV2 from "../Header/HeaderV2";
import BackToTop from "../BackToTop/BackToTop";

import { SettingConfig, GlobalConfig } from "../../context";
import { Header } from "..";

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <SettingConfig>
        <GlobalConfig>
          <HeaderV2 />

          {/* <Header /> */}
          <WrapperContent>
            <BackToTop />
            {children}
          </WrapperContent>
          <Footer />
        </GlobalConfig>
      </SettingConfig>
    </Wrapper>
  );
};

const Wrapper = styled(Box)(() => {
  return {
    overflow: "hidden",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    maxWidth: "100%",
    minWidth: "100%",
    minHeight: "100vh",
  };
});

const WrapperContent = styled(Box)(() => {
  return {
    flexGrow: 1,
    width: "100%",
  };
});

export default Layout;
