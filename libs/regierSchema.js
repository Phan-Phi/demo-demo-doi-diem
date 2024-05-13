import { string, object, mixed } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";

export const defaultValues = {
  store_name: "",
  presentator: "",
  email: "",
  phone: "",
  website: "",
  address: "",
  business_type: "company",
  terms: false,
  business_registration_id: "",
  business_registration_date: null,
  business_registration_place: "",
  tax_id: "",
};

export const registerSchema = yupResolver(
  object().shape({
    store_name: string("Vui lòng nhập nội dung").required(),
    presentator: string("Vui lòng nhập nội dung").required(),
    phone: string()
      .required()
      .test({
        test: (value) => {
          if (value) {
            const phoneNumber = parsePhoneNumber(value);

            if (phoneNumber) {
              if (phoneNumber.country !== "VN") {
                return false;
              }
              if (isValidPhoneNumber(phoneNumber.number)) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        },
        message: "Số điện thoại không hợp lệ",
        name: "validate",
      }),
    email: string("Vui lòng nhập nội dung")
      .required()
      .email("Vui lòng nhập đúng định dạng email"),
    website: string("Vui lòng nhập nội dung"),
    address: string("Vui lòng nhập nội dung").required(),
    business_type: mixed(),
    terms: mixed(),
    tax_id: string(),
    business_registration_id: string(),
    business_registration_date: mixed().nullable(),
    business_registration_place: string(),
  })
);
