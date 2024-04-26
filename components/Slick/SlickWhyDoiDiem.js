import { useMemo } from "react";
import Slider from "react-slick";
import { useMeasure } from "react-use";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Box, Button, styled, useTheme } from "@mui/material";

import useMedia from "hooks/useMedia";
import ItemSlickWhyDoiDiem from "./ItemSlickWhyDoiDiem";

import { Image } from "HOC";

export default function SlickWhyDoiDiem({ data }) {
  const { isMdDown } = useMedia();
  const [ref, { height }] = useMeasure();

  const settings = {
    className: "center",
    dots: true,
    centerMode: true,
    infinite: true,
    centerPadding: "260px",
    slidesToShow: 1,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 900,
        settings: {
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          centerPadding: "10px",
        },
      },
    ],
  };

  const render = useMemo(() => {
    return data?.map((item, idx) => {
      return <ItemSlickWhyDoiDiem data={item} key={idx} />;
    });
  }, []);

  return (
    <WrapperSlick ref={ref}>
      <Slider {...settings}>{render}</Slider>

      <WrapperImg>
        <ImageItem heightItem={height} media={isMdDown} />
      </WrapperImg>

      <WrapperImg isSpecial={true}>
        <ImageItem heightItem={height} media={isMdDown} />
      </WrapperImg>
    </WrapperSlick>
  );
}

const WrapperImg = styled(Box, {
  shouldForwardProp: (prop) => {
    return prop !== "isSpecial";
  },
})(({ theme, isSpecial }) => {
  return {
    position: "absolute",
    top: 0,
    left: !isSpecial ? 0 : null,
    right: isSpecial ? 0 : null,
    transform: isSpecial ? "rotate(180deg) !important" : null,

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  };
});

const WrapperSlick = styled(Box)(({ theme }) => {
  return {
    position: "relative",
    "& .slick-slider": {
      "& .arrow": {
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      },
      "& .slick-dots": {
        "& li": {
          margin: 0,
        },
        "& button:before": {
          fontSize: "9px",
          color: "#E27D61",
          opacity: `1 !important`,
        },

        "& button:hover:before": {
          color: "#512C24",
          opacity: `0.5 !important`,
        },

        "& .slick-active": {
          "& button:before": {
            color: "#512C24",
          },
        },
      },
    },
  };
});

function PrevArrow({ onClick }) {
  const theme = useTheme();

  return (
    <Box
      className="arrow"
      sx={{
        position: "absolute",
        top: "42%",
        left: "58px",
        width: "36px",
        height: "36px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        zIndex: "9 !important",
        // borderRadius: "50%",
        // borderColor: "primary.light",
        // borderWidth: "2px",
        // borderStyle: "solid",
        transform: "translateX(-54px)",
        transition: "all 0.5s",
      }}
      onClick={onClick}
    >
      <Button
        sx={{
          minWidth: 0,
          borderRadius: "50%",
          zIndex: 2,
        }}
      >
        <ArrowRightIcon
          sx={{
            transform: "rotate(180deg)",
            color: "#F7EDE3",
            zIndex: 50,
            width: "5em",
            height: "2.5em",
            "&:hover": {
              color: `${theme.palette.primary.light} !important`,
            },
          }}
        />
      </Button>
    </Box>
  );
}

function NextArrow({ onClick }) {
  const theme = useTheme();

  return (
    <Box
      className="arrow"
      sx={{
        position: "absolute",
        top: "42%",
        right: "20px",
        width: "36px",
        height: "36px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        zIndex: "9 !important",

        // borderRadius: "50%",
        // borderColor: "primary.light",
        // borderWidth: "2px",
        // borderStyle: "solid",
        transform: "translateX(18px)",
        transition: "all 0.5s",
      }}
      onClick={onClick}
    >
      <Button
        sx={{
          minWidth: 0,
          borderRadius: "50%",

          zIndex: 2,
        }}
      >
        <ArrowRightIcon
          sx={{
            color: "#F7EDE3",
            width: "5em",
            height: "2.5em",

            "&:hover": {
              color: `${theme.palette.primary.light} !important`,
            },
          }}
        />
      </Button>
    </Box>
  );
}

const ImageItem = ({ media, heightItem }) => {
  return (
    <Image
      {...{
        src: "/img/shadow.png",
        objectFit: "cover",
        width: media ? "60px" : "90px",
        height: heightItem - 10,
      }}
    />
  );
};
