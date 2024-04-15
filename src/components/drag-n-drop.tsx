import { FaCopy } from "react-icons/fa";
//
import DeviceIcon from "@/assets/device.svg";
import DropBoxIcon from "@/assets/dropbox.svg";

interface Prop {
  label?: string;
  multiple?: boolean;
  handleClick: (e: any) => any;
}
const DragNDrop = ({ label, handleClick, multiple }: Prop) => {
  //   const handleClick = async (event: any) => {
  //     const selectedFiles: any[] = event.target.files;

  //       nav(link, { state: { pdf: selectedFiles } });
  //   };

  return (
    <div className="flex justify-center items-center gap-3 mt-[2rem]">
      {/* UPLOAD PDF  */}
      <div className="w-[85%] sm:w-[50%] shadow-ChatBoxShadown h-[10rem] relative rounded-[0.25rem] p-3">
        <p className="text-center text-[#47474F]">Drag and drop PDF here</p>

        <p className="text-center mt-[1.5rem]">or</p>

        <div className="flex justify-center items-center">
          <input
            id="fileInput"
            type="file"
            className="hidden"
            multiple={multiple ?? false}
            onChange={handleClick}
          />

          {/* <label
                htmlFor="fileInput"
                className="bg-[#20808D] text-white w-[12rem] h-[2.4rem] rounded-md flex items-center justify-center cursor-pointer"
              >
                Select PDF file
              </label> */}

          <label
            htmlFor="fileInput"
            className="bg-[#20808D] text-white w-[12rem] h-[2.4rem] rounded-md flex items-center justify-center cursor-pointer"
          >
            {label ?? "Select PDF file"}
          </label>
        </div>
      </div>

      {/* ICONS  */}
      <div>
        <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
          <FaCopy className=" text-white" />
        </div>
        <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
          <img src={DeviceIcon} alt="" />
        </div>
        <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
          <img src={DropBoxIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default DragNDrop;
