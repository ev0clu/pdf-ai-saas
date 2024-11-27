import ContainerWrapper from "@/components/ContainerWrapper";
import PdfViewer from "./_components/PdfViewer";
import Chat from "./_components/Chat";

const Document = async (props: { params: Promise<{ fileid: string }> }) => {
  const params = await props.params;
  const fileId = params.fileid;

  return (
    <ContainerWrapper className="mt-7 md:mt-14">
      <div className="flex flex-col gap-4 md:h-[calc(100vh-199px)] md:flex-row">
        <PdfViewer id={fileId} />
        <Chat id={fileId} />
      </div>
    </ContainerWrapper>
  );
};

export default Document;
