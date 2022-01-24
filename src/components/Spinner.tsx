const Spinner = () => {
  return (
    <div className='w-screen h-screen bg-white  bg-opacity-40 dark:bg-black dark:bg-opacity-40 absolute top-0 left-0 flex justify-center items-center'>
        <div className="animate-spin bg-transparent border-8 border-t-slate-700 rounded-full bg-slate-700 w-20 h-20">
        </div>
    </div>
  );
};

export default Spinner;
