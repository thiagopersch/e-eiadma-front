import {
  forwardRef,
  CSSProperties,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
  useRef
} from 'react';
import { useForm } from 'react-hook-form';
import mergeRefs from 'react-merge-refs';

import { masks } from 'utils/masks';
import * as S from './styles';

export type InputAs = 'input' | 'textarea';

export interface TextInputProps {
  name: string;
  label: string;
  as?: InputAs;
  size?: 'large' | 'medium' | 'small';
  type?: string;
  icon?: React.ReactNode;
  mask?: keyof typeof masks;
  error?: string;
  containerStyle?: CSSProperties;
  disabled?: boolean;
  onChangeValue?: (value: string) => void;
}

const TextInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  TextInputProps
> = (
  {
    as = 'input',
    size = 'large',
    name,
    label,
    icon,
    mask,
    error: errorProp,
    containerStyle,
    disabled = false,
    onChangeValue,
    ...rest
  },
  ref
) => {
  const [fieldValue, setFieldValue] = useState('');
  const {
    register,
    formState: { errors }
  } = useForm();

  const fieldRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const masked = mask ? masks[mask](value) : value;
    setFieldValue(masked);

    onChangeValue && onChangeValue(masked);
  };

  return (
    <S.Wrapper
      inputAs={as}
      size={size}
      disabled={disabled}
      style={containerStyle}
    >
      <S.Label hasValue={!!fieldValue} inputAs={as} isDisabled={disabled}>
        <span>{label}</span>
        <S.InputContainer size={size} hasIcon={!!icon}>
          <S.Input
            {...register('name')}
            inputSize={size}
            onChange={handleChange}
            as={as}
            ref={mergeRefs([fieldRef, ref])}
            disabled={disabled}
            value={fieldValue}
            {...rest}
          />
          {!!icon && icon}
        </S.InputContainer>
      </S.Label>
    </S.Wrapper>
  );
};

export default forwardRef(TextInput);
