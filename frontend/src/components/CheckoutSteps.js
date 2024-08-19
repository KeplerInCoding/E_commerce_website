import React from "react";
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const CheckoutSteps = ({ activeStep }) => {
    
  const steps = [
    {
      label: <Typography className="text-sm">Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography className="text-sm">Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography className="text-sm">Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  return (
    <div className="pt-20">
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        className="w-screen bg-transparent"
        sx={{
          "& .MuiStepConnector-line": {
            borderTopWidth: "2px", 
          },
        }}
      >
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index}
            completed={activeStep >= index}
          >
            <StepLabel
              className={`${
                activeStep >= index ? "text-blue-900" : "text-gray-600"
              } flex items-center`}
              icon={
                <span
                  className={`${
                    activeStep >= index
                      ? "text-blue-900"
                      : "text-gray-600"
                  }`}
                >
                  {item.icon}
                </span>
              }
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CheckoutSteps;
