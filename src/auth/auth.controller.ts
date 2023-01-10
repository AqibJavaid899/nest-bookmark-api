import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthProvider } from "./auth.service";
import { AuthDto } from "./dto";


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthProvider) { }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto)
    }
}