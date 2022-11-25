import styles from "./SearchInput.module.scss";
import SearchSVG from "../../../../assets/search.svg";
import Icon from "../../../../components/Icon";
export default function SearchInput() {
  return (
    <div className={styles.SearchInput}>
      <div className={styles.SearchInput__Inner}>
        <input
          type="search"
          id="default-search"
          placeholder="Search Mockups, Logos..."
          required
        />

        <button className={styles.SearchInput__Icon}>
          <Icon name="search" />
        </button>
      </div>
    </div>
  );
}
