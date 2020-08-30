import {
    Controller, Get, Post, Body, Param, Put, HttpCode, Delete, ValidationPipe,
    UseInterceptors,
    ClassSerializerInterceptor
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from 'src/models/category.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiOkResponse, ApiCreatedResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { CategoryResponse } from 'src/api-doc/category.response';
import { CategoryDto } from 'src/dto/category.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('categories')
export class CategoryController {

    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) { }

    @ApiOkResponse({
        type: [CategoryResponse]
    })
    @Get()
    async index(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    @ApiOkResponse({
        type: CategoryResponse
    })
    @Get(':id')
    async show(@Param('id') id: string): Promise<Category> {
        return this.categoryRepository.findOneOrFail(+id);
    }

    @ApiCreatedResponse({
        type: CategoryResponse
    })
    @Post()
    async store(@Body(new ValidationPipe) body: CategoryDto): Promise<Category> {
        const category = this.categoryRepository.create(body);
        return this.categoryRepository.save(category);
    }

    @ApiOkResponse({
        type: CategoryResponse
    })
    @Put(':id')
    async update(@Param('id') id: string, @Body() body: CategoryDto): Promise<Category> {
        await this.categoryRepository.findOneOrFail(+id);
        this.categoryRepository.update({ id: +id }, body);
        return this.categoryRepository.findOneOrFail(+id);
    }

    @ApiNoContentResponse()
    @Delete(':id')
    @HttpCode(204)
    async destroy(@Param('id') id: string) {
        await this.categoryRepository.findOneOrFail(+id);
        this.categoryRepository.delete(id);
    }
}
