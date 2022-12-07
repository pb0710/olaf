import React from 'react'
import { Navigate } from 'react-router-dom'
import ButtonExample from '@ui/ButtonExample'
import SwitchExample from '@ui/SwitchExample'
import RadioExample from '@ui/RadioExample'
import CheckboxExample from '@ui/CheckboxExample'
import InputExample from '@ui/InputExample'
import TooltipExample from '@ui/TooltipExample'
import CollapseExample from '@ui/CollapseExample'
import LoadingExample from '@ui/LoadingExample'
import ListExample from '@ui/ListExample'
import ModalExample from '@ui/ModalExample'
import CardExample from '@ui/CardExample'
import ProgressExample from '@ui/ProgressExample'
import AvatarExample from '@ui/AvatarExample'
import ImageExample from '@ui/ImageExample'
import FormExample from '@ui/FormExample'
import DialogExample from '@ui/DialogExample'
import PopoverExample from '@ui/PopoverExample'
import TabsExample from '@ui/TabsExample'
import SelectExample from '@ui/SelectExample'
import ToastExample from '@ui/ToastExample'
import TagExample from '@ui/TagExample'
import DrawerExample from '@ui/DrawerExample'
import DropdownExample from '@ui/DropdownExample'
import EditorExample from '@editor/EditorExample'
import TriggerExample from '@ui/TriggerExample'
import PopupExample from '@ui/PopupExample'

export const componentRoutes = [
	{
		name: 'Button',
		path: 'button',
		element: <ButtonExample />
	},
	{
		name: 'Switch',
		path: 'switch',
		element: <SwitchExample />
	},
	{
		name: 'Radio',
		path: 'radio',
		element: <RadioExample />
	},
	{
		name: 'Checkbox',
		path: 'checkbox',
		element: <CheckboxExample />
	},
	{
		name: 'Input',
		path: 'input',
		element: <InputExample />
	},
	{
		name: 'Tooltip',
		path: 'tooltip',
		element: <TooltipExample />
	},
	{
		name: 'Collapse',
		path: 'collapse',
		element: <CollapseExample />
	},
	{
		name: 'Loading',
		path: 'loading',
		element: <LoadingExample />
	},
	{
		name: 'List',
		path: 'list',
		element: <ListExample />
	},
	{
		name: 'Modal',
		path: 'modal',
		element: <ModalExample />
	},
	{
		name: 'Card',
		path: 'card',
		element: <CardExample />
	},
	{
		name: 'Progress',
		path: 'progress',
		element: <ProgressExample />
	},
	{
		name: 'Avatar',
		path: 'avatar',
		element: <AvatarExample />
	},
	{
		name: 'Image',
		path: 'image',
		element: <ImageExample />
	},
	{
		name: 'Form',
		path: 'form',
		element: <FormExample />
	},
	{
		name: 'Dialog',
		path: 'dialog',
		element: <DialogExample />
	},
	{
		name: 'Popover',
		path: 'popover',
		element: <PopoverExample />
	},
	{
		name: 'Tabs',
		path: 'tabs',
		element: <TabsExample />
	},
	{
		name: 'Select',
		path: 'select',
		element: <SelectExample />
	},
	{
		name: 'Toast',
		path: 'toast',
		element: <ToastExample />
	},
	{
		name: 'Tag',
		path: 'tag',
		element: <TagExample />
	},
	{
		name: 'Drawer',
		path: 'drawer',
		element: <DrawerExample />
	},
	{
		name: 'Dropdown',
		path: 'dropdown',
		element: <DropdownExample />
	},
	{
		name: 'Trigger',
		path: 'trigger',
		element: <TriggerExample />
	},
	{
		name: 'Popup',
		path: 'popup',
		element: <PopupExample />
	},
	{
		name: 'Editor',
		path: 'editor',
		element: <EditorExample />
	}
]

const routes = [
	{
		path: 'component',
		children: componentRoutes
	},
	{
		path: '*',
		element: <Navigate to={`component/${componentRoutes[0].path}`} replace />
	}
]

export default routes
