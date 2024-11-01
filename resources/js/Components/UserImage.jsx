export default function UserImage({ auth, src = null, status }) {
    return (
        <div className="w-fit relative user-image">
            <img
                src={`/storage/${src}`}
                alt="User image"
                className="h-10 w-10 rounded-full bg-white"
            />
            {status === "online" ? (
                <span className="active-alert absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-600"></span>
            ) : typeof status === "number" ? (
                <span className="active-alert absolute -bottom-2 -right-2 rounded-full p-1 bg-slate-500 text-xs">
                    {status} M
                </span>
            ) : (
                ""
            )}
        </div>
    );
}
