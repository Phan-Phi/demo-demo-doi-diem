import { Fragment } from "react";

import { Box, Typography, styled, useTheme } from "@mui/material";

import truncate from "lodash/truncate";

import useMedia from "../../hooks/useMedia";
import { Image } from "../../HOC";

const CardBrand = ({ data }) => {
  const theme = useTheme();
  const { isSmDown } = useMedia();

  return (
    <WrapperContainer>
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Fragment>
          <WrapperImage>
            <Box>
              <Image src={data.image} height="5rem" objectFit="contain" />
            </Box>
          </WrapperImage>

          <WrapperContent>
            <Typography
              variant="body2_bold"
              sx={{
                color: theme.palette.primary.light,
                marginBottom: "8px",
              }}
            >
              {data.is_point_earned === true
                ? `Điểm Tích Luỹ: ${data.point}%`
                : "Không Tích Điểm"}
            </Typography>

            <Description variant="body2">
              {/* {truncate(data.description, {
                length: 90,
                separator: " ",
              })} */}

              {data.description}
            </Description>
          </WrapperContent>
        </Fragment>
      </Box>
    </WrapperContainer>
  );
};

export default CardBrand;

const WrapperImage = styled(Box)(({ theme }) => {
  return {
    margin: "0 auto",
    overflow: "hidden",
    height: "5rem",

    [theme.breakpoints.up("md")]: {
      transition: "all 0.5s",
      "&:hover": {
        transform: "scale(1.2)",
      },
    },
  };
});

const WrapperContent = styled(Box)(({ theme }) => {
  return {
    marginTop: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
});

const Description = styled(Typography)(({ theme }) => {
  return {
    lineHeight: "22px",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    minHeight: 22 * 3,
    overflow: "hidden",
  };
});

const WrapperContainer = styled(Box)(({ theme }) => {
  return {
    borderRadius: "6px",
    background:
      "linear-gradient(rgba(244, 244, 244, 0.4), rgba(244, 244, 244, 0.2))",
    backdropFilter: "blur(4px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  };
});
