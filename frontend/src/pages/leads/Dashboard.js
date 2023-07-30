import { useEffect, useState } from "react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";

const Dashboard = () => {
  const [form, setForm] = useState({
    income: "",
    current: "0",
    peak: "0",
    operating_cost1: "0",
    operating_cost2: "0",
    operating_cost3: "0",
    operating_cost4: "0",
    operating_cost5: "0",
    operating_cost6: "0",
    operating_cost7: "0",
    operating_cost8: "0",
    investing_cost1: "0",
    investing_cost2: "0",
    investing_cost3: "0",
    financing_cost1: "0",
    financing_cost2: "0",
    financing_cost3: "0",
  });

  const [statusOperating, setStatusOperating] = useState("");
  const [statusColorOperating, setStatusColorOperating] = useState("");
  const [statusInvesting, setStatusInvesting] = useState("");
  const [statusColorInvesting, setStatusColorInvesting] = useState("");
  const [statusFinancing, setStatusFinancing] = useState("");
  const [statusColorFinancing, setStatusColorFinancing] = useState("");

  let total_operating_cost =
    parseFloat(form.operating_cost1) +
    parseFloat(form.operating_cost2) +
    parseFloat(form.operating_cost3) +
    parseFloat(form.operating_cost4) +
    parseFloat(form.operating_cost5) +
    parseFloat(form.operating_cost6) +
    parseFloat(form.operating_cost7) +
    parseFloat(form.operating_cost8);
  let operating_monthly = total_operating_cost / parseFloat(form.income);
  let operating_limit = parseFloat(form.income) * 0.6;
  let operating_allocation = 0;
  let operating_exceeding = 0;

  let total_investing_cost =
    parseFloat(form.investing_cost1) +
    parseFloat(form.investing_cost2) +
    parseFloat(form.investing_cost3);
  let investing_monthly = total_investing_cost / parseFloat(form.income);
  let investing_minimum = 0.2 * parseFloat(form.income);
  let investing_amount = investing_minimum - total_investing_cost;

  let total_financing_cost =
    parseFloat(form.financing_cost1) +
    parseFloat(form.financing_cost2) +
    parseFloat(form.financing_cost3);

  let financing_monthly = total_financing_cost / parseFloat(form.income);
  let financing_limit = 0.2 * parseFloat(form.income);
  let financing_amount = 0;

  let [ageCurr, setAgeCurr] = useState(0);
  let [agePeak, setAgePeak] = useState(0);
  var ageLeft = agePeak - ageCurr + 0;
  var message = "You have " + ageLeft + " years remaining to invest!";

  if (isNaN(ageLeft)) {
    ageLeft = 0;
    message = "You have " + 0 + " years remaining to invest!";
  }

  if (total_financing_cost > financing_limit) {
    financing_amount = total_financing_cost - financing_limit;
  } else {
    financing_amount = 0;
  }

  if (total_investing_cost < investing_minimum) {
    investing_amount = investing_minimum - total_investing_cost;
  } else {
    investing_amount = 0;
  }

  if (parseFloat(form.income) * 0.6 - total_operating_cost < 0) {
    operating_allocation = 0;
  } else {
    operating_allocation = parseFloat(form.income) * 0.6 - total_operating_cost;
  }

  if (total_operating_cost > operating_limit) {
    operating_exceeding = total_operating_cost - operating_limit;
  } else {
    operating_exceeding = 0;
  }

  const handleClick = () => {
    if (operating_exceeding > 0) {
      setStatusColorOperating("text-red-500");
      setStatusOperating("UNHEALTHY");
    } else {
      setStatusColorOperating("text-green-500");
      setStatusOperating("HEALTHY");
    }
    if (investing_amount > 0) {
      setStatusColorInvesting("text-red-500");
      setStatusInvesting("UNHEALTHY");
    } else {
      setStatusColorInvesting("text-green-500");
      setStatusInvesting("HEALTHY");
    }
    if (financing_amount > 0) {
      setStatusColorFinancing("text-red-500");
      setStatusFinancing("UNHEALTHY");
    } else {
      setStatusColorFinancing("text-green-500");
      setStatusFinancing("HEALTHY");
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (
    isNaN(operating_monthly) ||
    isNaN(operating_limit) ||
    isNaN(operating_allocation) ||
    isNaN(investing_monthly) ||
    isNaN(investing_minimum) ||
    isNaN(financing_limit) ||
    isNaN(financing_monthly) ||
    isNaN(ageLeft) ||
    isNaN(ageCurr) ||
    isNaN(agePeak)
  ) {
    operating_monthly = 0;
    operating_limit = 0;
    operating_allocation = 0;
    investing_monthly = 0;
    investing_minimum = 0;
    financing_monthly = 0;
    financing_limit = 0;
    ageLeft = 0;
    ageCurr = 0;
    agePeak = 0;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-2">
            <h1 class="font-bold text-2xl text-gray-700">Dashboard</h1>
            <div class="flex flex-col flex-grow bg-white rounded mt-4">
              <div>
                <div className="w-full flex flex-col overflow-auto max-h-[71vh]">
                  <div className="bg-slate-200 w-full shadow-2xl py-10 rounded-3xl flex flex-row justify-around items-center ">
                    <div className="flex flex-wrap h-full justify-around items-start gap-10 w-full">
                      <div className="flex flex-col gap-10 w-[12.9rem]">
                        <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                          <div className=" shrink-0">Monthly Net Income </div>
                          <input
                            value={form.income}
                            onChange={(e) =>
                              setForm({ ...form, income: e.target.value })
                            }
                            disabled={false}
                            type="text"
                            className={`
        form-control
        block
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                            id="exampleFormControlInput1"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-10 w-[12.9rem]">
                        <div className="flex flex-col gap-2 justify-center items-start">
                          <div className=" shrink-0">Status: </div>
                          <div className=" font-khulabold text-lg">
                            {message}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-10 w-[12.9rem]">
                        <div className="flex flex-col gap-2 justify-center items-start">
                          <div className=" shrink-0">Current Age </div>
                          <input
                            // value={form.current}
                            onChange={(e) =>
                              setAgeCurr(parseInt(e.target.value))
                            }
                            disabled={false}
                            type="number"
                            className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                            id="exampleFormControlInput1"
                            placeholder=""
                          />
                        </div>
                        <div className="flex flex-col gap-2 justify-center items-start">
                          <div className=" shrink-0">Peak Age</div>
                          <input
                            // value={form.peak}
                            onChange={(e) =>
                              setAgePeak(parseInt(e.target.value))
                            }
                            disabled={false}
                            type="number"
                            className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                            id="exampleFormControlInput1"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-around gap-10 w-full mt-10">
                    <div className="flex flex-row w-full shadow-2xl justify-around bg-blue-200 rounded-3xl p-10 items-center gap-20">
                      <div className="">
                        <div>Operating Activities</div>
                        <div className="flex flex-col w-min mt-10 gap-10">
                          <div className="flex flex-row w-[27rem] gap-5">
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0">Description </div>
                              <input
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="e.g groceries, gas, etc"
                              />
                            </div>
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0">Amount </div>
                              <input
                                onChange={(e) => {
                                  setForm({
                                    ...form,
                                    operating_cost1: e.target.value,
                                  });
                                }}
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-[27rem] gap-5">
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="e.g groceries, gas, etc"
                              />
                            </div>
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"></div>
                              <input
                                onChange={(e) => {
                                  setForm({
                                    ...form,
                                    operating_cost2: e.target.value,
                                  });
                                }}
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-[27rem] gap-5">
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="e.g groceries, gas, etc"
                              />
                            </div>
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    operating_cost3: e.target.value,
                                  })
                                }
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-[27rem] gap-5">
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="e.g groceries, gas, etc"
                              />
                            </div>
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    operating_cost4: e.target.value,
                                  })
                                }
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-[27rem] gap-5">
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="e.g groceries, gas, etc"
                              />
                            </div>
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    operating_cost5: e.target.value,
                                  })
                                }
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-[27rem] gap-5">
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="e.g groceries, gas, etc"
                              />
                            </div>
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    operating_cost6: e.target.value,
                                  })
                                }
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-[27rem] gap-5">
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="e.g groceries, gas, etc"
                              />
                            </div>
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    operating_cost7: e.target.value,
                                  })
                                }
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-[27rem] gap-5">
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="e.g groceries, gas, etc"
                              />
                            </div>
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    operating_cost8: e.target.value,
                                  })
                                }
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-10 justify-center items-center">
                        {" "}
                        <div className="flex flex-row justify-between items-center w-full">
                          <div className="">
                            Total: PHP {total_operating_cost.toLocaleString()}
                          </div>
                          <div className="flex gap-2 justify-center items-center text-center">
                            <div className="">Status: </div>
                            <div
                              className={`${statusColorOperating} font-khulaXbold`}
                            >
                              {statusOperating}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col mt-10 gap-10">
                          {" "}
                          <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                            <div className=" shrink-0">
                              % of Monthly Income{" "}
                            </div>
                            <input
                              value={operating_monthly}
                              disabled={true}
                              type="text"
                              className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-slate-200 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                              id="exampleFormControlInput1"
                              placeholder=""
                            />
                          </div>
                          <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                            <div className=" shrink-0">Recommended Limit</div>
                            <input
                              value={operating_limit.toLocaleString()}
                              disabled={true}
                              type="text"
                              className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-slate-200 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                              id="exampleFormControlInput1"
                              placeholder=""
                            />
                          </div>
                          <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                            <div className=" shrink-0">Unused Allocation </div>
                            <input
                              value={operating_allocation.toLocaleString()}
                              disabled={true}
                              type="text"
                              className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-slate-200 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                              id="exampleFormControlInput1"
                              placeholder=""
                            />
                          </div>
                          <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                            <div className=" shrink-0">
                              Amount Exceeding Limit{" "}
                            </div>
                            <input
                              value={operating_exceeding.toLocaleString()}
                              disabled={true}
                              type="text"
                              className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-slate-200 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                              id="exampleFormControlInput1"
                              placeholder=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row w-full justify-around bg-blue-200 shadow-2xl rounded-3xl p-10 items-center gap-20">
                      <div className="">
                        <div>Investing Activities</div>
                        <div className="flex flex-col w-min mt-10 gap-10">
                          <div className="flex flex-row w-[27rem] gap-5">
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0">Description </div>
                              <input
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="e.g Health insurance, etc"
                              />
                            </div>
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0">Amount</div>
                              <input
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    investing_cost1: e.target.value,
                                  })
                                }
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-[27rem] gap-5">
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="e.g Health insurance, etc"
                              />
                            </div>
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    investing_cost2: e.target.value,
                                  })
                                }
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-[27rem] gap-5">
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="e.g Health insurance, etc"
                              />
                            </div>
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    investing_cost3: e.target.value,
                                  })
                                }
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-10 justify-center items-center">
                        {" "}
                        <div className="flex flex-row justify-between items-center w-full">
                          <div className="">
                            Total: PHP {total_investing_cost.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex flex-col mt-10 gap-10">
                          {" "}
                          <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                            <div className=" shrink-0">
                              % of Monthly Income{" "}
                            </div>
                            <input
                              value={investing_monthly}
                              disabled={true}
                              type="text"
                              className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-slate-200 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                              id="exampleFormControlInput1"
                              placeholder=""
                            />
                          </div>
                          <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                            <div className=" shrink-0">
                              Minimum Amount Needed
                            </div>
                            <input
                              value={investing_minimum.toLocaleString()}
                              disabled={true}
                              type="text"
                              className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-slate-200 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                              id="exampleFormControlInput1"
                              placeholder=""
                            />
                          </div>
                          <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                            <div className=" shrink-0">Amount Not Invested</div>
                            <input
                              value={investing_amount.toLocaleString()}
                              disabled={true}
                              type="text"
                              className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-slate-200 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                              id="exampleFormControlInput1"
                              placeholder=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row w-full justify-around bg-blue-200 shadow-2xl rounded-3xl p-10 items-center gap-20">
                      <div className="">
                        <div>Financing Activities</div>
                        <div className="flex flex-col w-min mt-10 gap-10">
                          <div className="flex flex-row w-[27rem] gap-5">
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0">Description</div>
                              <input
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="e.g jewelry, etc"
                              />
                            </div>
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0">Amount </div>
                              <input
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    financing_cost1: e.target.value,
                                  })
                                }
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-[27rem] gap-5">
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="e.g jewelry, etc"
                              />
                            </div>
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    financing_cost2: e.target.value,
                                  })
                                }
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-[27rem] gap-5">
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                disabled={false}
                                type="text"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="e.g jewelry, etc"
                              />
                            </div>
                            <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                              <div className=" shrink-0"> </div>
                              <input
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    financing_cost3: e.target.value,
                                  })
                                }
                                disabled={false}
                                type="number"
                                className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                                id="exampleFormControlInput1"
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-10justify-center items-center">
                        {" "}
                        <div className="flex flex-row justify-between items-center w-full">
                          <div className="">
                            Total: PHP {total_financing_cost.toLocaleString()}
                          </div>
                          <div className="flex gap-2 justify-center items-center text-center">
                            <div className="">Status: </div>
                            <div
                              className={`text-red-500 font-khulaXbold ${statusColorFinancing}`}
                            >
                              {statusFinancing}{" "}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col mt-10 gap-10">
                          {" "}
                          <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                            <div className=" shrink-0">
                              % of Monthly Income{" "}
                            </div>
                            <input
                              value={financing_monthly}
                              disabled={true}
                              type="text"
                              className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-slate-200 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                              id="exampleFormControlInput1"
                              placeholder=""
                            />
                          </div>
                          <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                            <div className=" shrink-0">Recommended Limit </div>
                            <input
                              value={financing_limit.toLocaleString()}
                              disabled={true}
                              type="text"
                              className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-slate-200 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                              id="exampleFormControlInput1"
                              placeholder=""
                            />
                          </div>
                          <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                            <div className=" shrink-0">
                              Amount Exceeding Limit{" "}
                            </div>
                            <input
                              value={financing_amount.toLocaleString()}
                              disabled={true}
                              type="text"
                              className={`
        form-control
        block
      
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-slate-200 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
                              id="exampleFormControlInput1"
                              placeholder=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleClick}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Calculate Now!
                    </button>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DashboardFooter />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
