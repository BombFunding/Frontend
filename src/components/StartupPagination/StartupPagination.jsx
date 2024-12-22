import StartupCard from "../StartupCard/StartupCard";

function StartupPagination() {
  return (
    <div className="border-solid border-2 border-red-500 m-[1vw] p-[1vw] grid grid-cols-3 justify-center items-start gap-x-4 gap-y-2 rtl">
      <StartupCard />
      <StartupCard />
      <StartupCard />
      <StartupCard />
    </div>
  );
}

export default StartupPagination;
