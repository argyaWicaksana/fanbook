import React, { useState } from 'react'
import { FormField } from './CommentForm'

interface Input {
    id: string,
    comment: string
}

export default function Modal(props: any) {
    const [input, setInput] = useState<Input>({
        id: props.user._id.$oid,
        comment: props.user.comment

    })

    function onFormFieldChange(field: string, value: string) {
        setInput({ ...input, comment: value })
    }

    const onUpdate = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        props.onClose()
        props.onUpdate(input)
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center" onClick={props.onClose}>
            <form onSubmit={onUpdate} onClick={(e)=> e.stopPropagation()}
                className="flex flex-col gap-3 shadow-md border border-slate-300 bg-white rounded-lg max-w-lg w-11/12 py-5 px-7">
                <FormField fieldName='comment' input={input.comment} onChange={onFormFieldChange} />

                <button type='submit' className='btn font-medium'>Save</button>
            </form>
        </div>
    )
}