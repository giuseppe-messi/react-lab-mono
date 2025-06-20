import { Autocomplete } from "@react-lab-mono/ui/autocomplete";
import type { Meta, StoryObj } from "@storybook/react";

interface Item {
  id: number;
  label: string;
}

const meta: Meta<typeof Autocomplete<Item>> = {
  component: Autocomplete,
  title: "Components/Autocomplete",
  argTypes: {
    placeholder: { control: "text" }
  }
};

export default meta;
type Story = StoryObj<typeof Autocomplete<Item>>;

export const Default: Story = {
  render: (args) => {
    const items: Item[] = [
      { id: 1, label: "Apple" },
      { id: 2, label: "Banana" },
      { id: 3, label: "Cherry" }
    ];

    return (
      <div style={{ width: 300, margin: "2rem" }}>
        <Autocomplete
          {...args}
          getOptionKey={(item) => item.id}
          getOptionLabel={(item) => item.label}
          options={items}
        />
      </div>
    );
  },
  args: {
    placeholder: "Type a fruit…"
  }
};
