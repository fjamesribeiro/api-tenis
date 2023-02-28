import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadorValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadorService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarModificarJogador(@Body() criaJogadorDto: CriarJogadorDto) {
    await this.jogadorService.criarAtualizarJogador(criaJogadorDto);
  }

  @Get()
  async consultarJogadores(
    @Query('email', JogadorValidacaoParametrosPipe) email: string,
  ): Promise<Array<Jogador> | Jogador> {
    if (email) {
      return await this.jogadorService.consultarJogadoresPorEmail(email);
    } else {
      return await this.jogadorService.consultarTodosJogadores();
    }
  }

  @Delete()
  async deletarJogador(
    @Query('email', JogadorValidacaoParametrosPipe) email: string,
  ) {
    await this.jogadorService.deletar(email);
  }
}
