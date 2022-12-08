import React, { useState } from 'react'
import { Button, Checkbox, Divider, Form, Input, Radio, Select, Switch } from '@olaf/react-ui/src'

export default () => {
	const [layout, setLayout] = useState<'horizontal' | 'vertical' | 'inline'>('horizontal')

	const form = Form.useForm({
		defaultState: {
			username: 'initial username',
			pwd: '',
			retypePwd: '',
			system: 'windows',
			gender: 0,
			fruit: [1, 2],
			switch: true
		},
		onFulfilled(values) {
			console.log('submit fulfilled', values)
		},
		onFailed() {
			console.log('submit failed')
		},
		onStateChange(source) {
			console.log('state changed: ', source, form.getState()[source.label])
		}
	})

	return (
		<div style={{ padding: 24 }}>
			<h1>Form</h1>
			<Radio.Group
				type="tab"
				value={layout}
				onChange={value => {
					setLayout(value as any)
				}}
			>
				<Radio label="horizontal">Horizontal</Radio>
				<Radio label="vertical">Vertical</Radio>
				<Radio label="inline">Inline</Radio>
			</Radio.Group>
			<Divider />
			<div style={{ width: 640 }}>
				<Form form={form} layout={layout} onSubmit={form.onSubmit}>
					<Form.Field label="username" labelText="Username">
						<Input block />
					</Form.Field>
					<Form.Field label="pwd" labelText="Password">
						<Input block />
					</Form.Field>
					<Form.Field label="retypePwd" labelText="Retype password">
						<Input block />
					</Form.Field>
					<Form.Field label="system" labelText="System">
						<Select
							style={{ width: 160 }}
							options={[
								{
									value: 'windows',
									label: 'Windows'
								},
								{
									value: 'macos',
									label: 'MacOS'
								},
								{
									value: 'android',
									label: 'Android'
								},
								{
									value: 'linux',
									label: 'Linux'
								},
								{
									value: 'ios',
									label: 'IOS'
								}
							]}
						></Select>
					</Form.Field>
					<Form.Field label="gender" labelText="Gender">
						<Radio.Group>
							<Radio label={0}>A</Radio>
							<Radio label={1}>B</Radio>
							<Radio label={2}>C</Radio>
						</Radio.Group>
					</Form.Field>
					<Form.Field label="fruit" labelText="Fruit">
						<Checkbox.Group>
							<Checkbox label={0}>Apple</Checkbox>
							<Checkbox label={1}>Banana</Checkbox>
							<Checkbox label={2}>Pear</Checkbox>
						</Checkbox.Group>
					</Form.Field>
					<Form.Field label="switch" labelText="Switch">
						<Switch />
					</Form.Field>
					<Form.Field>
						<Button primary type="submit">
							Submit
						</Button>
					</Form.Field>
				</Form>
			</div>
		</div>
	)
}
