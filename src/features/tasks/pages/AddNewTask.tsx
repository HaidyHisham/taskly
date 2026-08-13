import AddTaskForm from "../components/AddTaskForm";

export default function AddNewTask() {
    return (
        <section className="flex flex-col gap-8 ">
            <header className="flex flex-col gap-2">
                <h1 className="font-semibold text-heading-3 lg:text-heading-2 leading-10 letter-spacing-xs capitalize flex-1 w-full text-slate-dark">
                    create new task
                </h1>
                <p className="max-w-full lg:max-w-2/3 2xl:max-w-1/2 text-secondary text-sm">Initialize a new work item within the Architectural Workspace ecosystem.</p>

            </header>
            <AddTaskForm />

        </section>
    );
}
