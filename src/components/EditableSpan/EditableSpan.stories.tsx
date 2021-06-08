import React from "react";
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Editable span component',
    component: EditableSpan,
}

// const changeCallback = action('value changed')

export const EditableSpanBaseExample = (props: any) => {
    return <EditableSpan title={'Start Value'} changeValueEditableSpan={() => {}} />
}