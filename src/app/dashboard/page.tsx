import ContainerWrapper from "@/components/ContainerWrapper";
import Dropzone from "./_components/Dropzone";
import MyFiles from "./_components/MyFiles";

const Dashboard = () => {
  return (
    <ContainerWrapper className="mt-7 md:mt-14">
      <div className="mb-7 flex flex-row justify-between border-b-2 pb-2">
        <h1>My files</h1>
        <Dropzone />
      </div>
      <MyFiles />
    </ContainerWrapper>
  );
};

export default Dashboard;
