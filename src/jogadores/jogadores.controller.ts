import { Body, Controller, Post } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {
  @Post()
  async criarModificarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    return JSON.stringify({
      const {email} = criarJogadorDto return JSON.stringify(`{"email"} : ${email})
    }`)
  }
}
}