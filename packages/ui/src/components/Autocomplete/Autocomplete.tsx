import {
  useState,
  useRef,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactElement,
  useCallback,
  useMemo,
  memo
} from "react";
import { useAutoComplete } from "../../hooks/useAutoComplete";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useThrottleCallback } from "../../hooks/useThrottleCallback";
import styles from "./Autocomplete.module.css";

interface Props<T> {
  fetcher: (query: string, page: number) => Promise<T[]>;
  // options: T[];
  value: string;
  getOptionLabel: (option: T) => string;
  getOptionKey: (option: T) => string | number;
  onChange: (newValue: string) => void;
  onOpen?: () => void;
  onLoadMore?: () => void;
  placeholder?: string;
}

export function AutocompleteInner<T>({
  fetcher,
  // options,
  value,
  getOptionLabel,
  getOptionKey,
  onChange,
  // onOpen,
  // onLoadMore,
  placeholder = "Type to search…"
}: Props<T>): ReactElement {
  const [highlight, setHighlight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const {
    items: options,
    loadMore,
    reloadLast
  } = useAutoComplete(fetcher, value, 300);

  // hook that given a ref element, fires callback when clicking
  // outside that element
  useOnClickOutside(wrapperRef, () => {
    setIsOpen(false);
  });

  const throttledLoadMore = useThrottleCallback(() => {
    loadMore();
  }, 400);

  // callback when reached the end of the dropdown
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLUListElement>) => {
      const ul = e.currentTarget;
      if (ul.scrollHeight - ul.scrollTop - ul.clientHeight < 30) {
        throttledLoadMore();
      }
    },
    [throttledLoadMore]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setHighlight(0);
    setIsOpen(true);
  };

  const selectOption = useCallback(
    (opt: T) => {
      const label = getOptionLabel(opt);
      onChange(label);
      setIsOpen(false);
    },
    [getOptionLabel, onChange]
  );

  const openDropdown = useCallback(() => {
    reloadLast();
    setIsOpen(true);
  }, [reloadLast]);

  // a few key handlers for navigating the dropdown
  // which sets the correct highlight item in the list
  const handleKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (!options.length) return;

      switch (e.key) {
        case "ArrowDown":
          setHighlight((h) => (h + 1) % options.length); // modulo operator to avoid hitting out-of-bounds index
          break;

        case "ArrowUp":
          setHighlight((h) => (h - 1 + options.length) % options.length);
          break;

        case "Enter":
          selectOption(options[highlight]);
          break;

        case "Escape":
          setIsOpen(false);
          break;
      }
    },
    [options, highlight, selectOption]
  );

  const items = useMemo(
    () =>
      options.map((opt, index) => {
        const label = getOptionLabel(opt);
        const key = getOptionKey(opt);
        const isHighlighted = index === highlight;
        const isSelected = label === value;

        const className = [
          styles.autocompleteItem,
          isHighlighted && styles.highlight,
          isSelected && styles.selected
        ].join(" ");

        return (
          <li
            aria-selected={isHighlighted}
            className={className}
            key={key}
            onMouseDown={(e) => {
              e.preventDefault();
              selectOption(opt);
            }}
            onMouseEnter={() => {
              setHighlight(index);
            }}
            role="option"
          >
            {label}
          </li>
        );
      }),
    [options, highlight, value, getOptionLabel, getOptionKey, selectOption]
  );

  return (
    <div
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      className={styles.container}
      ref={wrapperRef}
    >
      <input
        aria-autocomplete="list"
        className={`${styles.autocompleteInput} ${styles.autocompleteInputWide}`}
        onChange={handleChange}
        onClick={openDropdown}
        onFocus={openDropdown}
        onKeyDown={handleKey}
        placeholder={placeholder}
        role="combobox"
        value={value}
      />

      {isOpen ? (
        <ul
          className={styles.autocompleteList}
          onScroll={handleScroll}
          role="listbox"
        >
          {options.length > 0 ? (
            items
          ) : (
            <li aria-disabled="true" className={styles.noResults} role="option">
              No results
            </li>
          )}
        </ul>
      ) : null}
    </div>
  );
}

export const Autocomplete = memo(AutocompleteInner) as <T>(
  props: Props<T>
) => ReactElement;
