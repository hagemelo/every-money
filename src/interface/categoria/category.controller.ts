import { Controller, Post } from "@nestjs/common";
import { CreateCategoryUseCase } from "@application/use-cases/create-category.use-case";
import { CreateCategoryData } from "@domain/data/create-category.data";
import { CategoriaModel } from "@domain/models/categoria.model";
import { Body, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Controller('categoria')
export class CreateCategoryController {
  constructor(
    private readonly useCase: CreateCategoryUseCase,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('criar-categoria')
  async criarCategoria(@Body() data: CreateCategoryData): Promise<CategoriaModel> {
    const categoria = await this.useCase.execute(data);
    return categoria.toModel();
  }
} 