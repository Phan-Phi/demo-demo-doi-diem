import { useRouter } from "next/router";
import { Button, Container, Typography, styled } from "@mui/material";

import EndPointScroll from "components/EndPointScroll";
import BoxAos from "components/AOS/BoxAOS";

export default function BecomeAPartner({ title }) {
  const { push } = useRouter();

  return (
    <Wrapper maxWidth="lg">
      <BoxAos styleAOS="zoom-in">
        <Title>Sẵn sàng trở thành đối tác?</Title>
      </BoxAos>
      <BoxAos styleAOS="zoom-in">
        <Btn
          id={"partner"}
          onClick={() => push("/dang-ky")}
          variant="contained"
        >
          Bắt đầu ngay!
        </Btn>
      </BoxAos>
    </Wrapper>
  );
}

const Title = styled(Typography)(({ theme }) => {
  return {
    cursor: "pointer",
    color: "#512C24",
    fontSize: "36px",
    lineHeight: "42px",
    fontWeight: 700,
    marginBottom: "1.25rem",
    textTransform: "full-size-kana !important",
    transition: "all 0.5s ease",
    "&:hover": {
      color: theme.palette.primary.main,
    },

    [theme.breakpoints.down("md")]: {
      fontSize: "30px",
      lineHeight: "37px",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "25px",
      lineHeight: "34px",
    },
  };
});

const Wrapper = styled(Container)(({ theme }) => {
  return {
    padding: "5rem 0",
    textAlign: "center",

    [theme.breakpoints.down("md")]: {
      padding: "4rem 0",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "3rem 0",
    },
  };
});

const Btn = styled(Button)(({ theme }) => {
  return {
    textTransform: "none !important",
    width: "10rem",
    height: "2.5rem",
    fontSize: "1rem",

    ["&:hover"]: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
  };
});
