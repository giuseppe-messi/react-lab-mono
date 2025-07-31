import React from "react";
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "@react-lab-mono/ui";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider global>
        <div>
          <Story />
        </div>
      </ThemeProvider>
    )
  ],
  parameters: {
    // any storybook-wide params if needed
  }
};

export default preview;

// If later you want a specific story to tweak the theme:

// in a story file

// export const CustomTheme: Story = {
//   parameters: {
//     theme: {
//       colorPrimary: '#E53E3E',
//       appRadius: '12px',
//     },
//   },
//   args: {
//     children: 'Themed Button',
//   },
// };
