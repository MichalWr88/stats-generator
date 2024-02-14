import { useEffect, useState, type ChangeEvent } from 'react';

interface Props {
  options: Array<string>;
  initValue: string | null | undefined;
  // eslint-disable-next-line no-unused-vars
  updateMyData: (value: string) => void;
}

const SelectField = ({ initValue, updateMyData, options }: Props) => {
  const [value, setValue] = useState(initValue ?? '');

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(() => e.target.value);
    updateMyData?.(e.target.value);
  };
  useEffect(() => {
    setValue(initValue ?? '');
  }, [initValue]);

  return (
    <div className="flex justify-center">
      <div className="mb-3 xl:w-48">
        <select
          className="form-select appearance-none
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          aria-label="Default select example"
          value={value}
          onChange={onChange}
        >
          {options.map((value) => {
            return (
              <option  value={value} key={value}>
                {value}
              </option>
            );
          })}{' '}
          <option value=""> </option>
        </select>
      </div>
    </div>
  );
};

export default SelectField;
