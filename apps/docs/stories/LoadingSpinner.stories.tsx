import type { LoadingSpinnerSize } from "@react-lab-mono/ui";
import { LoadingSpinner, LOADING_SPINNER_SIZES } from "@react-lab-mono/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof LoadingSpinner> = {
  component: LoadingSpinner,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: LOADING_SPINNER_SIZES as readonly LoadingSpinnerSize[]
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          "A `LoadingSpinner` component used to show progress/loading state in the UI. <br><br>\
          Use the controls below to change the values and see how the button’s appearance adapts."
      },
      source: {
        code: `<LoadingSpinner size="lg" />`
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof LoadingSpinner>;

export const Primary: Story = {
  render: (props) => <LoadingSpinner {...props}>Hello</LoadingSpinner>,
  name: "LoadingSpinner",
  args: {
    size: "lg"
  }
};
