import { InputText } from 'primereact/inputtext';
const fixedInputClass="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"


export default function Input({
    onChange,
    value,
    placeholder
}){
    return(
        <div className="my-2">
            <InputText
              onChange={onChange}
              value={value}
              className={fixedInputClass}
              placeholder={placeholder}
            />
          </div>
    )
}