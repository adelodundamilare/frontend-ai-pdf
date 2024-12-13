import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { IOpinion } from "@/lib/types";
import { ColorRing } from "react-loader-spinner";
import ApiService from "@/services/api";
import CrossIcon from "../../../assets/cross.svg";

interface Prop {
  opinionId: number;
  onClose: () => void;
}
const OpinionSingle = ({ opinionId, onClose }: Prop) => {
  const { data, isLoading, error } = useQuery<IOpinion, Error>({
    queryKey: ["opinions", opinionId],
    queryFn: () => ApiService.fetchOpinion(opinionId),
    enabled: !!opinionId,
  });

  const message =
    data?.html_with_citations ||
    data?.xml_harvard ||
    data?.plain_text ||
    "no data";

  const Back = () => {
    onClose();
  };

  if (isLoading)
    return (
      <div className=" bg-white relative font-roboto p-3 rounded-md md:w-[50vw] grid place-content-center sm:w-[80vw] w-[98vw]">
        <ColorRing
          visible={isLoading}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );

  return (
    <div className="subscription-popup-overlay">
      <div className="subscription-popup">
        <div className=" bg-white relative font-roboto p-3 rounded-md md:w-[50vw] sm:w-[80vw] w-[98vw]">
          <img
            src={CrossIcon}
            alt=""
            srcSet=""
            className="sticky right-5 top-5 cursor-pointer"
            onClick={Back}
          />

          {/* <div dangerouslySetInnerHTML={{ __html: data?.xml_harvard }}></div> */}

          <ReactMarkdown
            className="text-sm markup"
            children={message}
            rehypePlugins={[rehypeRaw]}
          />

          {error && (
            <div className="bg-red-50 text-red-500 p-2 mb-2">
              Error: {error?.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpinionSingle;
