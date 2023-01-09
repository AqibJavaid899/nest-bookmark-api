import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class AuthProvider {

    constructor(private prisma: PrismaService) { }

    signup() {
        return { msg: "Signing up..." }
    }

    signin() {
        return { msg: "Signing in..." }
    }

}