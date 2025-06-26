import { Box } from "../Box/Box";
import { useCallback } from "react";
import { useResourceStore } from "../../stores/resourceStore";
import { RESOURCE_OPTIONS, type ResourceOption } from "../../interfaces";

export const ResourceSelect = () => {
  const { selected, setOption } = useResourceStore();

  const handleSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      setOption(e.target.value as ResourceOption),
    [setOption]
  );

  return (
    <Box>
      <label htmlFor="resource-select">Choose a resource:</label>
      <select
        id="resource-select"
        name="resource"
        value={selected}
        onChange={handleSelect}
      >
        <option value="" disabled>
          Select an option
        </option>

        {RESOURCE_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Box>
  );
};
