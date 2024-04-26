import { useRouter } from "next/router";
import { Box, Typography, styled, Button, Stack } from "@mui/material";

import useMedia from "hooks/useMedia";

export default function HomeTitle({ title, isBtn = false, url }) {
  const { push } = useRouter();
  const { isSmUp } = useMedia();

  return (
    <Wrapper isCenter={isBtn}>
      <Title>{title}</Title>
      {isBtn && (
        <Btn onClick={() => push(url)} variant="contained">
          Xem Thêm
        </Btn>
      )}
    </Wrapper>
  );
}

const Wrapper = styled(Stack, {
  shouldForwardProp: (prop) => {
    return prop !== "isCenter";
  },
})(({ theme, isCenter }) => {
  return {
    marginBottom: "0.93rem",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      justifyContent: !isCenter ? "center" : "space-between",
    },
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    fontSize: "36px",
    lineHeight: "42px",
    fontWeight: 700,
    color: "#512C24",

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

const Btn = styled(Button)(({ theme }) => {
  return {
    textTransform: "none !important",
    fontSize: "14px",
    height: "34px",

    ["&:hover"]: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
      height: "30px",
      // width: "px",
    },
  };
});
