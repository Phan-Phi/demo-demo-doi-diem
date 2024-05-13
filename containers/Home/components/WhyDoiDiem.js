import { styled, Container } from "@mui/material";

import HomeTitle from "components/Title/HomeTitle";
import EndPointScroll from "components/EndPointScroll";
import SlickWhyDoiDiem from "components/Slick/SlickWhyDoiDiem";
import BoxAos from "components/AOS/BoxAOS";

export default function WhyDoiDiem({ content, title }) {
  return (
    <WrapperContainer>
      <EndPointScroll name="about" numberMd={28} numberXl={30} numberSm={36} />

      <BoxAos styleAOS="fade-up">
        <HomeTitle title={title} />
      </BoxAos>

      <BoxAos styleAOS="fade-up">
        <SlickWhyDoiDiem data={content} />
      </BoxAos>
    </WrapperContainer>
  );
}

const WrapperContainer = styled(Container)(({ theme }) => {
  return {
    paddingBottom: "4rem",
    position: "relative",

    [theme.breakpoints.down("sm")]: {
      paddingBottom: "1rem",
    },
  };
});
