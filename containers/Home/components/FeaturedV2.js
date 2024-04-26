import {
  Box,
  Stack,
  styled,
  Accordion,
  Container,
  Typography,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import Slider from "react-slick";
import { useCallback, useMemo, useRef, useState } from "react";

import HomeTitle from "components/Title/HomeTitle";

import { Image } from "HOC";
import { ReaderHTML } from "components/index";
import useMedia from "hooks/useMedia";

const IMAGE_FRAME_RATIO = 390 / 790;
const IMAGE_RATIO = 351 / 767;
const IMAGE_HEIGHT = "65vh";

const settings = {
  fade: true,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

export default function FeaturedV2({ title, data }) {
  const slickRef = useRef();
  const { isSmDown } = useMedia();
  const [expanded, setExpanded] = useState(0);

  const { tutorial_title, tutorial_subtitle, tutorial_content } = data;

  const SlickToPage = useCallback(
    (index) => {
      slickRef.current.slickGoTo(index);
    },
    [slickRef]
  );

  const toggleAccordionHandler = useCallback((panel) => {
    return (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
  });

  const renderImage = useMemo(() => {
    return tutorial_content.map((el, idx) => {
      return (
        <Box borderRadius="20px" key={idx} className="Wrapper_image">
          <Image
            src={el.value.image}
            width={`calc(${IMAGE_HEIGHT} * ${IMAGE_RATIO})`}
            height={IMAGE_HEIGHT}
            WrapperProps={{
              sx: {
                marginX: "auto",
                transition: "500ms",
                overflow: "hidden",
                borderRadius: "20px",
                top: "6px",
                maxHeight: isSmDown ? "442px" : "450px",
                maxWidth: `calc(450px * ${IMAGE_RATIO})`,
              },
              className: "wrapper-image",
            }}
          />
        </Box>
      );
    });
  }, [tutorial_content]);

  return (
    <WrapperContainer>
      <HomeTitle title={title} />
      <StyledStack flexDirection="row">
        <Box className="slickImage">
          <WrapperImage>
            <Slider {...settings} ref={slickRef}>
              {renderImage}
            </Slider>
            <StyledIphoneFrame className="iphone-frame"></StyledIphoneFrame>
          </WrapperImage>
        </Box>

        <Stack>
          {tutorial_content.map((item, idx) => {
            const { value } = item;
            const indexItem = idx + 1;

            return (
              <WrapperAccordion direction="row" key={idx}>
                <TimeLine>
                  <TimeLineHeader>
                    <Count>{idx + 1}</Count>
                  </TimeLineHeader>

                  {tutorial_content.length === indexItem ? null : (
                    <Line className="AccordionLine" />
                  )}
                </TimeLine>

                <Accordion
                  onClick={() => SlickToPage(idx)}
                  expanded={expanded === idx}
                  onChange={toggleAccordionHandler(idx)}
                  elevation={0}
                  sx={{
                    border: "none",
                    ["&.Mui-expanded"]: {
                      margin: 0,
                    },
                  }}
                >
                  <StyledAccordionSummary>
                    <Title>{value.title}</Title>
                  </StyledAccordionSummary>

                  <AccordionDetails sx={{ border: "none", padding: 0 }}>
                    <ReaderHTML data={{ content: value.description }} />
                  </AccordionDetails>
                </Accordion>
              </WrapperAccordion>
            );
          })}
        </Stack>
      </StyledStack>
    </WrapperContainer>
  );
}

const TimeLine = styled(Stack)(({ theme }) => {
  return {
    alignItems: "center",
  };
});

const TimeLineHeader = styled(Stack)(({ theme }) => {
  return {
    justifyContent: "center",
    width: "40px",
    height: "40px",
    background: "#8DD1C8",
    padding: "1rem",
    borderRadius: "50%",
    position: "relative",
    margin: "0 auto",
  };
});

const WrapperAccordion = styled(Stack)(({ theme }) => {
  return {
    gap: "1.5rem",

    "& .MuiPaper-root": {
      marginBottom: "1.5rem",
    },
  };
});

const StyledStack = styled(Stack)(({ theme }) => {
  return {
    gap: "2rem",
    alignItems: "center",

    flexDirection: "row",

    "& .MuiPaper-root:before": {
      display: "none !important",
    },

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  };
});

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => {
  return {
    margin: 0,
    padding: 0,
    paddingY: 1.5,
    minHeight: "42px !important ",

    "& .MuiButtonBase-root": {
      minHeight: "42px !important ",
    },

    ["&.Mui-expanded"]: {
      margin: 0,
      minHeight: "42px !important ",
    },

    "& .MuiAccordionSummary-content": {
      alignItems: "center",
      margin: "0 !important",
    },
  };
});

const WrapperContainer = styled(Container)(({ theme }) => {
  return {
    position: "relative",

    "&  .slickImage": {
      width: "220px",
    },
  };
});

const WrapperImage = styled(Box)(({ theme }) => {
  return {
    position: "relative",

    // "& .Wrapper_image img": {
    //   marginX: "auto",
    //   transition: "500ms",
    //   overflow: "hidden",
    //   borderRadius: "20px",
    //   top: "6px",
    //   maxHeight: "450px",
    //   maxWidth: `calc(450px * ${IMAGE_RATIO})`,
    // },
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    fontSize: "1.5rem",
    fontWeight: 600,
  };
});

const Line = styled(Box)(({ theme }) => {
  return {
    width: "3px",
    height: "10px",
    background: "#8DD1C8",
    flexGrow: 1,
  };
});

const Count = styled(Typography)(({ theme }) => {
  return {
    fontWeight: 700,
  };
});

const StyledIphoneFrame = styled(Box)(({ theme }) => {
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: `calc(${IMAGE_HEIGHT} * ${IMAGE_FRAME_RATIO})`,
    height: `calc(${IMAGE_HEIGHT})`,
    maxHeight: "450px",
    maxWidth: `calc(450px * ${IMAGE_FRAME_RATIO})`,
    zIndex: 2,
    backgroundImage: "url('/iphone-frame.png')",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    transform: "translate(-50%, -50%) ",
    pointerEvents: "none",

    [theme.breakpoints.down("sm")]: {
      top: "50%",
      // maxHeight: "445px",
    },
  };
});
