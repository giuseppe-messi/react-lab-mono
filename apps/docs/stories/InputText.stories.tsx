import type { InputTextSize } from "@react-lab-mono/ui";
import { InputText, INPUTTEXT_SIZES } from "@react-lab-mono/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InputText> = {
  component: InputText,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: INPUTTEXT_SIZES as readonly InputTextSize[]
    },
    label: {
      control: { type: "text" }
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          "A simple `InputText` component. <br><br>\
        Use the controls below to change the values and see how the InputText’s appearance adapts."
      },
      source: {
        code: `<InputText id="id" name="input" placeholder="Input" />`
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof InputText>;

export const Primary: Story = {
  render: (props) => <InputText {...props} />,
  name: "InputText"
};
