import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import Icon from "../../../../components/Icon";
import { useDispatch, useSelector } from "react-redux";
import { getMediaStatus } from "../../actions";
import Loader from "../../../../components/Loader";

export default function Notifications() {
  const mediaStatus = useSelector((state: any) => state.media.mediaStatus);

  const getStatusIcon = (status: any) => {
    switch (status) {
      case "success":
        return <Icon name="check-circle" />;
      case "failed":
        return <Icon name="x-circle" />;
      case "processing":
        return <Loader type="spinner" small />;
    }
  };

  console.log(mediaStatus);
  return (
    <Menu as="div" className="hidden lg:inline-block relative text-left">
      <div>
        <Menu.Button>
          <Icon name="notification" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 mt-1.5 right-0 w-auto lg:w-[719px] origin-top-right rounded-md bg-tertiary shadow-lg">
          <h1 className="text-white text-opacity-20 text-xs font-bold uppercase p-12">
            My videos
          </h1>

          <div
            className="py-3 flex flex-col divide-y divide-white divide-opacity-10 max-h-[460px] overflow-y-scroll"
            style={{ color: "rgba(255, 255, 255, 0.6)" }}
          >
            {mediaStatus &&
              mediaStatus.map((i: any, idx: any) => (
                <Menu.Item key={idx}>
                  <div
                    className={`flex items-cemter justify-between gap-5 py-10 ${
                      (idx === 0 && "pt-0") || ""
                    } px-8 `}
                  >
                    <Icon
                      name="default-video"
                      className="w-[82.57px] h-[65px]"
                    />
                    <div className="flex flex-col gap-2 min-w-[80%]">
                      <h1 className="!text-white !text-sm">
                        {i.display_title}
                      </h1>
                      <span className="!text-white !text-opacity-50 !text-[10px] !capitalize">
                        {i.media_status}
                      </span>
                      <span className="!text-white !text-opacity-50 !text-[10px] !capitalize">
                        {i.media_status_description}
                      </span>
                    </div>
                    <div className="my-auto">
                      {getStatusIcon(i.media_status)}
                    </div>
                  </div>
                </Menu.Item>
              ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
