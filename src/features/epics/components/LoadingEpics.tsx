import React from 'react';

const LoadingEpics: React.FC = () => {
  return (
    <section className="flex flex-col gap-6">
     
      <header className="lg:justify-between lg:items-center flex gap-4 flex-col lg:flex-row mb-5 lg:mb-10 animate-pulse">
        
        <div className="h-10 bg-slate-200 rounded-md w-56 max-w-full" />

        <div className="flex gap-4 lg:gap-9 lg:items-start flex-col lg:flex-row w-full lg:w-auto">
       
          <div className="h-12 bg-slate-200 rounded-md w-full lg:w-64" />
         
          <div className="h-12 bg-slate-200 rounded-md w-32 hidden lg:block" />
        </div>
      </header>

      {/* Skeleton Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <React.Fragment key={idx}>
          
            <div className="hidden lg:flex flex-col gap-4 bg-white border-s-4 border-s-slate-200 shadow-sm p-4 rounded-lg lg:justify-between animate-pulse">
              
              <header className="flex justify-between items-center">
                
                <div className="h-6 w-16 bg-slate-200 rounded" />
              
                <div className="size-6 bg-slate-200 rounded-full" />
              </header>

             
              <div className="flex flex-col gap-3">
             
                <div className="h-7 w-3/4 bg-slate-200 rounded" />

              
                <div className="flex gap-3 items-center">
               
                  <div className="size-10 bg-slate-200 rounded-lg" />
                
                  <div className="flex flex-col gap-1">
                    <div className="h-4 w-12 bg-slate-200 rounded" />
                    <div className="h-5 w-24 bg-slate-200 rounded" />
                  </div>
                </div>
              </div>

              {/* Footer Area */}
              <footer className="border-t border-t-slate-100 flex justify-between items-end mt-auto pt-4">
               
                <div className="flex gap-2 items-center">
                  <div className="size-4 bg-slate-200 rounded-full" />
                  <div className="h-4 w-28 bg-slate-200 rounded" />
                </div>
              
                <div className="flex gap-2 items-center">
                  <div className="size-4 bg-slate-200 rounded-full" />
                  <div className="h-4 w-20 bg-slate-200 rounded" />
                </div>
              </footer>
            </div>

            {/* Mobile Skeleton Layout */}
            <div className="lg:hidden flex flex-col gap-4 bg-white shadow-sm p-4 rounded-lg min-h-48 animate-pulse">
           
              <header className="flex justify-between items-center">
                
                <div className="h-6 w-16 bg-slate-200 rounded" />
              
                <div className="size-6 bg-slate-200 rounded-full" />
              </header>

              
              <div className="flex flex-col gap-3 h-full justify-between">
             
                <div className="h-7 w-full bg-slate-200 rounded" />

               
                <div className="flex justify-between items-center mt-auto w-full">
                 
                  <div className="flex gap-3 items-center">
                    
                    <div className="size-7 bg-slate-200 rounded-lg" />
                  
                    <div className="flex flex-col gap-1">
                      <div className="h-4 w-24 bg-slate-200 rounded" />
                      <div className="h-3 w-12 bg-slate-200 rounded" />
                    </div>
                  </div>

                  {/* Deadline Block */}
                  <div className="flex flex-col items-end gap-1">
                    <div className="h-3 w-12 bg-slate-200 rounded" />
                    <div className="h-4 w-16 bg-slate-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default LoadingEpics;