'use client';
import Button from '@/shared/Button';
import ErrorIcon from '@/assets/icons/error.svg?react';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <section className="lg:min-h-[70vh] flex items-center justify-center sm:max-w-1/2 xl:max-w-[40%] sm:mx-auto">
            <div className="flex flex-col justify-center items-center gap-6">
                <div className="flex justify-center items-center bg-error/10 rounded-xl size-16">
                    <ErrorIcon className="size-6.5 text-error" />
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="font-semibold text-slate-dark text-[20px] leading-[24px]">
                        Something went wrong
                    </h1>
                    <p className="text-center text-slate-medium text-[16px] leading-[24px] max-w-[307px]">
                        We're having trouble retrieving your projects right now. Please try
                        again in a moment.
                    </p>
                </div>
                <Button 
                variant='primary'
                    onClick={reset}   
                >
                    Retry Connection
                </Button>
            </div>
        </section>
    );
}