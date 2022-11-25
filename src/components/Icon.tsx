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
};

export const iconNames = Object.keys(icons);

export type IconName = keyof typeof icons;

interface propTypes {
  name: IconName;
}

export default function Icon({ name }: propTypes) {
  const Component = icons[name];

  return <Component />;
}
