import { ApiProperty } from "@nestjs/swagger";
import{ IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
    @ApiProperty({
        example: 'Donald Trump',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}
