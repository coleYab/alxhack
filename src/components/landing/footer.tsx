import Image from 'next/image';

export default function Footer() {
    return (
        <>
            <footer className="flex w-full flex-col items-center justify-around border-t border-border bg-muted/40 py-16 text-sm text-muted-foreground">
                <div className='flex items-center gap-2'>
                    <Image src='/icon.png' alt='Wonder AI' width={32} height={32} className='size-8 object-contain' />
                    <span className='text-lg font-semibold tracking-tight text-foreground'>Wonder AI</span>
                </div>
                <p className="mt-4 text-center">Copyright © 2025 <a href="https://prebuiltui.com" className="text-foreground">PrebuiltUI</a>. All rights reservered.</p>
                <div className="flex items-center gap-4 mt-6">
                    <a href="#" className="font-medium text-foreground transition-all hover:text-muted-foreground">
                        Brand Guidelines
                    </a>
                    <div className="h-4 w-px bg-border"></div>
                    <a href="#" className="font-medium text-foreground transition-all hover:text-muted-foreground">
                        Trademark Policy
                    </a>
                </div>
            </footer>
        </>
    );
};
