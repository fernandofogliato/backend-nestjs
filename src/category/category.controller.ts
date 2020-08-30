import { Controller, Get, Post, Body, Param, Put, HttpCode, Delete } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from 'src/models/category.model';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('categories')
export class CategoryController {

    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) {

    }

    @Get()
    async index(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    @Get(':id')
    async show(@Param('id') id: string): Promise<Category> {
        return this.categoryRepository.findOneOrFail(+id);
    }

    @Post()
    async store(@Body() body: Category): Promise<Category> {
        const category = this.categoryRepository.create(body);
        return this.categoryRepository.save(category);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: Category): Promise<Category> {
        await this.categoryRepository.findOneOrFail(+id);
        this.categoryRepository.update({ id: +id }, body);
        return this.categoryRepository.findOneOrFail(+id);
    }

    @Delete(':id')
    @HttpCode(204)
    async destroy(@Param('id') id: string) {
        await this.categoryRepository.findOneOrFail(+id);
        this.categoryRepository.delete(id);
    }
}
