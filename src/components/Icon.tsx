import Edit from "../assets/edit.svg?component";
import Logo from "../assets/logo.svg?component";
import Menu from "../assets/menu.svg?component";
import Search from "../assets/search.svg?component";
import Plus from "../assets/plus.svg?component";
import Save from "../assets/save.svg?component";
import MobileMenu from "../assets/mobile-menu.svg?component";
import MobileSearch from "../assets/mobile-search.svg?component";
import MobilePlus from "../assets/mobile-plus.svg?component";
import Close from "../assets/close.svg?component";
import SearchIcon from "../assets/search-icon.svg?component";
import Youtube from "../assets/youtube.svg?component";
import PlayActive from "../assets/play-active.svg?component";
import PlayInactve from "../assets/play-inactive.svg?component";
import PlayCircle from "../assets/play-circle.svg?component";
import DeleteIcon from "../assets/delete-icon.svg?component";

const icons = {
  edit: Edit,
  logo: Logo,
  menu: Menu,
  search: Search,
  plus: Plus,
  save: Save,
  "mobile-menu": MobileMenu,
  "mobile-search": MobileSearch,
  "mobile-plus": MobilePlus,
  close: Close,
  "search-icon": SearchIcon,
  youtube: Youtube,
  "play-active": PlayActive,
  "play-inactive": PlayInactve,
  "play-circle": PlayCircle,
  "delete-icon": DeleteIcon,
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
