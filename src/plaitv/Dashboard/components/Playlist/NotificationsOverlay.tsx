import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../components/Loader";
import OverlayModal from "../../../../components/OverlayModal/OverlayModal";
import { getMediaStatus, setNotificationModal } from "../../actions";
import Icon from "../../../../components/Icon";

export default function NotificationsOverlay({ isPublic, user }: any) {
  const isModalOpen = useSelector(
    (state: any) => state.modal.notificationsModal
  );
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
    <OverlayModal
      title="My videos"
      open={isModalOpen}
      appendContent={
        <button
          className="text-white text-opacity-20 text-xs font-bold uppercase absolute right-5"
          onClick={refresh}
        >
          {isRefreshing ? <Loader small /> : <Icon name="refresh" />}
        </button>
      }
      onClose={() => {
        dispatch(setNotificationModal(false));
      }}
      innerContentStyles="!mt-[16px]"
    >
      <>
        <div className="absolute z-10 mt-1.5 right-0 w-auto lg:w-[719px] origin-top-right rounded-md bg-tertiary shadow-lg">
          <div
            className="py-3 flex flex-col divide-y divide-white divide-opacity-10 max-h-[460px] overflow-y-scroll"
            style={{ color: "rgba(255, 255, 255, 0.6)" }}
          >
            {mediaStatus &&
              mediaStatus.map((i: any, idx: any) => (
                <div key={idx}>
                  <div
                    className={`flex items-cemter justify-between gap-5 py-10 ${
                      (idx === 0 && "pt-0") || ""
                    } px-5 `}
                  >
                    <div className="w-full h-[65px]">
                      {i.image ? (
                        <img
                          className="w-full h-[65px] object-contain"
                          src={i.image}
                        />
                      ) : (
                        <Icon name="default-video" className="w-full h-full" />
                      )}
                    </div>
                    <div className="flex flex-col gap-2 min-w-[65%]">
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
                </div>
              ))}
          </div>
        </div>
      </>
    </OverlayModal>
  );
}
