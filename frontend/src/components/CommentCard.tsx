import { FiTrash, FiEdit } from "react-icons/fi"
import React from 'react'
import Modal from "./CommentModal"

export default function CommentCard(props: any) {
    const [modal, setModal] = React.useState<boolean>(false)
    const deleteComment = () => props.onDelete(props.user._id.$oid)
    const time = new Date(props.user.createdAt)

    return (
        <div className="border border-slate-300 rounded-lg max-w-lg w-11/12 py-5 px-7 shadow-md flex justify-between items-center">
            <div>
                <h1 className="text-xl font-medium">
                    {props.user.nickname}
                    <span className="font-extralight text-sm">
                        { ' '+ (props.user.createdAt ? `${time.toLocaleDateString()} - ${time.getHours()}:${time.getMinutes()}` : '3:34') }
                    </span>
                </h1>
                <p className="text-base font-light">{props.user.comment}</p>
            </div>
            <div className="flex gap-3 text-lg">
                <button onClick={() => setModal(true)} className="btn"><FiEdit /></button>
                <button onClick={deleteComment} className="btn"><FiTrash /></button>
            </div>
            {modal && <Modal onClose={()=> setModal(false)} user={props.user} onUpdate={props.onUpdate} />}
        </div>
    )
}