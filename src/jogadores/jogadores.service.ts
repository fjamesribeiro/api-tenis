import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  private log: Logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criaJogadorDto;
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      this.atualizar(criaJogadorDto);
    } else {
      this.criar(criaJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Array<Jogador>> {
    return this.jogadorModel.find().exec();
  }

  async consultarJogadoresPorEmail(email: string): Promise<Jogador> {
    const jogEncontrado = this.jogadorModel.findOne({ email });
    if (jogEncontrado) {
      return jogEncontrado;
    } else {
      throw new NotFoundException(`Jogador com email ${email} nao encontrado`);
    }
  }

  private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const jogadorCriado = new this.jogadorModel(criaJogadorDto);
    return await jogadorCriado.save();
  }

  private async atualizar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadorModel
      .findOneAndUpdate(
        { email: criaJogadorDto.email },
        { $set: criaJogadorDto },
      )
      .exec();
  }

  async deletar(email: string): Promise<any> {
    return await this.jogadorModel.deleteOne({ email }).exec();
  }
}
