import type { Meta, StoryObj } from '@storybook/react';
import { GumroadAPITester } from '../components/GumroadAPITester';

// === Setup ===
const StoryComponent = GumroadAPITester; // <-- Set to your component
const meta: Meta<typeof StoryComponent> = {
  title: 'Tools/Gumroad API', // <-- Set to your story title
  component: StoryComponent,
  parameters: {
    options: { showPanel: false }, // Don't show addons panel
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// === Stories ===
export const Tester: Story = {
  args: {},
};
