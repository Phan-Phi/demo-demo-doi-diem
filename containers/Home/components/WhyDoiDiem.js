import { styled, Container } from "@mui/material";

import HomeTitle from "components/Title/HomeTitle";
import EndPointScroll from "components/EndPointScroll";
import SlickWhyDoiDiem from "components/Slick/SlickWhyDoiDiem";

export default function WhyDoiDiem({ content, title }) {
  return (
    <WrapperContainer>
      <EndPointScroll name="about" numberMd={28} numberXl={32} numberSm={36} />

      <HomeTitle title={title} />
      <SlickWhyDoiDiem data={content} />
    </WrapperContainer>
  );
}

const WrapperContainer = styled(Container)(({ theme }) => {
  return {
    paddingBottom: "4rem",
    position: "relative",

    [theme.breakpoints.down("sm")]: {
      paddingBottom: "2rem",
    },
  };
});
