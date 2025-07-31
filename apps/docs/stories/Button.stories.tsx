import type { Size, FillMode, Variant } from "@react-lab-mono/ui";
import { Button, FILLMODES, SIZES, VARIANTS } from "@react-lab-mono/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: SIZES as readonly Size[]
    },
    fillMode: {
      control: { type: "radio" },
      options: FILLMODES as readonly FillMode[]
    },
    variant: {
      control: { type: "radio" },
      options: VARIANTS as readonly Variant[]
    }
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => (
    <Button
      {...props}
      onClick={(): void => {
        alert("Hello from Turborepo!");
      }}
    >
      Hello
    </Button>
  ),
  name: "Button",
  args: {
    size: "lg",
    variant: "success",
    fillMode: "full"
  }
};
