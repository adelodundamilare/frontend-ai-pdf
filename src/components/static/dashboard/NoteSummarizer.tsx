import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
//
import ProfileImage from "@/assets/profile.png";
import LikeIcon from "@/assets/like.svg";
import DisLikeIcon from "@/assets/dislike.svg";
import EditIcon from "@/assets/edit.svg";
import CopyIcon from "@/assets/copy.svg";
import { authRequest } from "@/config/baseUrl";
import ProgressModal from "@/components/Progress";

interface IMessage {
  role: string;
  content: string;
}
const NoteSummarizer = () => {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      if (!input) return;
      const res = await authRequest.post("/chat/open_ai/summarize/", {
        prompt: input,
      });
      setSummary(res?.data?.data?.content);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ProgressModal isLoading={loading} />;

  return (
    <>
      <div className="bg-[#D9D9D9] w-[100%] h-[1px] mt-3"></div>

      {/* MAIN CHAT SECTION  */}

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 my-4">
        {/* Div For Input  */}
        <div>
          <h5 className="mb-2">Your notes</h5>
          <form onSubmit={handleSubmit}>
            <div className="relative flex justify-center items-center">
              <textarea
                style={{ minHeight: "20rem", maxHeight: "20rem" }}
                placeholder="[ Write or paste a note ]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full  h-fit min-w-fit relative resize-none  p-2  plaholder:text-[#303030] outline-none rounded-lg border"
                onInput={(e: any) => {
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
              />
            </div>
            <button
              disabled={input.length < 1}
              className={`p-2 w-[19rem] rounded-md mt-2 text-white bg-[#20808D] ${
                input.length < 1 ? "opacity-20" : ""
              } tracking-wider`}
            >
              Summarize Note
            </button>
          </form>
        </div>

        <div>
          <h5 className="mb-2">Summary</h5>
          <div className="border rounded-lg w-full min-h-[20rem] max-h-[20rem] overflow-y-auto p-4">
            {summary}
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteSummarizer;

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
