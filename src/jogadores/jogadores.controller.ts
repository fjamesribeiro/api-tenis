import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto copy';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadorValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadorService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
    @Body() criaJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    return await this.jogadorService.criarJogador(criaJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizaJogadorDto: AtualizarJogadorDto,
    @Param('_id', JogadorValidacaoParametrosPipe) _id: string,
  ): Promise<void> {
    console.log(_id);
    await this.jogadorService.atualizarJogador(_id, atualizaJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<Array<Jogador>> {
    return await this.jogadorService.consultarTodosJogadores();
  }

  @Get('/:_id')
  async consultarJogadorPorId(
    @Param('_id', JogadorValidacaoParametrosPipe) _id: string,
  ): Promise<Jogador> {
    return await this.jogadorService.consultarJogadorPorId(_id);
  }

  @Delete('/:_id')
  async deletarJogador(
    @Param('_id', JogadorValidacaoParametrosPipe) _id: string,
  ): Promise<void> {
    await this.jogadorService.deletar(_id);
  }
}
