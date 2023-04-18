import { ReactComponent as Edit } from "../assets/edit.svg";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Menu } from "../assets/menu.svg";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as Plus } from "../assets/plus.svg";
import { ReactComponent as Save } from "../assets/save.svg";
import { ReactComponent as MobileMenu } from "../assets/mobile-menu.svg";
import { ReactComponent as Close } from "../assets/close.svg";
import { ReactComponent as SearchIcon } from "../assets/search-icon.svg";
import { ReactComponent as Youtube } from "../assets/youtube.svg";
import { ReactComponent as PlayActive } from "../assets/play-active.svg";
import { ReactComponent as PlayInactve } from "../assets/play-inactive.svg";
import { ReactComponent as PlayCircle } from "../assets/play-circle.svg";
import { ReactComponent as DeleteIcon } from "../assets/delete-icon.svg";
import { ReactComponent as NavbarLogo } from "../assets/navbar-logo.svg";
import { ReactComponent as Delete } from "../assets/delete.svg";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { ReactComponent as Notification } from "../assets/notification.svg";
import { ReactComponent as ArrowDown } from "../assets/arrow-down.svg";
import { ReactComponent as DefaultVideo } from "../assets/default-video.svg";
import { ReactComponent as CheckCircle } from "../assets/check-circle.svg";
import { ReactComponent as XCircle } from "../assets/x-circle.svg";
import { ReactComponent as Burger } from "../assets/burger.svg";
import { ReactComponent as Refresh } from "../assets/refresh.svg";
import { ReactComponent as Info } from "../assets/info.svg";

const icons = {
  edit: Edit,
  logo: Logo,
  menu: Menu,
  search: Search,
  plus: Plus,
  save: Save,
  "mobile-menu": MobileMenu,
  close: Close,
  "search-icon": SearchIcon,
  youtube: Youtube,
  "play-active": PlayActive,
  "play-inactive": PlayInactve,
  "play-circle": PlayCircle,
  "delete-icon": DeleteIcon,
  "navbar-logo": NavbarLogo,
  delete: Delete,
  "arrow-left": ArrowLeft,
  notification: Notification,
  "arrow-down": ArrowDown,
  "default-video": DefaultVideo,
  "check-circle": CheckCircle,
  "x-circle": XCircle,
  burger: Burger,
  refresh: Refresh,
  info: Info,
};

export const iconNames = Object.keys(icons);

export type IconName = keyof typeof icons;

interface propTypes {
  name: IconName;
  className?: string;
}

export default function Icon({ name, className }: propTypes) {
  const Component = icons[name];

  return <Component className={className} />;
}
