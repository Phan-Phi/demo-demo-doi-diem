import React from "react";

import { prefetchData, transformUrl } from "../../libs";
import { PAGES, STORE_CATEGORIES, types } from "../../apis";

import RegisterV2 from "containers/Register/RegisterV2";
import Register from "../../containers/Register/Register";

export default function PageRegister({ ...props }) {
  return <Register {...props} />;
  // return <RegisterV2 {...props} />;
}

export async function getServerSideProps({ params }) {
  try {
    const urls = [
      transformUrl(PAGES, {
        type: types.contactPage,
        fields: "*",
      }),
      transformUrl(STORE_CATEGORIES, {}),
    ];

    const { resList, fallback } = await prefetchData(urls);

    return {
      props: {
        initData: resList,
        fallback,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
