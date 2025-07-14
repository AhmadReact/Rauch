import React from "react";
import icon2 from "../../../assets/Group 71.png";
import icon3 from "../../../assets/Group 492.png";
import icon4 from "../../../assets/Group 119.png";
import Image from "next/image";
import { useGetExpressQuery } from "@/app/store/apis/API";
import {
  Mytooltip,
  fixedDeviceSim,
  netlink_5g,
  netlink_fortress,
} from "@/app/helperData/constants";
import { useDispatch, useSelector } from "react-redux";
import { getCartDetail, upgradeCart } from "@/app/store/thunks/CartThunks";
import { updateLoaderState } from "@/app/store/slices/LoaderSlice";
import Swal from "sweetalert2";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";

const OptionalUpgrades = () => {
  const { data: fetchNetlink5G, isFetching: isfetchingNetlink5G } =
    useGetExpressQuery(netlink_5g);

  const { data: fetchNetlinkFortress, isFetching: isfetchingFortress } =
    useGetExpressQuery(netlink_fortress);

  const { order_hash, cart_detail } = useSelector((state) => {
    return state.cart;
  });
  const dispatch = useDispatch();

  const upgradeCartWrapper = (id) => {
    if (cart_detail.order_groups.some((obj) => obj.device.id == id)) {
      id = fixedDeviceSim.device_id;
    }

    let dynamicPromises = [];
    dispatch(updateLoaderState(true));
    cart_detail.order_groups.forEach((obj) => {
     
      obj.order_groups_arr.map((x) => {
        let tmp = {
          order_hash: order_hash,
          order_group_id: x,
          device_id: id,
        };
        dynamicPromises.push(dispatch(upgradeCart(tmp)).unwrap());
        return x;
      });

      return obj;
    });

    Promise.all(dynamicPromises)
      .then(() => {
        dispatch(getCartDetail(order_hash))
          .unwrap()
          .then(() => {
            dispatch(updateLoaderState(false));
            Swal.fire({
              title: "Cart updated",
              text: "Cart has been updated",
              icon: "success",
            });
          });
      })
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
        });
      });
  };

  if (isfetchingNetlink5G || isfetchingFortress) {
    return (
      <div className="text-center gap-4 gap-y-8 p-3  md:p-5 border-[#868686] border items-center">
        <h2 className="flicker">Fetching data....</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 md:grid-cols-5 gap-4 gap-y-8 p-3  md:p-5 border-[#868686] border items-center">
      <div className="max-md:col-span-2"></div>
      <div className=" md:col-span-3 text-[#868686] font-bold">Product</div>

      <div className=" text-[#868686] font-bold md:relative md:left-5">
        Price
      </div>

      <div className="max-md:col-span-2 flex flex-col md:flex-row gap-y-5 gap-x-10 justify-center ">
        {/* <div>
              <Image src={icon1} alt="icon1" />
            </div> */}
        <div
          className=" flex md:justify-center items-center gap-x-3  cursor-pointer"
          onClick={() => upgradeCartWrapper(netlink_5g)}
        >
          {cart_detail?.order_groups?.some(
            (obj) => obj?.device?.id == netlink_5g
          ) ? (
            <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="41.659"
              height="41.659"
              viewBox="0 0 41.659 41.659"
            >
              <g
                id="Group_217"
                data-name="Group 217"
                transform="translate(-2309.969 -4271.981)"
              >
                <circle
                  id="Ellipse_61"
                  data-name="Ellipse 61"
                  cx="20.329"
                  cy="20.329"
                  r="20.329"
                  transform="translate(2310.469 4272.481)"
                  fill="none"
                  stroke="#868686"
                  strokeMiterlimit="10"
                  strokeWidth="1"
                />
                <circle
                  id="Ellipse_62"
                  data-name="Ellipse 62"
                  cx="12.591"
                  cy="12.591"
                  r="12.591"
                  transform="translate(2318.207 4280.219)"
                  fill="#f77e0f"
                />
              </g>
            </svg>
            </div>
          ) : (
            <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="41.659"
              height="41.659"
              viewBox="0 0 41.659 41.659"
            >
              <g
                id="Group_39"
                data-name="Group 39"
                transform="translate(-315.257 -10989.141)"
              >
                <circle
                  id="Ellipse_10"
                  data-name="Ellipse 10"
                  cx="20.329"
                  cy="20.329"
                  r="20.329"
                  transform="translate(315.757 10989.641)"
                  fill="none"
                  stroke="#868686"
                  strokeMiterlimit="10"
                  strokeWidth="1"
                />
              </g>
            </svg>
            </div>
          )}

          <Image
            src={
              fetchNetlink5G?.primary_image
                ? fetchNetlink5G.primary_image
                : icon3
            }
            alt="icon1"
            width={91}
            height={76}
          />
        </div>
      </div>

      <div className="md:col-span-3 max-md:text-[10px] text-black ">
        <h2 className="font-bold max-md:text-[14px] flex items-center">
          {fetchNetlink5G?.name}
          {/* <Tooltip title="5G , wide range antennas" placement="right" arrow>
             <div>
              <Mytooltip />
              </div>
          </Tooltip> */}
        </h2>
        <p className="text-[#858585] max-md:text-[11px] italic">
          {fetchNetlink5G?.notes}
        </p>
      </div>

      <div className="flex max-md:flex-col justify-between md:relative md:left-5">
        <div>
          <h2 className="font-bold">${fetchNetlink5G?.amount}</h2>
          <h2 className="text-[#868686] max-md:text-[13px] italic">One time</h2>
          {/* {obj.plan_prorated_amt && (
                <h3 className="text-[#36B5C0] text-[12px]"><span className="text-[15px] font-bold">${obj.plan_prorated_amt * obj.qty}</span> prorated through {formated_date(cart_detail?.customer?.billing_end)}</h3>
              )} */}
        </div>
        {/* <div >
              <TiDeleteOutline
                fontSize={30}
                className="cursor-pointer hidden md:block"
                onClick={() => removeItem(obj.id)}
              />
            </div> */}
      </div>

      <div className="max-md:col-span-2 flex flex-col md:flex-row gap-y-5  justify-center">
        {/* <div>
             
              <div className="w-[32px]"></div>
            </div> */}
        <div
          className="  flex md:justify-center items-center gap-x-3  cursor-pointer "
          onClick={() => upgradeCartWrapper(netlink_fortress)}
        >
          {cart_detail?.order_groups?.some(
            (obj) => obj?.device?.id == netlink_fortress
          ) ? (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="41.659"
                height="41.659"
                viewBox="0 0 41.659 41.659"
              >
                <g
                  id="Group_217"
                  data-name="Group 217"
                  transform="translate(-2309.969 -4271.981)"
                >
                  <circle
                    id="Ellipse_61"
                    data-name="Ellipse 61"
                    cx="20.329"
                    cy="20.329"
                    r="20.329"
                    transform="translate(2310.469 4272.481)"
                    fill="none"
                    stroke="#868686"
                    strokeMiterlimit="10"
                    strokeWidth="1"
                  />
                  <circle
                    id="Ellipse_62"
                    data-name="Ellipse 62"
                    cx="12.591"
                    cy="12.591"
                    r="12.591"
                    transform="translate(2318.207 4280.219)"
                    fill="#f77e0f"
                  />
                </g>
              </svg>
            </div>
          ) : (
            <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="41.659"
              height="41.659"
              viewBox="0 0 41.659 41.659"
            >
              <g
                id="Group_39"
                data-name="Group 39"
                transform="translate(-315.257 -10989.141)"
              >
                <circle
                  id="Ellipse_10"
                  data-name="Ellipse 10"
                  cx="20.329"
                  cy="20.329"
                  r="20.329"
                  transform="translate(315.757 10989.641)"
                  fill="none"
                  stroke="#868686"
                  strokeMiterlimit="10"
                  strokeWidth="1"
                />
              </g>
            </svg>
            </div>
          )}

          <Image
            src={
              fetchNetlinkFortress?.primary_image
                ? fetchNetlinkFortress.primary_image
                : icon4
            }
            alt="icon1"
            width={91}
            height={76}
          />
        </div>
      </div>

      <div className=" md:col-span-3 max-md:text-[10px] text-black ">
        <h2 className="font-bold max-md:text-[14px] cursor-pointer flex items-center">
          {fetchNetlinkFortress?.name}
          {/* <Tooltip
            title="5G , wide range antennas"
            placement="top"
            arrow
          
          >
            <div>
              <Mytooltip />
              </div>
          </Tooltip> */}
        </h2>
        <p className="text-[#858585] max-md:text-[11px] italic">
          {fetchNetlinkFortress?.notes}
        </p>
      </div>

      {/* <div className="max-md:flex max-md:justify-center">
            <div className="grid max-md:grid-rows-3 md:grid-cols-3 h-[120px] w-[30px]  md:w-[120px] md:h-[40px] border-[#868686] border">
              <div
                // onClick={() => removeOneWrapper(obj.id,obj.plan.name)}
                className=" cursor-pointer max-md:order-3 bg-[#F0F0F0] border-[#868686] text-[#868686] md:border-r font-bold flex justify-center items-center "
              >
                -
              </div>
              <div className="max-md:order-2 flex justify-center text-[#868686]  items-center ">
                  1
              </div>
              <div
                // onClick={() => addOne(obj.plan.id,obj.plan.name)}
                className="cursor-pointer max-md:order-1 bg-[#F0F0F0] border-[#868686] text-[#868686]  md:border-l font-bold flex justify-center items-center"
              >
                +
              </div>
            </div>
          </div> */}

      <div className="flex max-md:flex-col justify-between  md:relative md:left-5">
        <div>
          <h2 className="font-bold">${fetchNetlinkFortress?.amount}</h2>
          <h2 className="text-[#868686] max-md:text-[13px] italic">One time</h2>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default OptionalUpgrades;
