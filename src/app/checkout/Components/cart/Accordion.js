import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  marginTop: "40px !important",
  "& .MuiAccordionSummary-root": {
    padding: "0px !important",
    "& .MuiAccordion-root::before": {
      padding: "2px",
    },
  },
}));

const AccordionSummary = styled((props) => (
  <>
    <MuiAccordionSummary
      expandIcon={
        props.showIcon ? <ExpandMoreIcon sx={{ fontSize: "2.5rem" }} /> : ""
      }
      {...props}
    />
  </>
))(({ theme }) => ({
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-root": {
    padding: "0px !important",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({}));
Accordion;

export { Accordion, AccordionDetails, AccordionSummary };
