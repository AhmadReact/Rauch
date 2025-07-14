import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IoMdClose } from "react-icons/io";
import visaCard from "../../assets/visa.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// import { MakePayment } from "../../Service/Service";
import Swal from "sweetalert2";
// import { Spinner } from "react-bootstrap";
import { useEffect } from "react";
import Image from "next/image";
import {
  chargeCardWithOutOrder,
  customerInvoices,
} from "@/app/store/thunks/UserThunks";
import { updateLoaderState } from "@/app/store/slices/LoaderSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const PaymentModal = ({
  open,
  handleOpenModal,
  totalAmount,
  refresh,
  setOpen,
}) => {
  const { billingCards, userInfo } = useSelector((state) => {
    return state.user;
  });

  const handleClose = () => {
    setOpen(false);
  };
  const [loading, setloading] = useState(false);
  const [amount, setAmount] = useState(totalAmount);
  const [creditCardId, setCreditCardId] = useState(
    billingCards?.length > 0 && billingCards?.find((x) => x?.default === 1)?.id
  );
  const [errorMessage, setErrorMessage] = useState(false);
  useEffect(() => {
    setAmount(totalAmount);
  }, [totalAmount]);

  const dispatch = useDispatch();

  const MakepaymentHandler = () => {
    if (!creditCardId) {
      setErrorMessage("Please choose credit card");
    } else if (!amount) {
      setErrorMessage("Please provide amount");
    } else if (amount && amount < 0) {
      setErrorMessage("Amount Should be greater then 0");
    } else {
      dispatch(updateLoaderState(true));
      setErrorMessage();

      dispatch(
        chargeCardWithOutOrder({
          credit_card_id: creditCardId,
          amount: amount,
          without_order: true,
          customer_id: userInfo.id,
        })
      )
        .unwrap()
        .then((result) => {
          dispatch(customerInvoices(userInfo));
          dispatch(updateLoaderState(false));
          setOpen(false);
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Payment Sucessfull!",
          });
        });

      // MakePayment(creditCardId, amount).then((res) => {
      //   if (res.original.success === true) {
      //     handleOpenModal();
      //     refresh()
      //     Swal.fire({
      //       icon: "success",
      //       title: "Success!",
      //       text: "Payment Sucessfull!",
      //     });
      //     setloading(false);
      //   } else {
      //     setloading(false);
      //   }
      // }).catch((reson)=>{
      //   setloading(false);
      //   handleOpenModal();
      //     refresh()
      //     console.clear();
      //   console.log(reson);
      //   Swal.fire({
      //     icon: "error",
      //     title: "Server error",
      //   });
      // });
    }
  };
  const style = {
    height: "300px",
  };
  const mediaStyle = {
    "@media (max-width: 768px)": {
      ...style,
      height: "unset",
    },
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        sx={{ ...style, ...mediaStyle }}
        maxWidth="md"
      >
        <DialogTitle>
          {"Make transaction"}
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <IoMdClose />
          </IconButton>
        </DialogTitle>
        <DialogContent maxWidth="lg">
          <div
            className="make-payment-dialog"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div>
              <Image src={visaCard} alt="visa" />
            </div>
            <Stack spacing={2}>
              <div>
                <InputLabel
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#aab8bd",
                  }}
                >
                  Card:
                </InputLabel>
              </div>
              <div>
                <FormControl variant="standard" sx={{ width: 100 }}>
                  <Select
                    defaultValue={
                      billingCards?.length > 0 &&
                      billingCards?.find((x) => x?.default === 1)?.id
                    }
                    // value={creditCardId}
                    onChange={(e) => {
                      setCreditCardId(e.target.value);
                    }}
                    sx={{ width: "220px" }}
                  >
                    {billingCards?.length > 0 &&
                      billingCards?.map((data, i) => (
                        <MenuItem value={data?.id} key={i}>
                          {data?.card_type} {data?.last4}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {errorMessage && errorMessage == "Please choose credit card" ? (
                  <Typography
                    style={{ marginTop: 2, fontSize: 12, color: "#c77c7c" }}
                  >
                    {errorMessage}
                  </Typography>
                ) : null}
              </div>
              <Button
                style={{
                  color: "#535353",
                  border: "1px solid #535353",
                  borderRadius: "20px",
                  fontSize: 12,
                  textTransform: "capitalize",
                }}
                onClick={() => {
                  handleClose();
                  document.getElementById("my-account").click();
                  setTimeout(() => {
                    document
                      .getElementById("add-card")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
              >
                Add New Card
              </Button>
            </Stack>
            <Stack spacing={2}>
              <div>
                <InputLabel
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#aab8bd",
                  }}
                >
                  Amount:
                </InputLabel>
              </div>
              <div>
                <TextField
                  id="standard-basic"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  variant="standard"
                  placeholder="0"
                />
                {errorMessage && errorMessage == "Please provide amount" ? (
                  <Typography
                    style={{ marginTop: 2, fontSize: 12, color: "#c77c7c" }}
                  >
                    {errorMessage}
                  </Typography>
                ) : errorMessage == "Amount Should be greater then 0" ? (
                  <Typography
                    style={{ marginTop: 2, fontSize: 12, color: "#c77c7c" }}
                  >
                    {errorMessage}
                  </Typography>
                ) : null}
              </div>
              <Button
                onClick={MakepaymentHandler}
                style={{
                  color: "#535353",
                  border: "1px solid #535353",
                  borderRadius: "20px",
                  fontSize: 12,
                  width: "fit-content",
                  textTransform: "capitalize",
                }}
              >
                Make Payment
              </Button>
            </Stack>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentModal;
