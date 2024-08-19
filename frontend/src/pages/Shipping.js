import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveShippingInfo } from "../actions/CartAction";
import { Country, State } from "country-state-city";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PinDropIcon from "@mui/icons-material/PinDrop";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import CheckoutSteps from "../components/CheckoutSteps";
import Metadata from "../components/Metadata";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address || !pincode || !phoneNo || !city || !state || !country) {
      enqueueSnackbar("Please fill in all fields", { variant: "error" });
      return;
    }

    if (phoneNo.length < 10 || phoneNo.length > 10) {
        enqueueSnackbar("Phone Number should be 10 digits Long", { variant: "error" });
        return;
    }

    dispatch(saveShippingInfo({ address, pincode, phoneNo, city, state, country }));
    navigate("/order/confirm");
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-5">
        <Metadata title={"Shipping Details"} />
      <CheckoutSteps activeStep={0} />
      <form onSubmit={handleSubmit} className="w-full max-w-lg my-5 p-6 bg-white shadow-md rounded-lg">
        <div className="mb-4">
          <div className="relative">
            <HomeIcon className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <PinDropIcon className="absolute left-3 top-3 text-gray-500" />
            <input
              type="number"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <PhoneIcon className="absolute left-3 top-3 text-gray-500" />
            <input
              type="number"
              placeholder="Phone Number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>


        <div className="mb-4">
          <div className="relative">
            <LocationCityIcon className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>


        <div className="mb-6">
          <div className="relative">
            <PublicIcon className="absolute left-3 top-3 text-gray-500" />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Country
              </option>
              {Country.getAllCountries().map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        
        <div className="mb-4">
          <div className="relative">
            <TransferWithinAStationIcon className="absolute left-3 top-3 text-gray-500" />
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select State
              </option>
              {State.getStatesOfCountry(country).map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        
        <button
          type="submit"
          className="w-full py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-600"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default Shipping;
