export function TextCard({title, text, src}) {
    return (
        <div className="flex flex-col items-center justify-center border border-slate-400 rounded-xl max-w-50 p-4 min-h-40">
            <img className="w-4" src={src} alt={src} />
            <h3 className="text-center">{title}</h3>
            <p className="text-sm text-slate-400 text-center">{text}</p>
        </div>
    )
}