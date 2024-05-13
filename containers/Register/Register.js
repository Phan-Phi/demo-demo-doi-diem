import {
  Box,
  Grid,
  styled,
  Checkbox,
  MenuItem,
  TextField,
  Container,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import { get, omit, set } from "lodash";
import { useMountedState } from "react-use";
import { Controller, useForm } from "react-hook-form";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import LoadingButton from "@mui/lab/LoadingButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { SUBMISSIONS } from "../../apis";
import { BUSINESS_TYPE } from "constants";
import { getSeoObject } from "utils/getSeoObject";
import { useNotification } from "hooks/useNotifaction";
import { BannerTop, LineTitle, SEO } from "../../components";
import { registerSchema, defaultValues } from "../../libs/regierSchema";

import axios from "../../axios.config";
import useSetting from "hooks/useSetting";
import WrapperQrImage from "./components/WrapperQrImage";
import DatePicker from "components/DatePicker/DatePicker";
import RegisterMobileApp from "./components/RegisterMobileApp";
import InputPhoneNumber from "../../components/Input/InputPhoneNumber";

export default function Register({ initData }) {
  const setting = useSetting();
  const [contactPage] = initData;
  const { executeRecaptcha } = useGoogleReCaptcha();

  const isMounted = useMountedState();

  const {
    banner,
    title,
    subtitle,
    thank_you_text,
    meta,
    qr_subtitle,
    qr_title,
  } = contactPage.items[0];

  const metaSeo = meta;

  const {
    loadingNoti,
    setLoadingNoti,
    enqueueSnackbarWithSuccess,
    enqueueSnackbarWithError,
  } = useNotification();

  const { handleSubmit, control, reset, watch } = useForm({
    defaultValues,
    resolver: registerSchema,
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (!executeRecaptcha) return;

        await executeRecaptcha();

        setLoadingNoti(true);

        if (watch("business_type") === "company") {
          const cloneData = data;

          set(
            cloneData,
            "business_registration_date",
            get(cloneData, "business_registration_date").toISOString()
          );

          await axios.post(
            SUBMISSIONS,
            omit(
              {
                ...cloneData,
                tax_id: "",
              },
              "terms"
            )
          );
        } else {
          await axios.post(
            SUBMISSIONS,
            omit(
              {
                ...data,
                business_registration_id: "",
                business_registration_date: null,
                business_registration_place: "",
              },
              "terms"
            )
          );
        }

        enqueueSnackbarWithSuccess(thank_you_text);
        reset(defaultValues, {
          keepDirty: false,
        });
        setOpen(true);
      } catch (err) {
        enqueueSnackbarWithError(err);
      } finally {
        if (isMounted()) {
          setLoadingNoti(false);
        }
      }
    },
    [executeRecaptcha, watch]
  );

  return (
    <Box>
      <SEO {...getSeoObject(metaSeo)} />

      <BannerTop imageSrc={banner} />
      <StyledContainer maxWidth="lg">
        <Grid container justifyContent={"center"}>
          <Grid item xs={12}>
            <WrapperLineTitle>
              <LineTitle
                titleData={title}
                subtitleData={subtitle}
                type="center"
              />
            </WrapperLineTitle>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box onSubmit={handleSubmit(onSubmit)} component={"form"}>
              <Controller
                name="store_name"
                control={control}
                render={({
                  field: { onChange, ref, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      error={!!error}
                      label="Tên doanh nghiệp"
                      value={value}
                      onChange={onChange}
                      inputRef={ref}
                    />
                  );
                }}
              />

              <Controller
                name="presentator"
                control={control}
                render={({
                  field: { onChange, ref, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      error={!!error}
                      label="Tên người đại diện"
                      value={value}
                      onChange={onChange}
                      inputRef={ref}
                    />
                  );
                }}
              />

              <InputPhoneNumber
                control={control}
                name="phone"
                label="Số điện thoại"
              />

              <Controller
                name="email"
                control={control}
                render={({
                  field: { onChange, ref, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      error={!!error}
                      label="Email"
                      value={value}
                      onChange={onChange}
                      inputRef={ref}
                    />
                  );
                }}
              />

              <Controller
                name="website"
                control={control}
                render={({
                  field: { onChange, ref, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      value={value}
                      error={!!error}
                      label="Website / Fanpage"
                      inputRef={ref}
                      onChange={onChange}
                    />
                  );
                }}
              />

              <Controller
                name="address"
                control={control}
                render={({
                  field: { onChange, ref, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      value={value}
                      error={!!error}
                      label="Địa chỉ doanh nghiệp"
                      inputRef={ref}
                      onChange={onChange}
                    />
                  );
                }}
              />

              <Controller
                name="business_type"
                control={control}
                render={({
                  field: { onChange, ref, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      error={!!error}
                      label="Loại hình"
                      value={value}
                      onChange={onChange}
                      inputRef={ref}
                      select
                      SelectProps={{
                        IconComponent: ExpandMoreIcon,
                      }}
                    >
                      {BUSINESS_TYPE &&
                        BUSINESS_TYPE.map((el) => {
                          return (
                            <MenuItem
                              key={el.value}
                              value={el.value}
                              children={
                                <Typography
                                  variant="caption1"
                                  children={el.name}
                                />
                              }
                            />
                          );
                        })}
                    </TextField>
                  );
                }}
              />

              {/* Fields for company */}
              {watch("business_type") === "company" && (
                <Box>
                  <Controller
                    name="business_registration_id"
                    control={control}
                    render={({
                      field: { onChange, ref, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <TextField
                          value={value}
                          error={!!error}
                          inputRef={ref}
                          onChange={onChange}
                          label="Mã số giấy phép kinh doanh"
                        />
                      );
                    }}
                  />

                  <DatePicker
                    label="Ngày cấp"
                    control={control}
                    name="business_registration_date"
                  />

                  <Controller
                    name="business_registration_place"
                    control={control}
                    render={({
                      field: { onChange, ref, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <TextField
                          value={value}
                          error={!!error}
                          label="Nơi cấp"
                          inputRef={ref}
                          onChange={onChange}
                        />
                      );
                    }}
                  />
                </Box>
              )}

              {/* Fields for individual */}
              {watch("business_type") === "individual" && (
                <Box>
                  <Controller
                    name="tax_id"
                    control={control}
                    render={({
                      field: { onChange, ref, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <TextField
                          value={value}
                          error={!!error}
                          label="Mã số thuế cá nhân"
                          inputRef={ref}
                          onChange={onChange}
                        />
                      );
                    }}
                  />
                </Box>
              )}

              <Controller
                name="terms"
                control={control}
                render={({
                  field: { onChange, ref, value },
                  fieldState: { error },
                }) => {
                  return (
                    <StyledWrapperTerms>
                      <Checkbox
                        ref={ref}
                        checked={value}
                        value={value}
                        onChange={onChange}
                      />

                      <Typography
                        variant="button2"
                        fontWeight={400}
                        lineHeight="20px"
                      >
                        Bằng cách tiếp tục, tôi đồng ý rằng Đổi Điểm có thể thu
                        thập và sử dụng thông tin do tôi cung cấp. Thay mặt cho
                        công ty đăng ký, tôi đã đọc và hiểu các điều khoản trong
                        <span
                          className="special"
                          onClick={() => {
                            window.open("/chinh-sach-su-dung", "_blank");
                          }}
                        >
                          {" "}
                          Chính Sách Bảo Mật{" "}
                        </span>{" "}
                        của Đổi Điểm
                      </Typography>
                    </StyledWrapperTerms>
                  );
                }}
              />

              <StyledLoadingButton
                type="submit"
                loading={loadingNoti}
                loadingPosition="end"
                endIcon={null}
                variant="contained"
                color="secondary"
                disabled={!watch("terms")}
              >
                {loadingNoti ? <span>ĐANG XỬ LÝ</span> : <span>ĐĂNG KÝ</span>}
              </StyledLoadingButton>

              <StyledWrapperNote>
                <Typography variant="button2" fontWeight={400} fontSize="13px">
                  Bằng cách gửi biểu mẫu này, tôi đồng ý với các
                  <span
                    className="special"
                    onClick={() => {
                      window.open("/dieu-khoan-dieu-kien", "_blank");
                    }}
                  >
                    {" "}
                    Điều khoản và điều kiện{" "}
                  </span>{" "}
                  của Đổi Điểm
                </Typography>
              </StyledWrapperNote>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <WrapperLineTitle>
              <LineTitle titleData={qr_title} type="center" />
            </WrapperLineTitle>

            <WrapperQrImage />

            <RegisterMobileApp
              title={qr_subtitle}
              android={setting.android_store}
              ios={setting.ios_store}
            />
          </Grid>
        </Grid>
      </StyledContainer>
    </Box>
  );
}

const WrapperLineTitle = styled(Box)(({ theme }) => {
  return {
    paddingTop: "2.5rem",
    paddingBottom: "2.5rem",
    [theme.breakpoints.down("md")]: {
      paddingBottom: "2.5rem",
    },
  };
});

const StyledContainer = styled(Container)(({ theme }) => {
  return {
    marginBottom: "4.5rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2.5rem",
    },
  };
});

const StyledLoadingButton = styled(LoadingButton)(() => {
  return {
    width: "100%",
    gap: "0.62rem",

    "& .MuiLoadingButton-loadingIndicator": {
      position: "initial !important",
    },
  };
});

const StyledWrapperTerms = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "10px",
    marginTop: "-20px",

    "& .special": {
      color: theme.palette.secondary.main,
      fontWeight: 600,
      cursor: "pointer",
    },
  };
});

const StyledWrapperNote = styled(Box)(({ theme }) => {
  return {
    textAlign: "center",
    "& .special": {
      color: theme.palette.secondary.main,
      fontWeight: 600,
      cursor: "pointer",
    },
  };
});
