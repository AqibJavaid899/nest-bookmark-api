import { Controller, Get, Post } from "@nestjs/common";
import { AuthProvider } from "./auth.service";


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthProvider){}

    @Post('signup')
    signup() {
        return {msg: "Signing up..."}
    }

    @Post('signin')
    signin() {
        return {msg: "Signing in..."}
    }
}