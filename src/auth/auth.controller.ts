import { Controller, Get, Post } from "@nestjs/common";
import { AuthProvider } from "./auth.service";


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthProvider) { }

    @Post('signup')
    signup() {
        return this.authService.signup();
    }

    @Post('signin')
    signin() {
        return this.authService.signin()
    }
}