import CommentCard from './CommentCard'
import React from 'react'

interface Input {
    nickname: string,
    comment: string
}

interface Field {
    fieldName: string,
    input: string,
    onChange: (field: string, input: string) => void
}

export function FormField(props: Field) {
    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => props.onChange(props.fieldName, e.target.value)

    return (
        <div className="input-div">
            <label htmlFor={props.fieldName} className="block capitalize">{props.fieldName}</label>
            {
                props.fieldName === 'nickname' ?
                    <input onChange={inputChangeHandler}
                        type="text" id="nickname" className="p-2 rounded-md border w-full" value={props.input} />
                    :
                    <textarea onChange={inputChangeHandler}
                        id={props.fieldName} rows={5} className="border p-2 rounded-md w-full" value={props.input}></textarea>
            }
        </div>
    )
}

function CommentForm(props: any) {
    const [input, setInput] = React.useState<Input>(props.input ? props.input : {
        nickname: '',
        comment: ''
    })

    function onFormFieldChange(field: string, value: string) {
        if (field === 'nickname') {
            setInput({ ...input, nickname: value })
        } else {
            setInput({ ...input, comment: value })
        }
    }

    function postComment(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        props.onSubmit(input)
    }

    return (
        <form onSubmit={postComment}
            className="flex flex-col gap-3 shadow-md border border-slate-300 bg-white rounded-lg max-w-lg w-11/12 py-5 px-7">
            <FormField fieldName='nickname' input={input.nickname} onChange={onFormFieldChange} />
            <FormField fieldName='comment' input={input.comment} onChange={onFormFieldChange} />

            <button type='submit' className='btn font-medium'>Save</button>
        </form>
    )
}

export function CommentSection() {
    const [comments, setComments] = React.useState([{
        nickname: '',
        comment: '',
        _id: { $oid: '' }
    }])

    interface Comment {
        nickname: string,
        comment: string,
        _id: { $oid: string }
    }

    const getListComment = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/homework', { method: 'GET' })
            const comment: Comment[] = await response.json()

            setComments(comment)
        } catch (error) {
            console.log(error)
        }
    }

    async function postComment(input: Input) {
        const response = await fetch('http://127.0.0.1:5000/homework', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nickname: input.nickname,
                comment: input.comment
            })
        })
        const msg: { msg: string } = await response.json()
        console.log(msg)

        getListComment()
    }

    async function deleteComment(input: string) {
        const response = await fetch('http://127.0.0.1:5000/homework/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: input
            })
        })
        const msg: { msg: string } = await response.json()
        console.log(msg)

        getListComment()
    }

    async function updateComment(input: { id: string, comment: string }) {
        const response = await fetch('http://127.0.0.1:5000/homework/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: input.id,
                comment: input.comment
            })
        })
        const msg: { msg: string } = await response.json()
        console.log(msg)

        getListComment()
    }

    React.useEffect(() => { getListComment() }, [])

    return (
        <div className="flex flex-col items-center gap-7">
            <CommentForm onSubmit={postComment} />
            {
                comments.map((c) => (
                    <CommentCard
                        key={c._id.$oid}
                        user={c}
                        onDelete={deleteComment}
                        onUpdate={updateComment}
                    />
                ))
            }
        </div>
    )
}