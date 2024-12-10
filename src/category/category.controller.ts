/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('category')
@UseGuards(AuthGuard())
export class CategoryController {
  categoriesService: any;
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategory(): Promise<Category[]> {
    return await this.categoryService.getAllCategory();
  }


  @Get('/category')
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  @Get('/:id')
  getCategoryById(@Param('id') id:number): Promise<Category>{
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto,
): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Delete('/:id')
    async deleteCategory(@Param('id') id: number): Promise<void>{
        return await this.categoryService.delete(id);
    }

  @Patch('/:id')
  async updateCategory(
    @Param('id') id: number, 
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, updateCategoryDto); 
  }
}
