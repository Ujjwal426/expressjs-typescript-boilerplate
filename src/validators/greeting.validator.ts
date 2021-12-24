import { IsString, IsNotEmpty } from 'class-validator';

export class GreetingRequest {
    @IsString()
    @IsNotEmpty()
    public name: string;
}