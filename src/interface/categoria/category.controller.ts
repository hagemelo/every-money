import { Controller, Get, Param, Post } from "@nestjs/common";
import { CreateCategoryUseCase } from "@application/use-cases/create-category.use-case";
import { CreateCategoryData } from "@domain/data/create-category.data";
import { CategoriaModel } from "@domain/models/categoria.model";
import { Body, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ListAllCategoriesByUserIdUseCase } from "@application/use-cases/list-all-categories-by-user-id.use-case";


@Controller('categoria')
export class CreateCategoryController {
  constructor(
    private readonly useCase: CreateCategoryUseCase,
    private readonly listAllCategoriesByUserIdUseCase: ListAllCategoriesByUserIdUseCase,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('criar-categoria')
  async criarCategoria(@Body() data: CreateCategoryData): Promise<CategoriaModel> {
    const categoria = await this.useCase.execute(data);
    return categoria.toModel();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('listar-categorias/usuario/:id')
  async listarCategorias(@Param('id') id: number): Promise<CategoriaModel[]> {
      const categorias = await this.listAllCategoriesByUserIdUseCase.execute(id);
      return categorias?.map(categoria => categoria.toModel()) ?? [];
  }
} 