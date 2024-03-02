export function EmailPreview({email}){
    return <article className="email-preview">
        <h2>{email.subject}</h2>
        <h4>{email.from}</h4>
    </article>
}
