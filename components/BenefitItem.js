import { Box, Stack, Typography, styled } from "@mui/material";

import { Image } from "HOC";

export default function BenefitItem({
  title,
  description,
  icon,
  type = "left",
}) {
  return (
    <WrapperBoxItem textAlign={type} className="WrapperBoxItem">
      {type === "left" && (
        <WrapperTitleAndIconLeft direction="row" spacing={2}>
          <Items title={title} icon={icon} />
        </WrapperTitleAndIconLeft>
      )}

      {type === "center" && (
        <WrapperTitleAndIconCenter direction="row" spacing={2}>
          <Items title={title} icon={icon} />
        </WrapperTitleAndIconCenter>
      )}

      {type === "right" && (
        <WrapperTitleAndIconRight>
          <Items title={title} icon={icon} />
        </WrapperTitleAndIconRight>
      )}

      <Description variant="button1">{description}</Description>
    </WrapperBoxItem>
  );
}

const WrapperTitleAndIconLeft = styled(Stack)(({ theme }) => {
  return {
    alignItems: "center",
    marginBottom: "10px",
    justifyContent: "flex-start",

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      marginLeft: 0,

      "& p": {
        marginLeft: "0 !important",
      },
    },
  };
});

const WrapperTitleAndIconCenter = styled(Stack)(({ theme }) => {
  return {
    alignItems: "center",
    marginBottom: "10px",
    justifyContent: "center",
    "& p": {
      textAlign: "left",
    },

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",

      "& p": {
        textAlign: "center",
        marginLeft: "0 !important",
      },
    },
  };
});

const WrapperTitleAndIconRight = styled(Stack)(({ theme }) => {
  return {
    gap: "1rem",
    alignItems: "center",
    marginBottom: "10px",
    justifyContent: "flex-start",
    flexDirection: "row-reverse",

    [theme.breakpoints.down("md")]: {
      gap: 0,
      flexDirection: "column",

      "& p": {
        marginLeft: "0 !important",
      },
    },
  };
});

const WrapperBoxItem = styled(Box)(({ theme }) => {
  return {
    background:
      "linear-gradient(rgba(244, 244, 244, 0.4), rgba(244, 244, 244, 0.2))",
    backdropFilter: "blur(4px)",
    borderRadius: "10px",
    padding: "1rem",
    // cursor: "pointer",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    transition: "all 0.3s",

    "&:hover": {
      background:
        "linear-gradient(rgba(255, 185, 165, 0.2), rgba(255, 185, 165, 0.5))",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    },
  };
});

const Description = styled(Typography)(({ theme }) => {
  return {
    display: "-webkit-box",
    WebkitLineClamp: 4,
    WebkitBoxOrient: "vertical",
    minHeight: 16 * 4,
    overflow: "hidden",
    lineHeight: "22px",
  };
});

const Items = ({ title, icon }) => {
  return (
    <>
      <Image
        {...{
          src: icon,
          width: "50px !important",
          height: "50px !important",
          objectFit: "contain",
        }}
      />

      <TitleItem>{title}</TitleItem>
    </>
  );
};

const TitleItem = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.button2,
    fontSize: "18px",
    lineHeight: "20px",
    color: theme.palette.primary.main,

    [theme.breakpoints.down("md")]: {
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      minHeight: 20 * 2,
      overflow: "hidden",
      textAlign: "center",
      marginTop: "0.5rem !important",
    },
  };
});
