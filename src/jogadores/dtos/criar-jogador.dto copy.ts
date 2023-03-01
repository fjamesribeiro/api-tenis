import { IsEmail, IsNotEmpty } from 'class-validator';

export class CriarJogadorDto {
  @IsNotEmpty()
  readonly nome: string;
  @IsNotEmpty()
  readonly celular: string;
  @IsEmail()
  readonly email: string;
}
