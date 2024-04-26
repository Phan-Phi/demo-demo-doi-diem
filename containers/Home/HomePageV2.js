import { get } from "lodash";
import { Box } from "@mui/material";

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

const HomePageV2 = ({ initData }) => {
  const [homeData, blogHome, brandHome] = initData;

  const metaData = homeData.items?.[0];
  const blogHomeData = blogHome.items;
  const brandHomeData = brandHome.items;
  const metaSeo = get(metaData, "meta");

  return (
    <Box>
      <SEO {...getSeoObject(metaSeo)} />
      <HomeBanner data={metaData} />

      {/* <TopBanner data={metaData} /> */}
      {/* TODO:  Feature Request #60*/}
      {/* <AboutExchangePoint data={metaData} /> */}
      {/* <StoreBenefit data={metaData} /> */}
      {/* <CustomerBenefit data={metaData} /> */}
      {/* <BenefitPartner /> */}
      {/* <Featured data={metaData} /> */}
      {/* <News data={metaData} blogHomeData={blogHomeData} /> */}

      <WhyDoiDiem
        title={metaData.about_title}
        content={metaData.v2_about_content}
      />

      <StoreBenefitV2
        title={metaData.store_title}
        dataContent={metaData.store_content}
      />

      <FeaturedV2 title={metaData.tutorial_title} data={metaData} />

      <BecomeAPartner title={metaData.partner_title} />

      <Brand data={metaData} brandHomeData={brandHomeData} />
    </Box>
  );
};

export default HomePageV2;
