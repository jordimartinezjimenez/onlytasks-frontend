export default function ErrorMessage({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-center my-4 bg-rose-100 text-rose-600 font-bol p-3 uppercase text-sm">
            {children}
        </div>
    )
}
