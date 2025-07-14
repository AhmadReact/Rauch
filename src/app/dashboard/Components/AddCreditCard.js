import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";
import states from "../../helperData/states.json";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomerCard,
  getUserBillingCards,
} from "@/app/store/thunks/UserThunks";
import { updateLoaderState } from "@/app/store/slices/LoaderSlice";
import Swal from "sweetalert2";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="0000 0000 0000 0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const MMYY = React.forwardRef(function MMYY(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00/00"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

MMYY.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const AddCreditCard = () => {
  const enableAddCard = () => {
    if (addCard) {
      setAddCard(false);
    } else {
      setAddCard(true);
    }
  };
  const [addCard, setAddCard] = useState(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => {
    return state.user;
  });
  const formik = useFormik({
    initialValues: {
      payment_card_holder: "",
      expires_mmyy: "",
      payment_cvc: "",
      month: "",
      year: "",
      payment_card_no: "",
      billing_address1: "",
      billing_city: "",
      billing_zip: "",
      billing_state_id: "",
    },
    onSubmit: (values) => {
      // Handle form submission

      if (Object.keys(formik.errors).length > 0) {
        return;
      } else {
        addCardWrapper();
      }
      // isSignedIn?checkout2():checkout()
    },
    validate: (values) => {
      const errors = {};
      var zipRegex = /^(?:(\d{5})(?:[ \-](\d{4}))?)$/i;
      // Perform validation logic for each field

      if (!values.payment_card_holder) {
        errors.payment_card_holder = "Card holder is required";
      }
      if (!values.expires_mmyy) {
        errors.expires_mmyy = "Expiry is required";
      }
      if (!values.payment_cvc) {
        errors.payment_cvc = "CVC is required";
      }
      if (!values.billing_address1) {
        errors.billing_address1 = "Address is required";
      }
      if (!values.billing_state_id) {
        errors.billing_state_id = "State is required";
      }

      if (!values.billing_zip) {
        errors.billing_zip = "Zip is required";
      }

      if (!values.billing_zip) {
        errors.billing_zip = "Zip is required";
      } else if (!zipRegex.test(values.billing_zip)) {
        errors.billing_zip = "Enter valid zipcode";
      }

      if (!values.payment_card_no) {
        errors.payment_card_no = "Card no is required";
      }

      if (!values.billing_city) {
        errors.billing_city = "City is required";
      }
      // Add validation logic for other fields

      return errors;
    },
  });

  const addCardWrapper = () => {
    let obj = formik.values;
    obj.new_card = 1;
    obj.customer_id = userInfo.id;
    obj.api_key = "alar324r23423";
    obj.billing_fname = userInfo.billing_fname;
    obj.billing_lname = userInfo.billing_lname;
    dispatch(updateLoaderState(true));
    dispatch(addCustomerCard(obj))
      .unwrap()
      .then((result) => {
        if (result.success == true) {
          dispatch(getUserBillingCards(userInfo.id))
            .unwrap()
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Card Added Successfully",
              });
              dispatch(updateLoaderState(false));
              formik.resetForm();
            });
        } else {
          dispatch(updateLoaderState(false));

          Swal.fire({
            icon: "Error",
            title: "Error Adding Card",
            text: result.message,
          });
        }
      })
      .catch((error) => {
        dispatch(updateLoaderState(false));
        Swal.fire({
          icon: "Error",
          title: "Error Adding Card API",
          text: error,
        });
      });
  };

  return (
    <div className="pt-10 pb-10" id="add-card">
      <button
        onClick={enableAddCard}
        className="text-[#2dafbb] text-[15px] pb-5 flex gap-x-4 items-center"
      >
        <FaCirclePlus />
        ADD A CREDIT CARD
      </button>
      {addCard ? (
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-4 gap-4">
              <TextField
                className="col-span-2"
                id="outlined-basic"
                label="Card Number"
                variant="outlined"
                InputProps={{
                  inputComponent: TextMaskCustom,
                }}
                placeholder="0000 0000 0000 0000"
                name="payment_card_no"
                onChange={formik.handleChange}
                value={formik.values.payment_card_no}
                error={
                  formik.touched.payment_card_no &&
                  Boolean(formik.errors.payment_card_no)
                }
                helperText={
                  formik.touched.payment_card_no &&
                  formik.errors.payment_card_no
                }
              />

              <TextField
                id="outlined-basic"
                InputProps={{
                  inputComponent: MMYY,
                }}
                name="expires_mmyy"
                onChange={formik.handleChange}
                value={formik.values.expires_mmyy}
                label="MM/YY"
                error={
                  formik.touched.expires_mmyy &&
                  Boolean(formik.errors.expires_mmyy)
                }
                helperText={
                  formik.touched.expires_mmyy && formik.errors.expires_mmyy
                }
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="CVV"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.payment_cvc}
                name="payment_cvc"
                error={
                  formik.touched.payment_cvc &&
                  Boolean(formik.errors.payment_cvc)
                }
                helperText={
                  formik.touched.payment_cvc && formik.errors.payment_cvc
                }
              />
              <TextField
                className="col-span-2"
                id="outlined-basic"
                label="Cardholder Name"
                onChange={formik.handleChange}
                name="payment_card_holder"
                value={formik.values.payment_card_holder}
                error={
                  formik.touched.payment_card_holder &&
                  Boolean(formik.errors.payment_card_holder)
                }
                helperText={
                  formik.touched.payment_card_holder &&
                  formik.errors.payment_card_holder
                }
                variant="outlined"
              />
              <TextField
                className="col-span-2"
                id="outlined-basic"
                label="Address"
                variant="outlined"
                name="billing_address1"
                onChange={formik.handleChange}
                value={formik.values.billing_address1}
                error={
                  formik.touched.billing_address1 &&
                  Boolean(formik.errors.billing_address1)
                }
                helperText={
                  formik.touched.billing_address1 &&
                  formik.errors.billing_address1
                }
              />
              <TextField
                className="col-span-2"
                id="outlined-basic"
                label="City"
                name="billing_city"
                onChange={formik.handleChange}
                value={formik.values.billing_city}
                variant="outlined"
                error={
                  formik.touched.billing_city &&
                  Boolean(formik.errors.billing_city)
                }
                helperText={
                  formik.touched.billing_city && formik.errors.billing_city
                }
              />
              <TextField
                select
                className="col-span-2"
                id="outlined"
                variant="outlined"
                label="State"
                name="billing_state_id"
                onChange={formik.handleChange}
                value={formik.values.billing_state_id}
                // onChange={handleChange}
                error={
                  formik.touched.billing_state_id &&
                  Boolean(formik.errors.billing_state_id)
                }
                helperText={
                  formik.touched.billing_state_id &&
                  formik.errors.billing_state_id
                }
              >
                {states.map((option, i) => (
                  <MenuItem key={i} value={option.code}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                className="col-span-2"
                id="outlined-basic"
                label="Zip"
                variant="outlined"
                name="billing_zip"
                onChange={formik.handleChange}
                value={formik.values.billing_zip}
                error={
                  formik.touched.billing_zip &&
                  Boolean(formik.errors.billing_zip)
                }
                helperText={
                  formik.touched.billing_zip && formik.errors.billing_zip
                }
              />
            </div>
            <div className="flex pt-10">
              <button
                onClick={enableAddCard}
                className="text-red-500 text-[14px] p-2 rounded border-solid border border-red-500 mr-3 w-20"
              >
                Cancel
              </button>
              <button
                className="bg-[#33cccc] text-white text-[14px] p-2 rounded w-20"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AddCreditCard;
