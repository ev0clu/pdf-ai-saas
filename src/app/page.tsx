import {
  StepperBarWrapper,
  StepperBar,
  StepperSeparator,
  StepperContentWrapper,
  StepperContent,
} from "@/components/Stepper";

export default function Home() {
  return (
    <div className="mx-auto">
      <p className="max-w-4xl text-center text-4xl font-bold tracking-wide md:text-6xl lg:text-7xl">
        Chat with your <span className="text-primary">PDF</span> documents
      </p>
      <p className="max-w-prose text-center text-muted-foreground md:text-lg">
        Let&apos;s use the power of AI and get an overview about any PDF in
        seconds.{" "}
        <span className="decoration-slice font-bold text-black underline decoration-primary decoration-wavy">
          QuiriPDF
        </span>{" "}
        is a tool which use artifact intelligent and answer to any questions
        about the uploaded PDF document very quick.
      </p>

      <div>
        <h1 className="mt-14 text-center text-xl font-bold md:mt-28 md:text-2xl lg:text-4xl">
          Just a few steps need to chat
        </h1>
        <div>
          <div className="my-12 flex flex-row gap-10">
            <StepperBarWrapper>
              <StepperBar>1</StepperBar>
              <StepperSeparator />
              <StepperBar>2</StepperBar>
              <StepperSeparator />
              <StepperBar>3</StepperBar>
              <StepperSeparator />
              <StepperBar>4</StepperBar>
            </StepperBarWrapper>
            <StepperContentWrapper>
              <StepperContent
                title="Sign up"
                content="Create a free account."
              />
              <StepperContent
                title="Upload PDF document"
                content="Easily upload the PDF document and make it ready for chat."
              />
              <StepperContent
                title="Ask questions"
                content="Extract informations and summarize document with AI."
              />
              <StepperContent
                title="Upgrade your account"
                content="Get more benefits with Pro Plan."
              />
            </StepperContentWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
