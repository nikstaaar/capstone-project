import Button from './';

function Template({children, ...args}) {
	return <Button {...args}>{children}</Button>;
}

export const Default = Template.bind({});

Default.args = {
	children: 'Button',
};

const story = {
	title: 'Button',
	component: Button,
};

export default story;
