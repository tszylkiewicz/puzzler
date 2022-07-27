import { IsDefined, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ProducerRequest {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUrl()
    logoUrl?: string;
}

export type ProducerDto = {
    id: string;
    name: string;
    logoUrl?: string;
};
