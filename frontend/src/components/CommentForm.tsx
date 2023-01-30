function CommentForm() {
    return (
        <form className="flex flex-col gap-3 shadow-lg border rounded-lg max-w-lg w-11/12 py-5 px-7">
            <div>
                <label htmlFor="nickname" className="block">Nickname</label>
                <input type="text" id="nickname" name="nickname" className="p-1 border w-full" />
            </div>
            <div>
                <label htmlFor="comment" className="block">Comment</label>
                <textarea name="comment" id="comment" rows={5} className="border p-1 w-full"></textarea>
            </div>
        </form>
    )
}

export default function CommentSection() {
    return (
        <div className="flex justify-center">
            <CommentForm />
        </div>
    )
}