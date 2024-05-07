import { get } from "lodash";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import AboutExchangePoint from "./components/AboutExchangePoint";
import CustomerBenefit from "./components/CustomerBenefit";
import StoreBenefit from "./components/StoreBenefit";
import { getSeoObject } from "utils/getSeoObject";
import TopBanner from "./components/TopBanner";
import Featured from "./components/Featured";
import Brand from "./components/Brand";
import News from "./components/News";
import SEO from "components/SEO";
import BannerContent from "components/Banner/BannerContent";
import BenefitPartner from "./components/BenefitPartner";
import WhyDoiDiem from "./components/WhyDoiDiem";
import BecomeAPartner from "./components/BecomeAPartner";
import HomeBanner from "./components/HomeBanner";
import StoreBenefitV2 from "./components/StoreBenefitV2";
import FeaturedV2 from "./components/FeaturedV2";
import BoxAos from "components/AOS/BoxAOS";
import BrandV2 from "./components/BrandV2";

const HomePageV2 = ({ initData }) => {
  const [homeData, blogHome, brandHome] = initData;

  const metaData = homeData.items?.[0];
  const blogHomeData = blogHome.items;
  const brandHomeData = brandHome.items;
  const metaSeo = get(metaData, "meta");

  const [state, setState] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const element = document.getElementById("WrapperBodyContent");
      if (element) {
        element.style.height = "1px";
        setState(true);
      }
    }, 1000);
  }, []);

  return (
    <Box>
      {/* <Box sx={{ height: "100vh" }} id="WrapperBodyContent"></Box> */}

      <SEO {...getSeoObject(metaSeo)} />

      <HomeBanner data={metaData} />

      <WhyDoiDiem
        title={metaData.about_title}
        content={metaData.v2_about_content}
      />

      <BoxAos styleAOS="fade-up">
        <StoreBenefitV2
          title={metaData.store_title}
          dataContent={metaData.store_content}
        />
      </BoxAos>

      <FeaturedV2 title={metaData.tutorial_title} data={metaData} />

      <BoxAos styleAOS="zoom-in">
        <BecomeAPartner title={metaData.partner_title} />
      </BoxAos>

      <BoxAos styleAOS="fade-up">
        <BrandV2 data={metaData} brandHomeData={brandHomeData} />
      </BoxAos>
    </Box>
  );
};

export default HomePageV2;
