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
      appendTitle={
        <>
          <button className="my-auto" onClick={refresh}>
            <Icon name="refresh" />
          </button>
        </>
      }
      open={isModalOpen}
      onClose={() => {
        dispatch(setNotificationModal(false));
      }}
      innerContentStyles="!mt-[16px]"
    >
      <>
        {isRefreshing ? (
          <div className="my-32">
            <Loader type="spinner" />
          </div>
        ) : (
          <div
            className="py-3 flex flex-col divide-y divide-white divide-opacity-10 max-h-[100%] lg:max-h-[460px] overflow-y-scroll"
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
                          className="w-full h-[65px] object-cover"
                          src={i.image}
                        />
                      ) : (
                        <Icon name="default-video" className="w-full h-full" />
                      )}
                    </div>
                    <div className="flex flex-col gap-2 min-w-[65%] lg:min-w-[80%]">
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
        )}
      </>
    </OverlayModal>
  );
}
