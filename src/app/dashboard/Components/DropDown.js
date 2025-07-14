import * as React from "react";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { FaChevronDown } from "react-icons/fa";
import ChangePlanModal from "./ChangePlanModal";
import { useState } from "react";

export default function TriggersTooltips({
  data,
  openModal,
  setOpenModal,
  setCurrentData,
}) {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleModal = () => {
    setOpenModal(true);
    setCurrentData(data);
  };
  return (
    <>
      <div className="relative">
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div>
            <Button onClick={handleTooltipOpen}>
              <FaChevronDown />
            </Button>

            {open && (
              <div className="absolute bg-[#262626] min-w-[100px] text-white p-3 rounded-md">
                <ul>
                  {data.status === "active" &&
                    data.upgrade_downgrade_status == null && (
                      <li
                        className="text-nowrap text-[12px] cursor-pointer "
                        onClick={handleModal}
                      >
                        Change Plan
                      </li>
                    )}
                  {
                    <li className="text-nowrap text-[12px] cursor-pointer ">
                      {data.upgrade_downgrade_status}
                    </li>
                  }
                </ul>
              </div>
            )}
          </div>
        </ClickAwayListener>
      </div>
    </>
  );
}
