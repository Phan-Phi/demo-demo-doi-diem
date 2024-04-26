import { useEffect, useMemo, useRef } from "react";
import { Box, Container, Grid, Stack, styled } from "@mui/material";

import useMedia from "hooks/useMedia";
import BenefitItem from "components/BenefitItem";
import HomeTitle from "components/Title/HomeTitle";
import Slider from "react-slick";
import EndPointScroll from "components/EndPointScroll";

const settings = {
  dots: false,
  infinite: true,
  speed: 200,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 3000,
  centerMode: true,
  centerPadding: "30px",
};

export default function StoreBenefitV2({ title, dataContent }) {
  const slickRef = useRef();
  const { isSmDown, isSmUp } = useMedia();

  const renderSlick = useMemo(() => {
    if (dataContent == undefined || dataContent.length === 0) return;

    return dataContent.map((el, index) => {
      return (
        <Grid item key={index} xs={6}>
          <BenefitItem
            type="left"
            title={el.value.title}
            description={el.value.description}
            icon={el.value.icon}
          />
        </Grid>
      );
    });
  }, [dataContent, isSmUp]);

  // useEffect(() => {
  //   if (slickRef.current) {
  //     slickRef.current.innerSlider.list.style.padding = "0 75px 0 0";
  //   }
  // }, [slickRef]);

  const renderBenefitTop = useMemo(() => {
    if (dataContent == undefined || dataContent.length === 0) return;

    const sliceData = dataContent.slice(0, 3);

    return sliceData.map((el, idx) => {
      if (idx === 1) {
        return (
          <Grid item key={idx} xs={4}>
            <BenefitItem
              type="center"
              title={el.value.title}
              description={el.value.description}
              icon={el.value.icon}
            />
          </Grid>
        );
      }

      if (idx === 2) {
        return (
          <Grid item key={idx} xs={4}>
            <BenefitItem
              type="right"
              title={el.value.title}
              description={el.value.description}
              icon={el.value.icon}
            />
          </Grid>
        );
      }

      return (
        <Grid item key={idx} xs={4}>
          <BenefitItem
            type="left"
            title={el.value.title}
            description={el.value.description}
            icon={el.value.icon}
          />
        </Grid>
      );
    });
  }, [dataContent]);

  const renderBenefitBottom = useMemo(() => {
    if (dataContent == undefined || dataContent.length === 0) return;

    const sliceData = dataContent.slice(3);

    return sliceData.map((el, idx) => {
      if (idx === 0) {
        return (
          <Grid item key={idx} xs={6}>
            <BenefitItem
              title={el.value.title}
              description={el.value.description}
              icon={el.value.icon}
            />
          </Grid>
        );
      }
      return (
        <Grid item key={idx} xs={6}>
          <BenefitItem
            type="right"
            title={el.value.title}
            description={el.value.description}
            icon={el.value.icon}
          />
        </Grid>
      );
    });
  }, [dataContent]);

  const renderBenefitMobile = useMemo(() => {
    if (dataContent == undefined || dataContent.length === 0) return;

    return dataContent.map((el, idx) => {
      return (
        <Grid item key={idx} xs={12}>
          <BenefitItem
            title={el.value.title}
            description={el.value.description}
            icon={el.value.icon}
          />
        </Grid>
      );
    });
  }, [dataContent]);

  return (
    <WrapperContainer>
      <WrapperTitle direction="row">
        <HomeTitle title={title} />
      </WrapperTitle>

      <WrapperContent>
        {isSmUp && (
          <Grid container className="BenefitBottom" spacing={1.5}>
            {renderBenefitTop}
            {renderBenefitBottom}
          </Grid>
        )}

        {isSmDown && (
          <WrapperSlick>
            <Slider ref={slickRef} {...settings}>
              {renderSlick}
            </Slider>
          </WrapperSlick>
        )}
      </WrapperContent>

      <EndPointScroll
        name="tutorial"
        numberMd={5}
        numberXl={7.5}
        numberSm={5.5}
      />
    </WrapperContainer>
  );
}

const WrapperContainer = styled(Container)(({ theme }) => {
  return {
    paddingBottom: "3rem",
    position: "relative",

    [theme.breakpoints.down("sm")]: {
      padding: "2.5rem 0",
    },
  };
});

const WrapperTitle = styled(Stack)(({ theme }) => {
  return {
    justifyContent: "space-between",
    alignItems: "center",
  };
});

const WrapperContent = styled(Box)(({ theme }) => {
  return {
    [theme.breakpoints.down("sm")]: {
      // padding: " 0 1.5rem",
    },
  };
});

const WrapperSlick = styled(Box)(({ theme }) => {
  return {
    overflowX: "hidden",

    "& .slick-slide": {
      width: "100%",
      margin: "0 10px",
      paddingBottom: 2,
    },
    "& button": {
      display: "none",
    },
    "& .slick-track": {
      display: "flex",
    },
  };
});
