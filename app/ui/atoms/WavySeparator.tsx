const WavySeparator = ({
  from,
  to,
  reversed = false,
}: {
  from: string;
  to: string;
  reversed?: boolean;
}) => {
  if (reversed)
    return (
      <>
        <div className={`relative h-10  grid grid-cols-[1fr_3fr_1fr]`}>
          <div className={`z-10 ${to} rounded-tr-[1.5rem]`}></div>
          <div className={`z-10 rounded-b-[1.5rem] ${from}`}></div>
          <div className={`z-10 ${to} rounded-tl-[1.5rem]`}></div>
          <div className={`absolute top-0 z-0 w-full h-1/2 ${from}`}></div>
          <div className={`absolute bottom-0 z-0 w-full h-1/2 ${to}`}></div>
        </div>
      </>
    );

  return (
    <>
      <div className={`relative h-10  grid grid-cols-[1fr_3fr_1fr]`}>
        <div className={`z-10 ${from} rounded-br-[1.5rem]`}></div>
        <div className={`z-10 rounded-t-[1.5rem] ${to}`}></div>
        <div className={`z-10 ${from} rounded-bl-[1.5rem]`}></div>
        <div className={`absolute bottom-0 z-0 w-full h-1/2 ${to}`}></div>
        <div className={`absolute top-0 z-0 w-full h-1/2 ${from}`}></div>
      </div>
    </>
  );
};
export default WavySeparator;
