import { useEffect, useRef, useState } from "react";
import { useChat, Message } from "ai/react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
//
import SendIcon from "../../../../assets/send.svg";
import UploadIcon from "../../../../assets/upload.svg";
import "./style.css";
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
const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState("");
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
  const [showSubscriptionPopup, setshowSubscriptionPopup] = useState(false);

  useEffect(() => {
    chatContainer.current?.scrollTo({
      top: chatContainer.current?.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {/* TOP BUTTON DEFAULT AND SUMMARIZER  */}
      <div className="flex justify-center items-center">
        <div className="bg-[#D9D9D9] p-2 sm:w-[18rem] w-[14rem] rounded-md">
          {/* <button onClick={() => setshowPopUp(!showPopUp)} className='sm:w-[8rem] w-[6rem] h-[2.5rem] bg-white rounded-md mr-4'>Default</button> */}
          <button className="sm:w-[8rem] w-[6rem] h-[2.5rem] bg-white rounded-md mr-4">
            Default
          </button>

          <button
            onClick={() => setshowSubscriptionPopup(true)}
            className="sm:w-[8rem] w-[6rem] h-[2.5rem] bg-white rounded-md"
          >
            Summarizer
          </button>
        </div>
      </div>

      <div className="bg-[#D9D9D9] w-[100%] h-[1px] mt-3"></div>

      {/* MAIN CHAT SECTION  */}

      <div className="">
        {/* Div For User And Ai Response  */}

        <div
          className="h-[60vh] pl-[2rem] pr-[2rem] overflow-y-auto scrollToBottom pb-[2rem] md:pb-[2rem]"
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
        </div>

        {/* Div For Input  */}
        <form
          onSubmit={handleSubmit}
          className="absolute bottom-[3rem] w-[100%]"
        >
          <div className="relative sm:w-[96%] w-[95%] flex justify-center items-center">
            <textarea
              style={{ border: "1px solid #D9D9D9", maxHeight: "10rem" }}
              placeholder="[ Write a note ]"
              value={loading ? "Loading, please wait..." : input}
              onChange={handleInputChange}
              className="w-[100%]  h-fit min-w-fit relative resize-none pt-[1rem] pb-[1rem] pl-[2rem] pr-[5rem] text-lg tracking-wider  plaholder:text-[#303030] outline-none rounded-[1rem] shadow-ChatBoxShadown"
              onInput={(e: any) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
            />
            <button type="submit">
              <img
                src={SendIcon}
                alt=""
                className="absolute lg:right-[5%] right-[4rem]  top-[40%] cursor-pointer"
              />
            </button>
            <img
              src={UploadIcon}
              alt=""
              className="absolute lg:right-[8%] right-[6rem] top-[40%] cursor-pointer"
            />
          </div>
        </form>

        {/* DIV FOR SMALL QUESTION MARK LOGO */}
        <div className="absolute bottom-[10px] float-right flex justify-end mr-[10rem] w-[96%]">
          <div className="w-[1.3rem] h-[1.3rem] rounded-full flex justify-center items-center bg-[#36454F]">
            <img src={QuestionIcon} alt="" />
          </div>
          {/* #36454F */}
        </div>
      </div>
    </>
  );
};

export default Chat;

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
