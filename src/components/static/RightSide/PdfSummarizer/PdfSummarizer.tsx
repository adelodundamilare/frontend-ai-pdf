import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Document, Page } from "react-pdf";
import { toast } from "react-toastify";
//
import DragNDrop from "@/components/drag-n-drop";
import ProfileImage from "../../../../assets/profile.png";
import LikeIcon from "../../../../assets/like.svg";
import DisLikeIcon from "../../../../assets/dislike.svg";
import EditIcon from "../../../../assets/edit.svg";
import CopyIcon from "../../../../assets/copy.svg";
import QuestionIcon from "../../../../assets/question.png";
import { authRequest } from "@/config/baseUrl";
import ProgressModal from "@/components/Progress";

interface IMessage {
  role: string;
  content: string;
}

interface IPdfItem {
  id: string;
  pageNumber: number;
  content: string;
}
const PdfSummarizer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [pdfFile, setPdfFile] = useState<any>();
  const [items, setItems] = useState<IPdfItem[]>([]);
  const [numPages, setNumPages] = useState(0);

  const chatContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatContainer.current?.scrollTo({
      top: chatContainer.current?.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
    const pdfItems = Array.from({ length: numPages }, (_, index) => ({
      id: `page-${index + 1}`,
      pageNumber: index + 1,
      content: `Page ${index + 1}`,
    }));
    setItems(pdfItems);
  };

  const handleClick = async (event: any) => {
    if (!event.target.files) {
      toast.warn("Please select a PDF file.");
      return;
    }

    const pdf = event.target.files[0];
    setPdfFile(pdf);
    await summarizePdf(pdf);
  };

  const summarizePdf = async (pdf: any) => {
    const formData = new FormData();
    formData.append("input_pdf", pdf);

    try {
      setIsLoading(true);
      const response = await authRequest.post("/pdf/summarize_pdf/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const res = response.data.data;
      setResult(res);

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response.data.error);
      console.error("Error summarizing pdf:", error);
    }
  };

  if (!pdfFile || !result) return <DragNDrop handleClick={handleClick} />;

  if (isLoading) return <ProgressModal isLoading={isLoading} />;

  return (
    <>
      <div className="flex gap-3 overflow-hidden h-[83vh]">
        <div className="p-1 flex-shrink-0 gap-1 bg-gray-200 h-full overflow-y-auto">
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            <div className="grid gap-1">
              {items.map((item, index) => (
                <div>
                  <Page
                    pageNumber={item?.pageNumber ?? 0}
                    // pageNumber={index + 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    width={250}
                  />
                </div>
              ))}
            </div>
          </Document>
        </div>
        <div className="flex-grow overflow-y-auto">
          <ReactMarkdown
            className="text-sm markup"
            children={result}
            rehypePlugins={[rehypeRaw]}
          />
        </div>
      </div>

      <div className="">
        {/* Div For User And Ai Response  */}

        {/* <div
          className="pl-[2rem] pr-[2rem] overflow-y-auto scrollToBottom pb-[2rem] md:pb-[2rem]"
          ref={chatContainer}
        >
          {messages.map((m: IMessage, index: any) => {
            const isUser = m.role === "user";
            return (
              <li key={index} className="flex items-center">
                {isUser ? (
                  <UserRes message={m.content} />
                ) : (
                  <OpenAIRes message={m.content} />
                )}
              </li>
            );
            // return (
            //   <li key={m.id} className="flex items-center">
            //     <div>
            //       {m.role !== "data" && (
            //         <ReactMarkdown
            //           className="text-sm markup"
            //           children={m.content}
            //           rehypePlugins={[rehypeRaw]}
            //         />
            //       )}
            //       {m.role === "data" && (
            //         <>
            //           {(m.data as any).description}
            //           <br />
            //           <pre className={"bg-gray-200"}>
            //             {JSON.stringify(m.data, null, 2)}
            //           </pre>
            //         </>
            //       )}
            //     </div>
            //   </li>
            // );
          })}
        </div> */}
      </div>
    </>
  );
};

export default PdfSummarizer;

const UserRes = ({ message }: IChatResponse) => {
  return (
    <div className="flex gap-3 items-start mt-4 p-3">
      <img src={ProfileImage} alt="" className="w-[2rem] h-[2rem]" />
      <p className="w-[90%] text-medium text-[#303030] h-fit overflow-y-auto max-h-[10rem] leading-6">
        {message}
      </p>
      <img src={EditIcon} alt="" className="w-[1rem] h-[1rem] cursor-pointer" />
    </div>
  );
};

interface IChatResponse {
  message: string;
}
const OpenAIRes = ({ message }: IChatResponse) => {
  return (
    <div className="bg-[#F5F5F5] flex gap-3 items-start mt-4 p-3">
      <img src={ProfileImage} alt="" className="w-[2rem] h-[2rem]" />
      <ReactMarkdown
        className="text-sm markup"
        children={message}
        rehypePlugins={[rehypeRaw]}
      />
      <img src={CopyIcon} alt="" className="w-[1rem] h-[1rem] cursor-pointer" />
      <img src={LikeIcon} alt="" className="w-[1rem] h-[1rem] cursor-pointer" />
      <img
        src={DisLikeIcon}
        alt=""
        className="w-[1rem] h-[1rem] cursor-pointer"
      />
    </div>
  );
};
