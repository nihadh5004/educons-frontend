import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { baseUrl } from "../../Store/BaseUrl";
function CheckIcon() {
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

const PaymentDrawer = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <button onClick={handleOpen} variant="gradient" className="mt-2">
        <a class="relative inline-flex items-center justify-center p-4 px-8 py-2 overflow-hidden font-medium text-[#20B486] transition duration-300 ease-out border-2 border-[#20B486] rounded-sm shadow-md group">
          <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#20B486] group-hover:translate-x-0 ease">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span class="absolute flex items-center justify-center w-full h-full text-[#20B486] transition-all duration-300 transform group-hover:translate-x-full ease">
            Message 
          </span>
          <span class="relative invisible">Chat</span>
        </a>
      </button>
      <Dialog open={open} handler={handleOpen}>
        {/* <DialogBody divider color="transparent"> */}
        <Card
          color="gray"
          variant="gradient"
          className="w-full rounded-lg  p-8"
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
          >
            <Typography
              variant="small"
              color="white"
              className="font-normal uppercase"
            >
              standard
            </Typography>
            <Typography
              variant="h1"
              color="white"
              className="mt-6 flex justify-center gap-1 text-7xl font-normal"
            >
              <span className="mt-2 text-4xl">$</span>29{" "}
              <span className="self-end text-4xl"></span>
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">Premium Badge</Typography>
              </li>
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">Unlimited Chats</Typography>
              </li>
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">
                  Connect with international students
                </Typography>
              </li>
            </ul>
          </CardBody>
          <CardFooter className="mt-12 p-0">
          { isAuthenticated ? 
            <form
              action={`${baseUrl}/api/stripe/create-checkout-session`}
              method="POST"
            >
              
              <Button
                size="lg"
                color="white"
                className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                ripple={false}
                fullWidth={true}
                type="submit"
              >
                Buy Premium
              </Button>
            </form>
            :
            <Button
            size="lg"
            color="white"
            className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            ripple={false}
            fullWidth={true}
            type="button"
            onClick={()=>navigate('/login')}
          >
            Buy Premium
          </Button>
          }
          </CardFooter>
        </Card>
        {/* </DialogBody> */}
      </Dialog>
    </>
  );
};

export default PaymentDrawer;
