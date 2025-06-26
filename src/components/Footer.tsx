export function Footer() {
  return (
    <footer className="">
      <div className="relative z-10 mt-16 w-full flex justify-center flex-end"
      >
        <div className="w-full rounded-md border border-border bg-card/60 backdrop-blur-md p-4 text-center text-sm text-muted-foreground shadow-md">
          <p className="mb-1">
            GitHub:&nbsp;
            <a
              href="https://github.com/nileshpahari/contest-pulse"
              className="underline hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              nileshpahari/contest-pulse
            </a>
          </p>
          <p className="mb-1">
            Creator:&nbsp;
            <a
              href="https://nileshkrpahari.xyz/"
              className="underline hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              nileshkrpahari.xyz
            </a>
          </p>
          <p className="italic text-xs mt-2">
            ⭐ Feel free to star the repo if you found it useful!
          </p>
        </div>
      </div>
    </footer>
  );
}
