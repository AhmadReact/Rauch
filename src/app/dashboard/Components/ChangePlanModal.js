import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
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
import {
  useChangePlanMutation,
  useGetCompatibleAddonQuery,
  useGetCompatiblePlanQuery,
} from "@/app/store/apis/API";
import {
  getCartDetail,
  getCartDetailUpgrate,
} from "@/app/store/thunks/CartThunks";
import { useRouter } from "next/navigation";
import { ArrowRightAltTwoTone } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ChangePlanModal = ({ open, setOpen, data }) => {
  const { data: getCompatiblePlan } = useGetCompatiblePlanQuery({
    customer_id: data?.customer_id,
    subscription_id: data?.id,
  });

  const style = {
    height: "800px",
  };
  const mediaStyle = {
    "@media (max-width: 768px)": {
      ...style,
      height: "800px",
    },
  };

  const filterPlans = () => {
    return typeof getCompatiblePlan === "object"
      ? Object.keys(getCompatiblePlan).filter((key) => !isNaN(key))
      : [];
  };

  const [selectedPlan, setSelectedPlan] = useState(
    getCompatiblePlan ? getCompatiblePlan.active_plan : 0
  );
  const [addonArr, setAddonArr] = useState([]);
  const { data: getCompatibleAddon } = useGetCompatibleAddonQuery(selectedPlan);

  const handleChange = (event) => {
    setSelectedPlan(event.target.value);
    setAddonArr(data?.subscription_addon_not_removed);
  };

  useEffect(() => {
    setAddonArr(data?.subscription_addon_not_removed);
  }, [data]);
  const [changePlan] = useChangePlanMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const handleChangePlan = () => {
    let tmp = {
      plan: String(selectedPlan),
      active_plans: String(getCompatiblePlan.active_plan),
      account_status: String(0),
      subscription_id: String(data?.id),
      active_addons: data?.subscription_addon_not_removed
        ?.filter(
          (x) =>
            x.status == "active" || x.status == "for-adding" || "for-removal"
        )
        .map((x) => x.addon_id)
        ?.join(","),
      removal_scheduled_addon: data?.subscription_addon_not_removed
        ?.filter((x) => x.status == "removal-scheduled")
        .map((x) => x.addon_id)
        ?.join(","),
      paid_monthly_invoice: String(0),
      addon: addonArr
        .filter(
          (x) =>
            x.status != "removal-scheduled" ||
            x.status != "for-adding" ||
            x.status != "for-removal"
        )
        .map((x) => x.addon_id),
      id: String(0),
    };

    dispatch(updateLoaderState(true));
    changePlan(tmp).then((result) => {
      dispatch(getCartDetailUpgrate(result.data.hash)).then(() => {
        dispatch(updateLoaderState(false));
        router.push("/plans");
      });
    });
  };

  const handleAddon = (addon) => {
    if (addonArr.some((x) => x.addon_id == addon.addon_id)) {
      setAddonArr(
        addonArr.reduce(
          (total, obj) =>
            obj.addon_id != addon.addon_id ? [...total, obj] : total,
          []
        )
      );
    } else {
      setAddonArr([...addonArr, addon]);
    }
  };

  function arraysEqual(arr1, arr2) {
    if (getCompatiblePlan.active_plan == selectedPlan) {
      if (arr1.length != arr2.length) {
        return false;
      }
      for (let i = 0; i < arr1.length; i++) {
        if (!arr2.some((x) => x.addon_id == arr1[i].addon_id)) {
          return false;
        }
      }

      return true;
    }

    return false;
  }

  useEffect(() => {
    setSelectedPlan(getCompatiblePlan ? getCompatiblePlan.active_plan : 0);
  }, [getCompatiblePlan]);

  if (!getCompatiblePlan) return <div></div>;
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
          Change Plan
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
          <table>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Monthly Cost</th>
            </tr>
            {filterPlans()?.map((obj, i) => {
              return (
                <tr
                  key={i}
                  className={`text-center ${
                    getCompatiblePlan.active_plan ==
                      getCompatiblePlan[obj].id && "bg-[#f9cccc]"
                  } `}
                >
                  <td>
                    <Radio
                      checked={selectedPlan == getCompatiblePlan[obj].id}
                      value={getCompatiblePlan[obj].id}
                      onChange={handleChange}
                    />
                  </td>
                  <td>{getCompatiblePlan[obj].name}</td>
                  <td>$ {getCompatiblePlan[obj].amount_recurring}</td>
                </tr>
              );
            })}
          </table>
        </DialogContent>

        {getCompatibleAddon?.length > 0 && (
          <>
            {" "}
            <DialogTitle>
              Add ON
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
              <table>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Monthly Cost</th>
                </tr>

                {getCompatibleAddon?.map((obj, i) => {
                  return (
                    <tr
                      key={i}
                      className={`text-center ${
                        data?.subscription_addon_not_removed?.some(
                          (x) => x.addon_id == obj.addon_id
                        ) && "bg-[#f9cccc]"
                      } `}
                    >
                      <td>
                        {data.subscription_addon_not_removed.some(
                          (x) => x.addon_id == obj.addon_id
                        ) &&
                        data.subscription_addon_not_removed.find(
                          (x) => x.addon_id == obj.addon_id
                        ).status == "removal-scheduled" ? (
                          "removal-scheduled"
                        ) : (
                          <Checkbox
                            checked={addonArr.some(
                              (x) => x.addon_id == obj.addon_id
                            )}
                            onChange={() => handleAddon(obj)}
                          />
                        )}
                      </td>
                      <td>{obj.addon.name}</td>
                      <td>$ {obj.addon.amount_recurring}</td>
                    </tr>
                  );
                })}
              </table>
            </DialogContent>
          </>
        )}
        <div className="flex justify-center my-10">
          <Button
            disabled={arraysEqual(
              addonArr,
              data?.subscription_addon_not_removed
            )}
            variant="outlined"
            onClick={handleChangePlan}
          >
            Done
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default ChangePlanModal;
