import TreeNode from "./TreeNode";

const Tree = ({ title, nodes }: { title: string; nodes: JSX.Element[] }) => {
  return (
    <div className="tree grid md:grid-cols-[16rem_auto] grid-cols-[4rem_auto]">
      <div className="flex flex-row w-full  md:justify-center">
        <h1 className="border-grayLight shadow shadow-purple py-2 px-8 rounded-lg text-center text-5xl font-bold text-white bg-indigo-500">
          {title}
        </h1>
      </div>
      <div></div>
      {nodes.map((node, index: number) => (
        <TreeNode key={index} content={node} />
      ))}
    </div>
  );
};
export default Tree;
