import Dropzone from "./_components/Dropzone";
import MyFiles from "./_components/MyFiles";

const Dashboard = () => {
  return (
    <div>
      <div className="mb-7 flex flex-row justify-between border-b-2 pb-2">
        <h1>My files</h1>
        <Dropzone />
      </div>
      <MyFiles />
    </div>
  );
};

export default Dashboard;
