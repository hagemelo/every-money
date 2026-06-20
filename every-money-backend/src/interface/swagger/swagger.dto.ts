import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ClassificacaoCategoriaModel } from '@domain/models/classificacao-categoria.model';
import { TipoCategoriaModel } from '@domain/models/tipo-categoria.model';
import { TipoContaModel } from '@domain/models/tipo-conta.model';
import { TipoTransacaoModel } from '@domain/models/tipo-transacao.model';
import { StatusTransacaoModel } from '@domain/models/status-transacao.model';

export class PaginationQueryDto {
  @ApiPropertyOptional({ example: 10 })
  limit?: number;

  @ApiPropertyOptional({ example: 0 })
  offset?: number;
}

export class AuthDto {
  @ApiProperty({ example: 'usuario@email.com' })
  email: string;

  @ApiProperty({ example: 'senha123' })
  senha: string;
}

export class AlterUserPasswordDto {
  @ApiProperty({ example: 'usuario@email.com' })
  email: string;

  @ApiProperty({ example: 'senhaAtual' })
  senha: string;

  @ApiProperty({ example: 'novaSenha123' })
  novaSenha: string;
}

export class UsuarioIdDto {
  @ApiProperty({ example: 1 })
  id: number;
}

export class CategoriaInputDto {
  @ApiProperty({ example: 'Supermercado' })
  nome: string;

  @ApiProperty({ enum: TipoCategoriaModel })
  tipo: TipoCategoriaModel;

  @ApiProperty({ enum: ClassificacaoCategoriaModel })
  classificacao: ClassificacaoCategoriaModel;
}

export class CreateCategoryDto {
  @ApiProperty({ type: CategoriaInputDto })
  categoria: CategoriaInputDto;

  @ApiProperty({ type: UsuarioIdDto })
  usuario: UsuarioIdDto;
}

export class ContaInputDto {
  @ApiProperty({ example: 'Conta Corrente' })
  nome: string;

  @ApiProperty({ example: 0 })
  saldoRealizado: number;

  @ApiProperty({ example: 0 })
  saldoPrevisto: number;

  @ApiProperty({ enum: TipoContaModel })
  tipoConta: TipoContaModel;
}

export class CreateAccountDto {
  @ApiProperty({ type: ContaInputDto })
  conta: ContaInputDto;

  @ApiProperty({ type: UsuarioIdDto })
  usuario: UsuarioIdDto;
}

export class CreateTransactionDto {
  @ApiProperty({ example: 'Compra no mercado' })
  descricao: string;

  @ApiProperty({ example: 150.5 })
  valor: number;

  @ApiProperty({ example: '2025-06' })
  mesReferencia: string;

  @ApiProperty({ example: '2025-06-15' })
  data: Date;

  @ApiProperty({ enum: TipoTransacaoModel })
  tipo: TipoTransacaoModel;

  @ApiPropertyOptional({ enum: StatusTransacaoModel })
  status?: StatusTransacaoModel;
}

export class CreateBudgetDto {
  @ApiProperty({ example: '2025-06' })
  mesReferencia: string;

  @ApiProperty({ example: 2000 })
  limite: number;

  @ApiProperty({ enum: TipoCategoriaModel })
  tipoCategoria: TipoCategoriaModel;

  @ApiPropertyOptional({ example: 6 })
  mes?: number;

  @ApiPropertyOptional({ example: 2025 })
  ano?: number;
}

export class UserAuthenticatedDto {
  @ApiProperty({ example: 'João Silva' })
  name: string;

  @ApiProperty({ example: 'usuario@email.com' })
  email: string;

  @ApiProperty({ example: 1 })
  id: number;
}

export class AuthenticatedResponseDto {
  @ApiProperty({ type: UserAuthenticatedDto })
  userAuthenticated: UserAuthenticatedDto;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class TokenResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
