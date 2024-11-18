import ContainerWrapper from "@/components/ContainerWrapper";
import PdfViewer from "./_components/PdfViewer";
import Chat from "./_components/Chat";

const Document = async (props: { params: Promise<{ fileid: string }> }) => {
  const params = await props.params;
  const fileId = params.fileid;

  return (
    <ContainerWrapper className="mt-7 md:mt-14">
      <div className="flex h-[calc(100vh-199px)] flex-row gap-4">
        <PdfViewer id={fileId} />
        <Chat id={fileId} />
      </div>
    </ContainerWrapper>
  );
};

export default Document;
