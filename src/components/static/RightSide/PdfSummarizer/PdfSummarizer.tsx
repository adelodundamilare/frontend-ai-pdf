import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Document, Page } from "react-pdf";
import { toast } from "react-toastify";
//
import DragNDrop from "@/components/drag-n-drop";
import SendIcon from "../../../../assets/send.svg";
import UploadIcon from "../../../../assets/upload.svg";
import ProfileImage from "../../../../assets/profile.png";
import LikeIcon from "../../../../assets/like.svg";
import DisLikeIcon from "../../../../assets/dislike.svg";
import EditIcon from "../../../../assets/edit.svg";
import CopyIcon from "../../../../assets/copy.svg";
import QuestionIcon from "../../../../assets/question.png";
import { authRequest } from "@/config/baseUrl";

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
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState("");
  const location = useLocation();
  const [pdfFile, setPdfFile] = useState<any>();
  const [items, setItems] = useState<IPdfItem[]>([]);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(false);
  // const { messages, input, handleInputChange, (e)=> } = useChat({
  //   api: `${import.meta.env.VITE_BACKEND_BASE_URL}/chat/open_ai/`,
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Token ${localStorage.getItem("token")}`,
  //   },
  // });
  const handleSubmit = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      if (!input) return;
      persistMessage({ role: "user", content: input });
      const res = await authRequest.post("/chat/open_ai/", { prompt: input });
      setInput("");
      persistMessage(res?.data?.data);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const persistMessage = async (message: IMessage) => {
    setMessages((x) => [...x, message]);
    // @todo: persist message to store...
  };

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };

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

    setPdfFile(event.target.files[0]);
  };

  if (!pdfFile)
    return (
      <div className="grid place-content-center w-full h-full">
        <DragNDrop handleClick={handleClick} />
      </div>
    );

  return (
    <>
      <div className="flex overflow-hidden h-[83vh]">
        <div className="p-1 gap-1 bg-gray-200 h-full overflow-y-auto">
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
        <div className="flex-grow grid place-content-center">hello</div>
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
