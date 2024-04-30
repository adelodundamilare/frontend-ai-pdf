import AsyncSelect from "react-select/async";

interface IResponse {
  name: string;
}

const fetchData = async (
  inputValue: string,
  callback: (options: IResponse[]) => void
) => {
  const res = await fetch(
    `https://api.case.law/v1/jurisdictions/?full_case=true`
  );
  const data = await res.json();
  return callback(data);
};

// const loadOptions = (
//   inputValue: string,
//   callback: (options: ColourOption[]) => void
// ) => {
//   setTimeout(() => {
//     callback(filterColors(inputValue));
//   }, 1000);
// };

export default () => (
  <AsyncSelect cacheOptions loadOptions={fetchData} defaultOptions />
);
