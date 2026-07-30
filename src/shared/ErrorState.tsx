import Button from '@/shared/Button';
import ErrorIcon from '@/assets/icons/error.svg?react';

interface ErrorStateProps {
  title?: string;
  item?: string;
  message?: string;
  reset: () => void;
}

export default function ErrorState({
  title = "Something went wrong",
  item = "projects",
  message,
  reset,
}: ErrorStateProps) {
  const displayMessage =
    message ||
    `We're having trouble retrieving your ${item} right now. Please try again in a moment.`;

  return (
    <section className="lg:min-h-[70vh] flex items-center justify-center sm:max-w-1/2 xl:max-w-[40%] sm:mx-auto">
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="flex justify-center items-center bg-error/10 rounded-xl size-16">
          <ErrorIcon className="size-6.5 text-error" />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="font-semibold text-slate-dark text-[20px] leading-[24px]">
            {title}
          </h1>
          <p className="text-center text-slate-medium text-[16px] leading-[24px] max-w-[307px]">
            {displayMessage}
          </p>
        </div>
        <Button variant="primary" onClick={reset}>
          Retry Connection
        </Button>
      </div>
    </section>
  );
}
