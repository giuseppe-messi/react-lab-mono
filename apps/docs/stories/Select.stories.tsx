import { Select } from "@react-lab-mono/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

const options = [
  { id: "a", label: "todos", value: "todos", disabled: false },
  { id: "b", label: "notes", value: "notes", disabled: false },
  {
    id: "c",
    label: "bookmarks",
    value: "bookmarks",
    disabled: true
  },
  {
    id: "d",
    label: "contacts",
    value: "contacts",
    disabled: true
  }
];

const meta: Meta<typeof Select> = {
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          "⚠️ **Work in Progress**!  This component's story is not ready!"
      }
    }
  },
  argTypes: {
    // size: {
    //   control: { type: "radio" },
    //   options: SIZES as readonly Size[]
    // },
    // fillMode: {
    //   control: { type: "radio" },
    //   options: FILLMODES as readonly FillMode[]
    // },
    // variant: {
    //   control: { type: "radio" },
    //   options: VARIANTS as readonly Variant[]
    // }
  }
};

export default meta;

type Story = StoryObj<typeof Select>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => {
    const [{ value }, updateArgs] = useArgs();

    return (
      <Select
        getOptionDisabled={(option) => option.disabled}
        getOptionId={(option) => option.id}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        labelText="Choose a category:"
        name="category-select"
        onChange={(e) => {
          updateArgs({ value: e.target.value });
        }}
        options={options}
        placeholder="Select an option"
        value={value}
      />
    );
  },
  name: "Select",
  args: {
    value: ""
  }
};
