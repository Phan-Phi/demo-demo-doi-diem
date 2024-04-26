import { get } from "lodash";
import { QRCodeCanvas } from "qrcode.react";
import { useMeasure, useMedia } from "react-use";
import { Box, Button, Container, Grid, Stack, styled } from "@mui/material";

import { Image } from "HOC";
import { ReaderHTML } from "components/index";
import { TOP_BANNER_RATIO1 } from "constants";

import useSetting from "hooks/useSetting";
import { useRouter } from "next/router";
import EndPointScroll from "components/EndPointScroll";

export default function HomeBanner({ data }) {
  const { push } = useRouter();
  const [ref, { width }] = useMeasure();
  const setting = useSetting();
  const { isMdDown, isLgDown, isSmDown } = useMedia();
  const banner = get(data, "banner");
  const subtitle = get(data, "subtitle");

  return (
    <Wrapper>
      <StyledGrid container>
        <Grid item xs={12} sm={5} md={6}>
          <WrapperTitle>
            <ReaderHTML data={{ content: subtitle }} />
          </WrapperTitle>

          <Stack direction="row" spacing={2}>
            <Stack spacing={1} sx={{}}>
              <Btn
                onClick={() => {
                  push(setting.android_customer);
                }}
                variant="contained"
              >
                Andoird
              </Btn>
              <QRCodeCanvas value={setting.android_customer} />
            </Stack>
            <Stack spacing={1} sx={{}}>
              <Btn
                onClick={() => {
                  push(setting.ios_customer);
                }}
                variant="contained"
              >
                IOS
              </Btn>
              <QRCodeCanvas value={setting.ios_customer} />
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={7} md={6} ref={ref} width="100%">
          <WrapperImage>
            <Image
              {...{
                src: banner,
                width: "100%",
                height: width / TOP_BANNER_RATIO1,
                objectFit: "cover",
              }}
            />
          </WrapperImage>
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

const StyledGrid = styled(Grid)(({ theme }) => {
  return {
    marginTop: "1.5rem",
    alignItems: "flex-end",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  };
});

const Btn = styled(Button)(({ theme }) => {
  return {
    borderRadius: "0.8rem",
    fontSize: "0.7rem",
    height: "28px",

    ["&:hover"]: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
  };
});

const WrapperTitle = styled(Box)(({ theme }) => {
  return {
    marginBottom: "0.75rem",
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
