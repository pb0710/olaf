import React, { FormHTMLAttributes, forwardRef } from 'react'
import { cls, omit } from '@olaf/utils/src'
import { UI_PREFIX } from '../../constants'
import './form.scss'
import { FormContext, FormCtx } from './FormCtx'
import { useForm, Form as FormType } from '@olaf/react-hook/src'
import Field from './Field'

interface FormProps extends FormHTMLAttributes<HTMLFormElement>, Omit<Partial<FormContext>, 'labelAlign'> {
	form: FormType
	layout?: 'horizontal' | 'vertical' | 'inline'
}

const Form = forwardRef<HTMLFormElement, FormProps>((props, outerRef) => {
	const { className, children, layout = 'horizontal', form, labelSuffix, ...rest } = omit(props, 'labelWidth')
	let { labelWidth } = props

	const prefixCls = `${UI_PREFIX}-form`

	let labelAlign: FormContext['labelAlign'] | undefined
	if (layout === 'horizontal') {
		labelAlign = 'right'
	} else if (layout === 'vertical') {
		labelAlign = 'top'
	} else if (layout === 'inline') {
		labelWidth = 'unset'
		labelAlign = 'left'
	}

	return (
		<FormCtx.Provider
			value={{
				form,
				labelWidth,
				labelSuffix,
				labelAlign
			}}
		>
			<form ref={outerRef} className={cls(className, prefixCls, `${prefixCls}-${layout}`)} {...rest}>
				{children}
			</form>
		</FormCtx.Provider>
	)
})

const ExportForm = Form as typeof Form & {
	Field: typeof Field
	useForm: typeof useForm
}
ExportForm.Field = Field
ExportForm.useForm = useForm
export default ExportForm
