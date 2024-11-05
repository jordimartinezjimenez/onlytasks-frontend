export default function Footer() {
    return (
        <footer className="w-full flex sm:flex-row flex-col justify-evenly items-center py-10 gap-2">
            <div className="flex flex-col items-center">
                <a href="https://jordimartinez.netlify.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:scale-105 transition-all duration-[400ms] ease">Jordi Martinez</a>
                <p>© {new Date().getFullYear()}</p>
            </div>

            <div className="flex gap-x-4">
                <a href="https://www.linkedin.com/in/jordi-martinez-jimenez" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-all duration-[400ms] ease"><img src="icons/linkedin.svg" className="size-6" /></a>
                <a href="https://github.com/jordimartinezjimenez" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-all duration-[400ms] ease"><img src="icons/github.svg" className="size-6" /> </a>
                <a href="mailto:jordimj63@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-all duration-[400ms] ease"><img src="icons/mail.svg" className="size-6" /></a>
            </div>
        </footer>
    )
}
