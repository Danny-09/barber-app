import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bycrypt from 'bcrypt';
import { UserRoleEnum } from '@/enums/user-role';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    public async signIn(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid email');
        }
        const isPasswordValid = await bycrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = { email: user.email, sub: user.id, role: user.role_id };

        const token = await this.jwtService.signAsync(payload);

        return {
            email,
            token,
            role: UserRoleEnum[user.role_id],
        }
    }
}
