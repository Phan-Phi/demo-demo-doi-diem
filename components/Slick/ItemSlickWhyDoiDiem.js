import { Box, Stack, Typography, styled } from "@mui/material";

import { Image } from "HOC";

export default function ItemSlickWhyDoiDiem({ data }) {
  const { value } = data;

  return (
    <Wrapper>
      <WrapperContent>
        <StyledImage
          {...{
            src: value.image,
            objectFit: "cover",
            width: "100px",
            height: "115px",
          }}
        />

        <Title>{value.title}</Title>

        <Text>{value.description}</Text>
      </WrapperContent>
    </Wrapper>
  );
}

const Wrapper = styled(Box)(({ theme }) => {
  return {
    padding: "10px 1.5rem",
    paddingTop: 0,
  };
});

const WrapperContent = styled(Stack)(({ theme }) => {
  return {
    alignItems: "center",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    textAlign: "center",
    padding: "20px 14px",
    background:
      "linear-gradient(rgba(244, 244, 244, 0.4), rgba(244, 244, 244, 0.2))",
    backdropFilter: "blur(4px)",
    transition: "all 0.3s",

    "&:hover": {
      background:
        "linear-gradient(rgba(255, 185, 165, 0.2), rgba(255, 185, 165, 0.5))",
    },

    [theme.breakpoints.down("md")]: {
      "& img": {
        width: "70px",
        height: "65px",
      },
    },
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    fontSize: "27px",
    lineHeight: "35px",
    fontWeight: 700,
    margin: "10px 0",
    color: theme.palette.primary.main,

    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    minHeight: 35 * 2,
    overflow: "hidden",

    [theme.breakpoints.down("md")]: {
      fontSize: "21px",
      lineHeight: "28px",
      minHeight: 28 * 2,
    },
  };
});

const Text = styled(Typography)(({ theme }) => {
  return {
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "22px",

    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    minHeight: 22 * 3,
    overflow: "hidden",
  };
});

const StyledImage = styled(Image)(({ theme }) => {
  return {
    width: "100px",
    height: "115px",

    [theme.breakpoints.down("md")]: {
      width: "70px",
      height: "65px",
    },
  };
});
