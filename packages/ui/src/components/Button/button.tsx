import * as S from "./Button.styles";
import type { ButtonProps } from "./Button.types";

export const Button = ({
  onClick,
  text,
  size = "md",
  ...props
}: ButtonProps) => {
  return (
    <S.Button onClick={onClick} size={size} {...props}>
      {text}
    </S.Button>
  );
};
