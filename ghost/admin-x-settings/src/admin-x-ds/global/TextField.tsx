import Heading from './Heading';
import Hint from './Hint';
import React, {useId} from 'react';
import clsx from 'clsx';

type TextFieldType = 'text' | 'number' | 'email' | 'password' | 'file' | 'date' | 'time' | 'search';

interface TextFieldProps {
    inputRef?: React.RefObject<HTMLInputElement>;
    title?: string;
    hideTitle?: boolean;
    type?: TextFieldType;
    value?: string;
    error?: boolean;
    placeholder?: string;
    hint?: React.ReactNode;
    clearBg?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    className?: string;
    maxLength?: number;
}

const TextField: React.FC<TextFieldProps> = ({
    type = 'text',
    inputRef,
    title,
    hideTitle,
    value,
    error,
    placeholder,
    hint,
    clearBg = false,
    onChange,
    onBlur,
    className = '',
    maxLength,
    ...props
}) => {
    const id = useId();

    return (
        <div className='flex flex-col'>
            {title && <Heading className={hideTitle ? 'sr-only' : ''} htmlFor={id} useLabelTag={true}>{title}</Heading>}
            <input
                ref={inputRef}
                className={clsx(
                    'border-b py-2',
                    clearBg ? 'bg-transparent' : 'bg-grey-75 px-[10px]',
                    error ? `border-red` : `border-grey-500 hover:border-grey-700 focus:border-black`,
                    (title && !hideTitle && !clearBg) && `mt-2`,
                    className
                )}
                defaultValue={value}
                id={id}
                maxLength={maxLength}
                placeholder={placeholder}
                type={type}
                onBlur={onBlur}
                onChange={onChange}
                {...props} />
            {hint && <Hint color={error ? 'red' : ''}>{hint}</Hint>}
        </div>
    );
};

export default TextField;
