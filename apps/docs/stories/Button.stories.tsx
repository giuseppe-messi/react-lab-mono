import type { FillMode, Variant, ButtonSize } from "@react-lab-mono/ui";
import { Button, FILLMODES, BUTTON_SIZES, VARIANTS } from "@react-lab-mono/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    size: {
      description: "Controls the button’s size (`sm`, `md`, `lg`).",
      control: { type: "radio" },
      options: BUTTON_SIZES as readonly ButtonSize[]
    },
    fillMode: {
      description:
        "Determines whether the button is filled (`full`) or outlined (`outline`).",
      control: { type: "radio" },
      options: FILLMODES as readonly FillMode[]
    },
    variant: {
      description:
        "Visual style of the button (default, success, warning, error, white).",
      control: { type: "radio" },
      options: VARIANTS as readonly Variant[]
    },
    fullWidth: {
      description: "If true, the button expands to fill the container width.",
      control: { type: "boolean" }
    },
    disabled: {
      description:
        "Disables the button, preventing interactions and dimming appearance.",
      control: { type: "boolean" }
    },
    children: {
      description: "Button label or custom node content.",
      control: { type: "text" }
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          "A `Button` component that supports different sizes, variants, and fill modes that you can adjust to fit your design. <br><br>\
          Use the controls below to change the values and see how the button’s appearance adapts."
      },
      source: {
        code: `<Button fillMode="full" onClick={() => {}} size="lg" variant="success">`
      }
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
      onClick={() => {
        alert("You have clicked me!");
      }}
    >
      {props.children}
    </Button>
  ),
  name: "Button",
  args: {
    size: "lg",
    fillMode: "full",
    variant: "success",
    fullWidth: false,
    disabled: false,
    children: "Click me!"
  }
};

/********************************/
/*********** SHOWCASE ***********/
/********************************/

const showcaseParams = {
  controls: { disable: true },
  docs: {
    source: { code: null }
  }
};

/** Preview of `Button` in all available sizes (`sm`, `md`, `lg`) */
export const Sizes: Story = {
  render: (props) => (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        flexWrap: "wrap"
      }}
    >
      {BUTTON_SIZES.map((size) => (
        <Button key={size} {...props} size={size}>
          {size.toUpperCase()}
        </Button>
      ))}
    </div>
  ),
  parameters: showcaseParams
};

/** Preview of `Button` in all available variants when `fillmode` is set to `fill` */
export const VariantsFill: Story = {
  name: "Variants - fill",
  args: { fillMode: "full" },
  render: (props) => (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        flexWrap: "wrap"
      }}
    >
      {VARIANTS.map((variant) => (
        <Button key={variant} {...props} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
  parameters: showcaseParams
};

/** Preview of `Button` in all available variants when `fillmode` is set to `outline` */
export const VariantsOutline: Story = {
  name: "Variants - outline",
  args: { fillMode: "outline" },
  render: (props) => (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        flexWrap: "wrap"
      }}
    >
      {VARIANTS.map((variant) => (
        <Button key={variant} {...props} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
  parameters: showcaseParams
};

/** Preview of `Button` in all available variants when `disabled` true */
export const Disabled: Story = {
  args: { disabled: true },
  render: (props) => (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        flexWrap: "wrap"
      }}
    >
      {VARIANTS.map((variant) => (
        <Button key={variant} {...props} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
  parameters: showcaseParams
};

/** Preview of `Button` in all available sizes (`sm`, `md`, `lg`) in full width */
export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (props) => (
    <div style={{ display: "grid", gap: 12 }}>
      {BUTTON_SIZES.map((size) => (
        <Button key={size} {...props} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
  parameters: showcaseParams
};
