import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Icon from "../../../../components/Icon";
import { useDispatch, useSelector } from "react-redux";
import { getMediaStatus } from "../../actions";
import Loader from "../../../../components/Loader";

export default function Notifications() {
  const dispatch = useDispatch();

  const refresh = () => {
    dispatch(getMediaStatus());
  };

  const mediaStatus = useSelector((state: any) => state.media.mediaStatus);
  const isRefreshing = useSelector(
    (state: any) => state.loaders.statusRefreshingLoader
  );

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

  return (
    <Menu as="div" className="outline-none relative text-left">
      <div>
        <Menu.Button onClick={refresh}>
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
        <Menu.Items className="outline-none absolute z-10 mt-1.5 right-0 w-auto lg:w-[719px] origin-top-right rounded-md bg-tertiary shadow-lg">
          <button
            className="text-white text-opacity-20 text-xs font-bold uppercase absolute right-5 top-5"
            onClick={refresh}
          >
            {isRefreshing ? <Loader small /> : <Icon name="refresh" />}
          </button>
          <h1 className="text-white text-opacity-20 text-xs font-bold uppercase p-12">
            My videos
          </h1>

          {isRefreshing ? (
            <div className="min-h-[460px]r">
              <div className="my-auto h-full mb-32 mt-12">
                <Loader type="spinner" />
              </div>
            </div>
          ) : (
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
                      <div className="w-full h-[65px]">
                        {i.image ? (
                          <img
                            className="w-full h-full object-cover"
                            src={i.image}
                          />
                        ) : (
                          <Icon
                            name="default-video"
                            className="w-full h-full"
                          />
                        )}
                      </div>
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
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
