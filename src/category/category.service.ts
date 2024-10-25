/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  categoryService: any;
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  //Get All Category
  async getAllCategory(): Promise<Category[]> {
    return await this.categoryRepository.find();  
  }

  //Get Category By Id
  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  // Create Category
  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name } = createCategoryDto;

    const category = this.categoryRepository.create({ name });

    await this.categoryRepository.save(category);

    return category;
  }

  // Delete Category
  async delete(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Expense with Id "${id}" not found');
    }
  }

  // Update Category
  async updateCategory(id: number,  updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const { name } = updateCategoryDto;

    const category = await this.getCategoryById(id);

    category.name = name;

    await this.categoryRepository.save(category);

    return category;
  }
}
