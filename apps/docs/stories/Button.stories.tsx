import { Button } from "@react-lab-mono/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"]
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
