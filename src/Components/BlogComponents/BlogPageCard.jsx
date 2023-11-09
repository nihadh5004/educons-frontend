import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
const BlogPageCard = ({
  id,
  user,
  image,
  heading,
  created_at,
  content,
  is_admin,
}) => {
  const formattedDate = new Date(created_at).toLocaleDateString();
  const navigate = useNavigate();
  return (
    <div>
      <Card className="w-full h-[500px] max-w-[28rem] mt-2 shadow-lg">
        <CardHeader floated={false} color="blue-gray" className="">
          <img
            src={image} // Use the image prop here
            alt="ui/ux review check"
            className="h-[250px]"
          />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="font-medium">
              {heading}
            </Typography>
          </div>
          <div className="mb-3 flex items-center justify-between">
            <Typography
              variant="p"
              color="gray"
              className="font-medium text-sm text-gray-500"
            >
              {user}, on {formattedDate}
            </Typography>
          </div>
          <Typography color="gray">{content}....</Typography>
        </CardBody>
        <CardFooter className="pt-3">
          {is_admin ? (
            <button
              size="lg"
              fullWidth={true}
              className="w-full"
              onClick={() => navigate(`/admin-blog-details?id=${id}`)}
            >
              <a class="relative inline-flex items-center justify-center p-4 px-6 py-2 overflow-hidden font-medium text-[#20B486] transition duration-300 ease-out border-2 border-[#20B486] w-full shadow-md group">
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
                  View Full Blog
                </span>
                <span class="relative invisible">Button Text</span>
              </a>
            </button>
          ) : (
            <button
              size="lg"
              className=" w-full"
              onClick={() => navigate(`/blog-details?id=${id}`)}
            >
              <a class="relative inline-flex items-center justify-center p-4 px-6 py-2 overflow-hidden font-medium text-[#20B486] transition duration-300 ease-out border-2 border-[#20B486] w-full shadow-md group">
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
                  View Full Blog
                </span>
                <span class="relative invisible">Button Text</span>
              </a>
            </button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default BlogPageCard;
