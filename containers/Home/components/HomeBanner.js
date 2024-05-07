import { get } from "lodash";
import { useMeasure } from "react-use";
import { useRouter } from "next/router";
import { QRCodeCanvas } from "qrcode.react";
import { Box, Button, Container, Grid, Stack, styled } from "@mui/material";

import { Image } from "HOC";
import { Link, ReaderHTML } from "components/index";
import { TOP_BANNER_RATIO1 } from "constants";

import useSetting from "hooks/useSetting";
import EndPointScroll from "components/EndPointScroll";
import BoxAos from "components/AOS/BoxAOS";
import WrapperQrImage from "containers/Register/components/WrapperQrImage";

const RATIO_QR = 124 / 124;

export default function HomeBanner({ data }) {
  const { push } = useRouter();
  const setting = useSetting();
  const [ref, { width }] = useMeasure();
  const [refImage, { width: widthIamge }] = useMeasure();

  const banner = get(data, "banner");
  const subtitle = get(data, "subtitle");

  return (
    <Wrapper>
      <StyledGrid container>
        <Grid item xs={12} sm={5} md={6}>
          <BoxAos styleAOS="zoom-in">
            <WrapperContent>
              <WrapperTitle>
                <ReaderHTML data={{ content: subtitle }} />
              </WrapperTitle>

              <Stack
                direction="row"
                spacing={1}
                ref={refImage}
                width="fit-content"
                marginBottom={2.5}
              >
                <Link target="_blank" href={setting.ios_customer}>
                  <Image
                    {...{
                      src: "/icon_apple.png",
                      width: "116px",
                      height: "32px",
                      objectFit: "contain",
                    }}
                  />
                </Link>

                <Link target="_blank" href={setting.android_customer}>
                  <Image
                    {...{
                      src: "/icon_gg.png",
                      width: "116px",
                      height: "32px",
                      objectFit: "contain",
                    }}
                  />
                </Link>
              </Stack>

              <Box
                sx={{
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                  width: "fit-content",
                }}
              >
                <Image
                  {...{
                    src: "/qrmerchant.png",
                    width: widthIamge,
                    height: widthIamge / RATIO_QR,
                    objectFit: "contain",
                  }}
                />
              </Box>
            </WrapperContent>
          </BoxAos>
        </Grid>

        <Grid item xs={12} sm={7} md={6} ref={ref} width="100%">
          <BoxAos styleAOS="zoom-in">
            <WrapperImage>
              <Image
                {...{
                  src: banner,
                  width: "100%",
                  height: width / TOP_BANNER_RATIO1,
                  objectFit: "contain",
                }}
              />
            </WrapperImage>
          </BoxAos>
        </Grid>
      </StyledGrid>

      {/* <EndPointScroll name="about" numberMd={5} numberXl={3} numberSm={5.5} /> */}
    </Wrapper>
  );
}

const Wrapper = styled(Container)(({ theme }) => {
  return {
    cursor: "default",
    marginBottom: "4rem",

    [theme.breakpoints.down("sm")]: {
      marginBottom: "2rem",
    },
  };
});

const WrapperContent = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",

    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
    },
  };
});

const StyledGrid = styled(Grid)(({ theme }) => {
  return {
    marginTop: "3rem",
    alignItems: "flex-end",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
      alignItems: "center",
      gap: "12px",
      marginTop: "2rem",
    },
  };
});

const WrapperTitle = styled(Box)(({ theme }) => {
  return {
    marginBottom: "1.25rem",

    "& h1": {
      margin: "0",
      fontSize: "44px",
      fontWeight: "bold",
      lineHeight: "58px",

      [theme.breakpoints.down("sm")]: {
        fontSize: "26px",
        lineHeight: "40px",
      },
    },

    "& p": {
      marginTop: 0,
      marginBottom: "0.5rem",

      "& span": {
        fontWeight: "lighter !important",
      },
    },
  };
});

const WrapperImage = styled(Box)(({ theme }) => {
  return {
    width: "100%",

    "& span": {
      borderRadius: "10px",
    },
  };
});
