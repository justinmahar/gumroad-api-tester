/*
 * More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
 * More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
 * More on args: https://storybook.js.org/docs/react/writing-stories/args
 * More on argTypes: https://storybook.js.org/docs/react/api/argtypes
 */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import GumroadAPITester from '../components/GumroadAPITester';

export default {
  title: 'Tools/Gumroad API',
  component: GumroadAPITester,
  parameters: {
    controls: {
      disabled: true,
    },
    options: { showPanel: false },
  },
} as ComponentMeta<typeof GumroadAPITester>;

const Template: ComponentStory<typeof GumroadAPITester> = (args) => <GumroadAPITester {...args} />;

export const Tester = Template.bind({});
Tester.args = {};
Tester.story = {
  name: 'Tester',
};
