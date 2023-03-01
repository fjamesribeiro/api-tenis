import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto copy';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  private log: Logger = new Logger(JogadoresService.name);

  async criarJogador(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criaJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(` Jogador já existente`);
    }

    return await new this.jogadorModel(criaJogadorDto).save();
  }

  async atualizarJogador(
    _id: string,
    atualizaJogadorDto: AtualizarJogadorDto,
  ): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
    console.log(_id);
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador não encontrado`);
    }

    await this.jogadorModel
      .findOneAndUpdate({ _id }, { $set: atualizaJogadorDto })
      .exec();
  }

  async consultarTodosJogadores(): Promise<Array<Jogador>> {
    return this.jogadorModel.find().exec();
  }

  async consultarJogadorPorId(_id: string): Promise<Jogador> {
    const jogEncontrado = this.jogadorModel.findOne({ _id });
    console.log(_id);
    if (jogEncontrado) {
      return jogEncontrado;
    } else {
      throw new NotFoundException(`Jogador com id ${_id} nao encontrado`);
    }
  }

  async deletar(_id: string): Promise<any> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador não encontrado`);
    }

    return await this.jogadorModel.deleteOne({ _id }).exec();
  }
}
