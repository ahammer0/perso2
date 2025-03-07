const gradientSteps = "from-neutral-900 via-neutral-700 to-neutral-950";
const TreeNode = ({ content }: { content: React.ReactNode }) => {
  return (
    <>
      <div className="group relative">
        {/* barre verticale */}
        <div
          className={`absolute shadow-indigo-500 shadow-lg left-[calc(50%-10px)] top-0 w-[20px] h-full group-[:nth-last-child(2)]:h-1/2 bg-gradient-to-r ${gradientSteps}`}
        ></div>
        {/* barre horiz */}
        <div
          className={`absolute shadow-indigo-500 shadow w-1/2 h-[15px] top-[calc(50%-7px)] right-0 bg-grayMedium bg-gradient-to-b ${gradientSteps}`}
        ></div>
        {/* rond */}
        <div
          className={`absolute shadow-indigo-500 shadow left-[calc(50%-25px)] top-[calc(50%-25px)] w-[50px] aspect-square rounded-full bg-grayMedium bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] to-black from-grayMedium`}
        ></div>
      </div>

      <div className="shadow shadow-indigo-500 border-grayMedium border rounded my-4 p-2 text-white text-lg font-bold">
        {content}
      </div>
    </>
  );
};
export default TreeNode;
